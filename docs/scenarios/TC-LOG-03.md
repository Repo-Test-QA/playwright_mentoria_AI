# Documentación del Escenario: TC-LOG-03

## 1. ¿Por qué se realizó este test? (Propósito y Riesgo)
Este test se realiza para verificar que el sistema maneje correctamente los intentos de inicio de sesión no autorizados o con datos erróneos, mostrando un mensaje de error claro y manteniendo la seguridad de la cuenta.

**Riesgo mitiga:** Acceso no autorizado por credenciales erróneas o mensajes de error ambiguos/ausentes que confundan al usuario o comprometan la seguridad.

---

## 2. Precondiciones y Datos de Entrada
- **Página inicial:** `https://www.saucedemo.com/`
- **Usuario:** `invalid_user`
- **Contraseña:** `wrong_password`

---

## 3. Flujo de Ejecución
1. El test navega a la URL de login.
2. Ingresa credenciales no registradas o incorrectas.
3. Presiona el botón "Login".
4. Valida con auto-waiting (`toContainText`) que el mensaje de error desplegado contenga el texto esperado.
5. Confirma que la URL se mantiene en la página principal (`https://www.saucedemo.com/`).

---

## 4. Interacción con Page Objects

### [LoginPage](file:///c:/AG/QA/TA-PW/pages/LoginPage.ts)
- **`goto()`**: Navega a la página de login.
- **`login(username, password)`**: Utiliza locators `usernameInput`, `passwordInput` y `loginButton`.
- **`errorMessage`**: Locator `[data-test="error"]` evaluado directamente mediante aserción Web-First.

---

## 5. Criterios de Aceptación y Aserciones (Web-First Assertions)
- `await expect(loginPage.errorMessage).toContainText('Username and password do not match any user in this service')`
- `await expect(page).toHaveURL('https://www.saucedemo.com/')`
