import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Módulo de Autenticación (Login)', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('TC-LOG-01: Login exitoso con credenciales válidas', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    const inventoryPage = new InventoryPage(page);
    await expect(inventoryPage.title).toHaveText('Products');
  });

  test('TC-LOG-03: Login fallido con credenciales inválidas', async ({ page }) => {
    await loginPage.login('invalid_user', 'wrong_password');
    await expect(loginPage.errorMessage).toContainText('Username and password do not match any user in this service');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

});
