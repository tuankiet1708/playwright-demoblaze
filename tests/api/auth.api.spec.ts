import { env } from '../../src/config/env';
import { test, expect } from '../../src/fixtures/test-fixtures';
import { createUserCredentials } from '../../src/utils/data-factory';

test.describe('Authentication API @api', () => {
  test('should create new user using signup endpoint @smoke', async ({ apiClient }) => {
    // Fresh credentials avoid false negatives from duplicate-user conflicts.
    const user = createUserCredentials(env.defaultPassword);
    const signupResponse = await apiClient.signup(user);

    expect(signupResponse.errorMessage ?? '').toBeFalsy();
  });

  test('should return auth token for valid credentials @regression', async ({ apiClient }) => {
    const user = createUserCredentials(env.defaultPassword);
    await apiClient.createFreshUser(user);

    // API parser normalizes token response regardless of JSON vs plain-string format.
    const loginResponse = await apiClient.login(user);
    expect(String(loginResponse.Auth_token ?? '')).not.toEqual('');
  });

  test('should return error for invalid password @negative', async ({ apiClient }) => {
    const user = createUserCredentials(env.defaultPassword);
    await apiClient.createFreshUser(user);

    const loginResponse = await apiClient.login({
      username: user.username,
      password: 'WrongPassword@123',
    });

    expect(String(loginResponse.errorMessage ?? '')).toContain('Wrong password');
  });
});
