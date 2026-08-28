import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';

test.describe('Módulo de Catálogo e Inventario', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    inventoryPage = new InventoryPage(page);
  });

  test('TC-INV-01: Despliegue correcto del catálogo de productos', async () => {
    const itemCount = await inventoryPage.getItemCount();
    expect(itemCount).toBe(6);

    const names = await inventoryPage.getAllItemNames();
    expect(names.length).toBe(6);
    expect(names).toContain('Sauce Labs Backpack');
    expect(names).toContain('Sauce Labs Onesie');

  });

  test('TC-INV-02: Ordenamiento por Nombre (A-Z, Z-A)', async () => {
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

  test('TC-INV-03: Ordenamiento por Precio (low-high, high-low)', async () => {
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

  test('TC-INV-04: Navegación a la vista de detalle de producto (PDP)', async ({ page }) => {
    await inventoryPage.openProductDetailByName('Sauce Labs Backpack');
    await expect(page).toHaveURL(/.*inventory-item.html/);

    const pdp = new ProductDetailPage(page);
    await expect(pdp.productName).toHaveText('Sauce Labs Backpack');
    await expect(pdp.productPrice).toHaveText('$29.99');
  });

  test('TC-INV-05: Agregar y remover producto desde inventario', async () => {
    // Add item
    await inventoryPage.addItemToCartBySlug('sauce-labs-backpack');
    expect(await inventoryPage.getCartBadgeCount()).toBe('1');
    expect(await inventoryPage.isRemoveButtonVisible('sauce-labs-backpack')).toBeTruthy();

    // Remove item
    await inventoryPage.removeItemFromCartBySlug('sauce-labs-backpack');
    expect(await inventoryPage.getCartBadgeCount()).toBe('0');
  });
});
