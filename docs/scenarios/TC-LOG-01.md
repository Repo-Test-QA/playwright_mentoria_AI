# Documentación del Escenario: TC-LOG-01

## 1. ¿Por qué se realizó este test? (Propósito y Riesgo)
El inicio de sesión exitoso (*Happy Path*) es la puerta de entrada principal a la aplicación SauceDemo. Este test se realiza para verificar que los usuarios legítimos con credenciales válidas puedan autenticarse correctamente y acceder a la plataforma sin impedimentos.

**Riesgo mitiga:** Un fallo en el login bloquea completamente el uso del sistema por parte de clientes reales, impidiendo la generación de ingresos y el uso de la plataforma.

---

## 2. Precondiciones y Datos de Entrada
- **Página inicial:** `https://www.saucedemo.com/`
- **Usuario:** `standard_user`
- **Contraseña:** `secret_sauce`

---

## 3. Flujo de Ejecución
1. El test navega a la URL principal.
2. Ingresa el nombre de usuario y la contraseña en el formulario de login.
3. Hace clic en el botón "Login".
4. Verifica la redirección a la URL `/inventory.html`.
5. Valida con auto-waiting que el título principal de la vista sea `"Products"`.

---

## 4. Interacción con Page Objects

### [LoginPage](file:///c:/AG/QA/TA-PW/pages/LoginPage.ts)
- **`goto()`**: Navega a la página de login mediante `page.goto()`.
- **`login(username, password)`**: Interactúa con los locators `usernameInput`, `passwordInput` y `loginButton`.

### [InventoryPage](file:///c:/AG/QA/TA-PW/pages/InventoryPage.ts)
- **`title`**: Locator al título `.title` usado para aserción directa.

---

## 5. Criterios de Aceptación y Aserciones (Web-First Assertions)
- `await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')`
- `await expect(inventoryPage.title).toHaveText('Products')`
