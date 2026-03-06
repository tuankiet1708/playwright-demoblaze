import { test as base, expect } from '@playwright/test';

import { DemoblazeApiClient } from '../api/demoblaze-api';
import { CartPage } from '../pages/cart.page';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { SignupPage } from '../pages/signup.page';

type FrameworkFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  signupPage: SignupPage;
  cartPage: CartPage;
  apiClient: DemoblazeApiClient;
};

export const test = base.extend<FrameworkFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  apiClient: async ({ request }, use) => {
    await use(new DemoblazeApiClient(request));
  },
});

export { expect };
