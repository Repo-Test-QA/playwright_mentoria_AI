// ============================================================================
// ⚠️ [DEPRECADO - MODO ANTERIOR]:
// import { test, expect } from '@playwright/test';
// import { LoginPage } from '../pages/LoginPage';
// import { InventoryPage } from '../pages/InventoryPage';
// ============================================================================
// ✅ [ACTUALIZADO - CUSTOM FIXTURES]: Importamos 'test' y 'expect' desde utils/fixture
import { test, expect } from '../utils/fixture';

test.describe('Módulo de Autenticación (Login)', () => {

  // ============================================================================
  // ⚠️ [DEPRECADO - MODO ANTERIOR]: Instanciación manual en beforeEach
  // let loginPage: LoginPage;
  // test.beforeEach(async ({ page }) => {
  //   loginPage = new LoginPage(page);
  //   await loginPage.goto();
  // });
  // ============================================================================
  // ✅ [ACTUALIZADO - CUSTOM FIXTURES]: Inyección automática de loginPage
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  // ============================================================================
  // ⚠️ [DEPRECADO - MODO ANTERIOR]:
  // test('TC-LOG-01: Login exitoso con credenciales válidas', async ({ page }) => {
  //   await loginPage.login('standard_user', 'secret_sauce');
  //   await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  //   const inventoryPage = new InventoryPage(page);
  //   await expect(inventoryPage.title).toHaveText('Products');
  // });
  // ============================================================================
  // ✅ [ACTUALIZADO - CUSTOM FIXTURES]: Inyección directa de loginPage e inventoryPage
  test('TC-LOG-01: Login exitoso con credenciales válidas', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.login(
      process.env.STANDARD_USER ?? 'standard_user',
      process.env.STANDARD_PASSWORD ?? 'secret_sauce'
    );
    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(inventoryPage.title).toHaveText('Products');
  });

  // ============================================================================
  // ⚠️ [DEPRECADO - MODO ANTERIOR]:
  // test('TC-LOG-03: Login fallido con credenciales inválidas', async ({ page }) => {
  //   await loginPage.login('invalid_user', 'wrong_password');
  //   await expect(loginPage.errorMessage).toContainText('Username and password do not match any user in this service');
  //   await expect(page).toHaveURL('https://www.saucedemo.com/');
  // });
  // ============================================================================
  // ✅ [ACTUALIZADO - CUSTOM FIXTURES]: Inyección de loginPage como parámetro
  test('TC-LOG-03: Login fallido con credenciales inválidas', async ({ loginPage, page }) => {
    await loginPage.login(
      process.env.INVALID_USER ?? 'invalid_user',
      process.env.INVALID_PASSWORD ?? 'wrong_password'
    );
    await expect(loginPage.errorMessage).toContainText('Username and password do not match any user in this service');
    await expect(page).toHaveURL(/.*saucedemo\.com\/?$/);
  });

});
