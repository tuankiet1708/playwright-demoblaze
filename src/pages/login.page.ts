import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly modal: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(private readonly page: Page) {
    this.modal = page.locator('#logInModal');
    this.usernameInput = page.locator('#loginusername');
    this.passwordInput = page.locator('#loginpassword');
    this.submitButton = this.modal.getByRole('button', { name: 'Log in' });
  }

  async login(username: string, password: string): Promise<void> {
    await expect(this.modal).toBeVisible();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click({ force: true });
  }

  async submitEmptyCredentials(): Promise<void> {
    await expect(this.modal).toBeVisible();
    await this.usernameInput.clear();
    await this.passwordInput.clear();
    await this.submitButton.click({ force: true });
  }
}
