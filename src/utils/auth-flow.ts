import type { Page } from '@playwright/test';

import type { HomePage } from '../pages/home.page';
import type { SignupPage } from '../pages/signup.page';
import type { UserCredentials } from './data-factory';
import { expectDialogAndAccept } from './dialog';

export async function registerUserViaUI(
  page: Page,
  homePage: HomePage,
  signupPage: SignupPage,
  user: UserCredentials,
): Promise<void> {
  await homePage.goto();
  await homePage.openSignupModal();

  await expectDialogAndAccept(
    page,
    async () => {
      await signupPage.signup(user.username, user.password);
    },
    'Sign up successful.',
  );
}
