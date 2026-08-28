import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

// Definición del tipo para todas nuestras fixtures de tipo Page Object
type MyPageFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  productDetailPage: ProductDetailPage;
  cartPage: CartPage;
  stepOnePage: CheckoutStepOnePage;
  stepTwoPage: CheckoutStepTwoPage;
  completePage: CheckoutCompletePage;
};

// Extendemos la funcionalidad base de 'test' de Playwright para inyectar los Page Objects
export const test = base.extend<MyPageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  productDetailPage: async ({ page }, use) => {
    await use(new ProductDetailPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  stepOnePage: async ({ page }, use) => {
    await use(new CheckoutStepOnePage(page));
  },
  stepTwoPage: async ({ page }, use) => {
    await use(new CheckoutStepTwoPage(page));
  },
  completePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },
});

export { expect } from '@playwright/test';
