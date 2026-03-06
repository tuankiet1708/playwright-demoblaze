import { env } from '../../src/config/env';
import { test, expect } from '../../src/fixtures/test-fixtures';
import { registerUserViaUI } from '../../src/utils/auth-flow';
import { createOrderDetails, createUserCredentials } from '../../src/utils/data-factory';
import { expectDialogAndAccept } from '../../src/utils/dialog';

const PRODUCT_NAME = 'Samsung galaxy s6';

test.describe('Cart and Order Feature @ui @cart', () => {
  test('should add product to cart and place order @smoke @regression', async ({
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

    const confirmationText = await cartPage.completeOrder(createOrderDetails());
    await expect(confirmationText).toContain('Id:');
    await expect(confirmationText).toContain('Amount:');
  });

  test('should ask required data when placing order with empty mandatory fields @negative @edge', async ({
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
    await expectDialogAndAccept(page, async () => {
      await cartPage.submitOrderWithoutRequiredFields();
    }, 'Please fill out Name and Creditcard.');
  });

  test('should remove product from cart successfully @regression', async ({
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

    await homePage.openProduct(PRODUCT_NAME);
    await expectDialogAndAccept(page, async () => {
      await homePage.clickAddToCart();
    }, 'Product added.');

    await homePage.goToCart();
    await cartPage.removeFirstProduct();
    await expect(cartPage.rows).toHaveCount(0);
  });
});
