import { expect, type Locator, type Page } from '@playwright/test';

import type { OrderDetails } from '../utils/data-factory';

export class CartPage {
  readonly rows: Locator;
  readonly placeOrderButton: Locator;
  readonly orderModal: Locator;
  readonly purchaseButton: Locator;
  readonly successModal: Locator;

  constructor(private readonly page: Page) {
    this.rows = page.locator('#tbodyid tr');
    this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
    this.orderModal = page.locator('#orderModal');
    this.purchaseButton = this.orderModal.getByRole('button', { name: 'Purchase' });
    this.successModal = page.locator('.sweet-alert');
  }

  async expectProductInCart(productName: string): Promise<void> {
    await expect(this.rows).toContainText(productName);
  }

  async removeFirstProduct(): Promise<void> {
    const deleteLink = this.page.locator('#tbodyid tr td a').first();
    await deleteLink.click();
    await expect(this.rows).toHaveCount(0, { timeout: 10_000 });
  }

  async openPlaceOrderDialog(): Promise<void> {
    await this.placeOrderButton.click();
    await expect(this.orderModal).toBeVisible();
  }

  async completeOrder(details: OrderDetails): Promise<string> {
    await this.openPlaceOrderDialog();
    await this.page.locator('#name').fill(details.name);
    await this.page.locator('#country').fill(details.country);
    await this.page.locator('#city').fill(details.city);
    await this.page.locator('#card').fill(details.creditCard);
    await this.page.locator('#month').fill(details.month);
    await this.page.locator('#year').fill(details.year);

    await this.purchaseButton.click();
    await expect(this.successModal).toBeVisible();

    const confirmation = (await this.successModal.locator('.lead').textContent()) ?? '';
    await expect(this.successModal.getByRole('heading', { name: 'Thank you for your purchase!' })).toBeVisible();
    await this.page.getByRole('button', { name: 'OK' }).click();
    return confirmation;
  }

  async submitOrderWithoutRequiredFields(): Promise<void> {
    await this.openPlaceOrderDialog();
    await this.purchaseButton.click();
  }
}
