import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly loginLink: Locator;
  readonly signupLink: Locator;
  readonly cartLink: Locator;
  readonly welcomeUser: Locator;
  readonly logoutLink: Locator;

  constructor(private readonly page: Page) {
    this.loginLink = page.locator('#login2');
    this.signupLink = page.locator('#signin2');
    this.cartLink = page.locator('#cartur');
    this.welcomeUser = page.locator('#nameofuser');
    this.logoutLink = page.locator('#logout2');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
    await expect(this.page.locator('#tbodyid .card')).toHaveCount(9, { timeout: 20_000 });
  }

  async openLoginModal(): Promise<void> {
    await this.loginLink.click();
    await expect(this.page.locator('#logInModal')).toBeVisible();
  }

  async openSignupModal(): Promise<void> {
    await this.signupLink.click();
    await expect(this.page.locator('#signInModal')).toBeVisible();
  }

  async openProduct(productName: string): Promise<void> {
    await this.page.getByRole('link', { name: productName }).first().click();
    await expect(this.page.getByRole('link', { name: 'Add to cart' })).toBeVisible();
  }

  async clickAddToCart(): Promise<void> {
    await this.page.getByRole('link', { name: 'Add to cart' }).click();
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/.*cart\.html/);
  }

  async expectLoggedIn(username: string): Promise<void> {
    await expect(this.welcomeUser).toContainText(`Welcome ${username}`);
    await expect(this.logoutLink).toBeVisible();
  }
}
