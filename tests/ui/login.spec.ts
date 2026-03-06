import { env } from '../../src/config/env';
import { test, expect } from '../../src/fixtures/test-fixtures';
import { registerUserViaUI } from '../../src/utils/auth-flow';
import { createUserCredentials } from '../../src/utils/data-factory';
import { expectDialogAndAccept } from '../../src/utils/dialog';

test.describe('Login Feature @ui @login', () => {
  test('should login with valid credentials @smoke @regression', async ({
    page,
    homePage,
    loginPage,
    signupPage,
  }) => {
    const user = createUserCredentials(env.defaultPassword);
    await registerUserViaUI(page, homePage, signupPage, user);

    await homePage.openLoginModal();
    await loginPage.login(user.username, user.password);

    await homePage.expectLoggedIn(user.username);
  });

  test('should reject login for unknown user @negative @regression', async ({ page, homePage, loginPage }) => {
    await homePage.goto();
    await homePage.openLoginModal();

    await expectDialogAndAccept(page, async () => {
      await loginPage.login(`unknown-${Date.now()}`, 'invalid-password');
    }, /(Wrong password\.|User does not exist\.)/i);
  });

  test('should show validation dialog for empty login fields @edge @negative', async ({ page, homePage, loginPage }) => {
    await homePage.goto();
    await homePage.openLoginModal();

    await expectDialogAndAccept(page, async () => {
      await loginPage.submitEmptyCredentials();
    }, 'Please fill out Username and Password.');

    await expect(loginPage.modal).toBeVisible();
  });
});
