import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly cartItemNames: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.cartItemNames = page.locator('.inventory_item_name');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async getCartItemCount(): Promise<number> {
    await this.cartItems.first().waitFor({ timeout: 3000 }).catch(() => {});
    return await this.cartItems.count();
  }

  async getCartItemNames(): Promise<string[]> {
    return await this.cartItemNames.allInnerTexts();
  }

  async removeItemBySlug(slug: string): Promise<void> {
    await this.page.locator(`[data-test="remove-${slug}"]`).click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
