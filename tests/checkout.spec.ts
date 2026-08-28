import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

test.describe('Módulo de Proceso de Checkout y Compra', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let stepOnePage: CheckoutStepOnePage;
  let stepTwoPage: CheckoutStepTwoPage;
  let completePage: CheckoutCompletePage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    stepOnePage = new CheckoutStepOnePage(page);
    stepTwoPage = new CheckoutStepTwoPage(page);
    completePage = new CheckoutCompletePage(page);

    // Precondición: Agregar 2 productos e ir a Checkout Paso 1
    await inventoryPage.addItemToCartBySlug('sauce-labs-backpack');
    await inventoryPage.addItemToCartBySlug('sauce-labs-bike-light');
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
  });

  test('TC-CHK-01: Validación de campos obligatorios en Checkout Paso 1', async () => {
    // Submit empty
    await stepOnePage.continue();
    let errorText = await stepOnePage.getErrorMessageText();
    expect(errorText).toContain('Error: First Name is required');

    // Fill First Name only
    await stepOnePage.fillInformation('QA', '', '');
    await stepOnePage.continue();
    errorText = await stepOnePage.getErrorMessageText();
    expect(errorText).toContain('Error: Last Name is required');

    // Fill Last Name only
    await stepOnePage.fillInformation('QA', 'Tester', '');
    await stepOnePage.continue();
    errorText = await stepOnePage.getErrorMessageText();
    expect(errorText).toContain('Error: Postal Code is required');
  });

  test('TC-CHK-02: Cancelación del proceso en Checkout Paso 1', async ({ page }) => {
    await stepOnePage.cancel();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
  });

  test('TC-CHK-03: Resumen financiero y totales en Paso 2', async ({ page }) => {
    await stepOnePage.fillInformation('QA', 'Tester', '11111');
    await stepOnePage.continue();

    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

    const subtotal = await stepTwoPage.getSubtotal();
    const tax = await stepTwoPage.getTax();
    const total = await stepTwoPage.getTotal();

    // Backpack ($29.99) + Bike Light ($9.99) = $39.98
    expect(subtotal).toBe(39.98);
    expect(tax).toBeCloseTo(3.20, 2);
    expect(total).toBeCloseTo(43.18, 2);
  });

  test('TC-CHK-04: Cancelación del proceso en Checkout Paso 2', async ({ page }) => {
    await stepOnePage.fillInformation('QA', 'Tester', '15001');
    await stepOnePage.continue();

    await stepTwoPage.cancel();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('TC-CHK-05: Finalización exitosa de la compra en Paso 3', async ({ page }) => {
    await stepOnePage.fillInformation('QA', 'Tester', '15001');
    await stepOnePage.continue();

    await stepTwoPage.finish();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');

    const header = await completePage.getCompleteHeader();
    const text = await completePage.getCompleteText();

    expect(header).toBe('Thank you for your order!');
    expect(text).toContain('Your order has been dispatched');

    await completePage.backHome();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });
});
