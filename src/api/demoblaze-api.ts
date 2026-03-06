import { expect, type APIRequestContext } from '@playwright/test';

import type { UserCredentials } from '../utils/data-factory';
import { env } from '../config/env';

interface ApiResponseBody {
  errorMessage?: string;
  Auth_token?: string;
  [key: string]: unknown;
}

function normalizeStringPayload(payload: string): ApiResponseBody {
  const normalized = payload.replace(/^"|"$/g, '').trim();

  if (normalized.startsWith('Auth_token:')) {
    return {
      Auth_token: normalized.replace('Auth_token:', '').trim(),
      raw: normalized,
    };
  }

  if (/wrong password|user does not exist/i.test(normalized)) {
    return {
      errorMessage: normalized,
      raw: normalized,
    };
  }

  return { raw: normalized };
}

async function parseBody(responseText: string): Promise<ApiResponseBody> {
  if (!responseText) {
    return {};
  }

  try {
    const parsed = JSON.parse(responseText) as ApiResponseBody | string;

    if (typeof parsed === 'string') {
      return normalizeStringPayload(parsed);
    }

    return parsed;
  } catch {
    return normalizeStringPayload(responseText);
  }
}

export class DemoblazeApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async signup(credentials: UserCredentials): Promise<ApiResponseBody> {
    const response = await this.request.post(`${env.apiUrl}/signup`, {
      data: credentials,
    });
    expect(response.status()).toBe(200);
    return parseBody(await response.text());
  }

  async login(credentials: UserCredentials): Promise<ApiResponseBody> {
    const response = await this.request.post(`${env.apiUrl}/login`, {
      data: credentials,
    });
    expect(response.status()).toBe(200);
    return parseBody(await response.text());
  }

  async createFreshUser(credentials: UserCredentials): Promise<void> {
    const signupResponse = await this.signup(credentials);

    // DemoBlaze may return an error if user already exists, but random usernames keep this unlikely.
    expect(signupResponse.errorMessage ?? '').not.toContain('This user already exist');

    await this.waitUntilUserCanLogin(credentials);
  }

  async waitUntilUserCanLogin(credentials: UserCredentials): Promise<void> {
    const maxAttempts = 5;

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      const loginResponse = await this.login(credentials);
      const token = String(loginResponse.Auth_token ?? '');

      if (token.length > 0) {
        return;
      }

      if (attempt < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 400 * attempt));
      }
    }

    throw new Error('User signup succeeded but login token was not available within retry budget.');
  }
}
