import { env } from '../../src/config/env';
import { test } from '../../src/fixtures/test-fixtures';
import { registerUserViaUI } from '../../src/utils/auth-flow';
import { createOrderDetails, createUserCredentials } from '../../src/utils/data-factory';
import { expectDialogAndAccept } from '../../src/utils/dialog';

const PRODUCT_NAME = 'Nexus 6';

test.describe('End-to-end regression @regression', () => {
  test('should complete login to purchase journey @smoke', async ({
    page,
    homePage,
    loginPage,
    signupPage,
    cartPage,
  }) => {
    const user = createUserCredentials(env.defaultPassword);
    await registerUserViaUI(page, homePage, signupPage, user);

    await homePage.openLoginModal();
    await loginPage.login(user.username, user.password);
    await homePage.expectLoggedIn(user.username);

    await homePage.openProduct(PRODUCT_NAME);
    await expectDialogAndAccept(page, async () => {
      await homePage.clickAddToCart();
    }, 'Product added.');

    await homePage.goToCart();
    await cartPage.expectProductInCart(PRODUCT_NAME);
    await cartPage.completeOrder(createOrderDetails());
  });
});
