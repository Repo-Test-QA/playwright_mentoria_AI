import { Page, Locator } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async getCompleteHeader(): Promise<string> {
    return await this.completeHeader.innerText();
  }

  async getCompleteText(): Promise<string> {
    return await this.completeText.innerText();
  }

  async backHome(): Promise<void> {
    await this.backHomeButton.click();
  }
}
