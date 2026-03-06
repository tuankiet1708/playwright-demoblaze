import path from 'path';
import { config as loadDotenv } from 'dotenv';

loadDotenv({ path: path.resolve(process.cwd(), '.env') });

function toNumber(value: string | undefined, fallback: number): number {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? fallback : parsed;
}

export const env = {
  baseUrl: process.env.BASE_URL ?? 'https://www.demoblaze.com',
  apiUrl: process.env.API_URL ?? 'https://api.demoblaze.com',
  defaultPassword: process.env.DEFAULT_PASSWORD ?? 'Pass1234',
  performanceBudgetMs: toNumber(process.env.PERFORMANCE_BUDGET_MS, 7000),
  isCI: process.env.CI === 'true',
};
