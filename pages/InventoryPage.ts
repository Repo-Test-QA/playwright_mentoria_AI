import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly inventoryItems: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly sortSelect: Locator;
  readonly shoppingCartBadge: Locator;
  readonly shoppingCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.itemNames = page.locator('.inventory_item_name');
    this.itemPrices = page.locator('.inventory_item_price');
    this.sortSelect = page.locator('[data-test="product-sort-container"]');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
  }

  async getTitleText(): Promise<string> {
    return await this.title.innerText();
  }

  async getItemCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  async getAllItemNames(): Promise<string[]> {
    return await this.itemNames.allInnerTexts();
  }

  async getAllItemPrices(): Promise<number[]> {
    const rawPrices = await this.itemPrices.allInnerTexts();
    return rawPrices.map(priceStr => parseFloat(priceStr.replace('$', '')));
  }

  async sortProducts(optionValue: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortSelect.selectOption(optionValue);
  }

  async openProductDetailByName(name: string): Promise<void> {
    await this.page.locator('.inventory_item_name', { hasText: name }).click();
  }

  async addItemToCartBySlug(slug: string): Promise<void> {
    await this.page.locator(`[data-test="add-to-cart-${slug}"]`).click();
  }

  async removeItemFromCartBySlug(slug: string): Promise<void> {
    await this.page.locator(`[data-test="remove-${slug}"]`).click();
  }

  async isRemoveButtonVisible(slug: string): Promise<boolean> {
    return await this.page.locator(`[data-test="remove-${slug}"]`).isVisible();
  }

  async getCartBadgeCount(): Promise<string> {
    if (await this.shoppingCartBadge.isVisible()) {
      return await this.shoppingCartBadge.innerText();
    }
    return '0';
  }

  async goToCart(): Promise<void> {
    await this.shoppingCartLink.click();
    await this.page.waitForURL(/.*cart\.html/);
  }
}
