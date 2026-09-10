// ============================================================================
// ⚠️ [DEPRECADO - MODO ANTERIOR]:
// import { test, expect } from '@playwright/test';
// import { LoginPage } from '../pages/LoginPage';
// import { InventoryPage } from '../pages/InventoryPage';
// import { ProductDetailPage } from '../pages/ProductDetailPage';
// ============================================================================
// ✅ [ACTUALIZADO - CUSTOM FIXTURES]: Importación desde utils/fixture
import { test, expect } from '../utils/fixture';

test.describe('Módulo de Catálogo e Inventario', () => {

  // ============================================================================
  // ⚠️ [DEPRECADO - MODO ANTERIOR]: Instanciación manual en cada ejecución
  // let inventoryPage: InventoryPage;
  // test.beforeEach(async ({ page }) => {
  //   const loginPage = new LoginPage(page);
  //   await loginPage.goto();
  //   await loginPage.login('standard_user', 'secret_sauce');
  //   inventoryPage = new InventoryPage(page);
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
  // ⚠️ [DEPRECADO - MODO ANTERIOR]: Uso de variable global 'inventoryPage'
  // test('TC-INV-01: Despliegue correcto del catálogo de productos', async () => { ... });
  // ============================================================================
  // ✅ [ACTUALIZADO - CUSTOM FIXTURES]: Inyección de 'inventoryPage' como parámetro
  test('TC-INV-01: Despliegue correcto del catálogo de productos', async ({ inventoryPage }) => {
    const itemCount = await inventoryPage.getItemCount();
    expect(itemCount).toBe(6);

    const names = await inventoryPage.getAllItemNames();
    expect(names.length).toBe(6);
    expect(names).toContain('Sauce Labs Backpack');
    expect(names).toContain('Sauce Labs Onesie');
  });

  test('TC-INV-02: Ordenamiento por Nombre (A-Z, Z-A)', async ({ inventoryPage }) => {
    // A-Z
    await inventoryPage.sortProducts('az');
    let names = await inventoryPage.getAllItemNames();
    let sortedAZ = [...names].sort();
    expect(names).toEqual(sortedAZ);

    // Z-A
    await inventoryPage.sortProducts('za');
    names = await inventoryPage.getAllItemNames();
    let sortedZA = [...names].sort().reverse();
    expect(names).toEqual(sortedZA);
  });

  test('TC-INV-03: Ordenamiento por Precio (low-high, high-low)', async ({ inventoryPage }) => {
    // Low to High
    await inventoryPage.sortProducts('lohi');
    let prices = await inventoryPage.getAllItemPrices();
    let sortedLohi = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedLohi);

    // High to Low
    await inventoryPage.sortProducts('hilo');
    prices = await inventoryPage.getAllItemPrices();
    let sortedHilo = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedHilo);
  });

  // ============================================================================
  // ⚠️ [DEPRECADO - MODO ANTERIOR]:
  // test('TC-INV-04', async ({ page }) => {
  //   await inventoryPage.openProductDetailByName('Sauce Labs Backpack');
  //   const pdp = new ProductDetailPage(page);
  //   await expect(pdp.productName).toHaveText('Sauce Labs Backpack');
  // });
  // ============================================================================
  // ✅ [ACTUALIZADO - CUSTOM FIXTURES]: Inyección de inventoryPage y productDetailPage
  test('TC-INV-04: Navegación a la vista de detalle de producto (PDP)', async ({ inventoryPage, productDetailPage, page }) => {
    await inventoryPage.openProductDetailByName('Sauce Labs Backpack');
    await expect(page).toHaveURL(/.*inventory-item.html/);

    await expect(productDetailPage.productName).toHaveText('Sauce Labs Backpack');
    await expect(productDetailPage.productPrice).toHaveText('$29.99');
  });

  test('TC-INV-05: Agregar y remover producto desde inventario', async ({ inventoryPage }) => {
    // Add item
    await inventoryPage.addItemToCartBySlug('sauce-labs-backpack');
    expect(await inventoryPage.getCartBadgeCount()).toBe('1');
    expect(await inventoryPage.isRemoveButtonVisible('sauce-labs-backpack')).toBeTruthy();

    // Remove item
    await inventoryPage.removeItemFromCartBySlug('sauce-labs-backpack');
    expect(await inventoryPage.getCartBadgeCount()).toBe('0');
  });
});
