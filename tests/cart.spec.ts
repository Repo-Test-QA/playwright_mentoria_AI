import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Módulo de Carrito de Compras', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
  });

  test('TC-CRT-01: Actualización del contador badge en el carrito', async () => {
    expect(await inventoryPage.getCartBadgeCount()).toBe('0');

    await inventoryPage.addItemToCartBySlug('sauce-labs-backpack');
    expect(await inventoryPage.getCartBadgeCount()).toBe('1');

    await inventoryPage.addItemToCartBySlug('sauce-labs-bike-light');
    expect(await inventoryPage.getCartBadgeCount()).toBe('2');
  });

  test('TC-CRT-02: Revisión de productos agregados dentro del carrito', async () => {
    await inventoryPage.addItemToCartBySlug('sauce-labs-backpack');
    await inventoryPage.addItemToCartBySlug('sauce-labs-bolt-t-shirt');
    await inventoryPage.goToCart();

    const count = await cartPage.getCartItemCount();
    expect(count).toBe(2);

    const names = await cartPage.getCartItemNames();
    expect(names).toContain('Sauce Labs Backpack');
    expect(names).toContain('Sauce Labs Bolt T-Shirt');
  });

  test('TC-CRT-03: Eliminar producto dentro de la página del carrito', async () => {
    await inventoryPage.addItemToCartBySlug('sauce-labs-backpack');
    await inventoryPage.addItemToCartBySlug('sauce-labs-onesie');
    await inventoryPage.goToCart();

    expect(await cartPage.getCartItemCount()).toBe(2);

    await cartPage.removeItemBySlug('sauce-labs-backpack');
    expect(await cartPage.getCartItemCount()).toBe(1);

    const remainingNames = await cartPage.getCartItemNames();
    expect(remainingNames).toEqual(['Sauce Labs Onesie']);
  });

  test('TC-CRT-04: Botón "Continue Shopping" retorna al catálogo conservando el estado', async ({ page }) => {
    await inventoryPage.addItemToCartBySlug('sauce-labs-backpack');
    await inventoryPage.goToCart();
    await cartPage.continueShopping();

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    expect(await inventoryPage.getCartBadgeCount()).toBe('1');
  });

  test('TC-CRT-05: Botón "Checkout" navega a Checkout Paso 1', async ({ page }) => {
    await inventoryPage.addItemToCartBySlug('sauce-labs-backpack');
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
  });
});
