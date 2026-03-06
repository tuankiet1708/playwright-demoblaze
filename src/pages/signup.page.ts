import { expect, type Locator, type Page } from '@playwright/test';

export class SignupPage {
  readonly modal: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(private readonly page: Page) {
    this.modal = page.locator('#signInModal');
    this.usernameInput = page.locator('#sign-username');
    this.passwordInput = page.locator('#sign-password');
    this.submitButton = this.modal.getByRole('button', { name: 'Sign up' });
  }

  async signup(username: string, password: string): Promise<void> {
    await expect(this.modal).toBeVisible();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
