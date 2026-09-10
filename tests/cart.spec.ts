// ============================================================================
// ⚠️ [DEPRECADO - MODO ANTERIOR]:
// import { test, expect } from '@playwright/test';
// import { LoginPage } from '../pages/LoginPage';
// import { InventoryPage } from '../pages/InventoryPage';
// import { CartPage } from '../pages/CartPage';
// ============================================================================
// ✅ [ACTUALIZADO - CUSTOM FIXTURES]: Importación desde utils/fixture
import { test, expect } from '../utils/fixture';

test.describe('Módulo de Carrito de Compras', () => {

  // ============================================================================
  // ⚠️ [DEPRECADO - MODO ANTERIOR]:
  // let inventoryPage: InventoryPage;
  // let cartPage: CartPage;
  // test.beforeEach(async ({ page }) => {
  //   const loginPage = new LoginPage(page);
  //   await loginPage.goto();
  //   await loginPage.login('standard_user', 'secret_sauce');
  //   inventoryPage = new InventoryPage(page);
  //   cartPage = new CartPage(page);
  // });
  // ============================================================================
  // ⚠️ [DEPRECADO - LOGIN MANUAL CON VARIABLES DE ENTORNO EN BEFOREEACH]:
  // test.beforeEach(async ({ loginPage }) => {
  //   await loginPage.goto();
  //   await loginPage.login(
  //     process.env.STANDARD_USER ?? 'standard_user',
  //     process.env.STANDARD_PASSWORD ?? 'secret_sauce'
  //   );
  // });
  // ============================================================================
  // ✅ [ACTUALIZADO - CUSTOM FIXTURES]: Autenticación automática mediante la fixture loggedInPage
  test.beforeEach(async ({ loggedInPage }) => {
    // loggedInPage ejecuta la navegación e inicio de sesión centralizado
  });

  // ============================================================================
  // ⚠️ [DEPRECADO - MODO ANTERIOR]: Uso de variables declaradas a nivel de suite
  // test('TC-CRT-01', async () => { expect(await inventoryPage.getCartBadgeCount()).toBe('0'); });
  // ============================================================================
  // ✅ [ACTUALIZADO - CUSTOM FIXTURES]: Inyección de las fixtures necesarias en cada test
  test('TC-CRT-01: Actualización del contador badge en el carrito', async ({ inventoryPage }) => {
    expect(await inventoryPage.getCartBadgeCount()).toBe('0');

    await inventoryPage.addItemToCartBySlug('sauce-labs-backpack');
    expect(await inventoryPage.getCartBadgeCount()).toBe('1');

    await inventoryPage.addItemToCartBySlug('sauce-labs-bike-light');
    expect(await inventoryPage.getCartBadgeCount()).toBe('2');
  });

  test('TC-CRT-02: Revisión de productos agregados dentro del carrito', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addItemToCartBySlug('sauce-labs-backpack');
    await inventoryPage.addItemToCartBySlug('sauce-labs-bolt-t-shirt');
    await inventoryPage.goToCart();

    const count = await cartPage.getCartItemCount();
    expect(count).toBe(2);

    const names = await cartPage.getCartItemNames();
    expect(names).toContain('Sauce Labs Backpack');
    expect(names).toContain('Sauce Labs Bolt T-Shirt');
  });

  test('TC-CRT-03: Eliminar producto dentro de la página del carrito', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addItemToCartBySlug('sauce-labs-backpack');
    await inventoryPage.addItemToCartBySlug('sauce-labs-onesie');
    await inventoryPage.goToCart();

    expect(await cartPage.getCartItemCount()).toBe(2);

    await cartPage.removeItemBySlug('sauce-labs-backpack');
    expect(await cartPage.getCartItemCount()).toBe(1);

    const remainingNames = await cartPage.getCartItemNames();
    expect(remainingNames).toEqual(['Sauce Labs Onesie']);
  });

  test('TC-CRT-04: Botón "Continue Shopping" retorna al catálogo conservando el estado', async ({ inventoryPage, cartPage, page }) => {
    await inventoryPage.addItemToCartBySlug('sauce-labs-backpack');
    await inventoryPage.goToCart();
    await cartPage.continueShopping();

    await expect(page).toHaveURL(/.*inventory\.html/);
    expect(await inventoryPage.getCartBadgeCount()).toBe('1');
  });

  test('TC-CRT-05: Botón "Checkout" navega a Checkout Paso 1', async ({ inventoryPage, cartPage, page }) => {
    await inventoryPage.addItemToCartBySlug('sauce-labs-backpack');
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    await expect(page).toHaveURL(/.*checkout-step-one\.html/);
  });
});
