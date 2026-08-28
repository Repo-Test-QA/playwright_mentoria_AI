import { Page, Locator } from '@playwright/test';

export class ProductDetailPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;
  readonly backToProductsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator('.inventory_details_name');
    this.productPrice = page.locator('.inventory_details_price');
    this.addToCartButton = page.locator('button.btn_inventory', { hasText: 'Add to cart' });
    this.removeButton = page.locator('button.btn_inventory', { hasText: 'Remove' });
    this.backToProductsButton = page.locator('[data-test="back-to-products"]');
  }

  async getProductName(): Promise<string> {
    return await this.productName.innerText();
  }

  async getProductPrice(): Promise<string> {
    return await this.productPrice.innerText();
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async backToProducts(): Promise<void> {
    await this.backToProductsButton.click();
  }
}
