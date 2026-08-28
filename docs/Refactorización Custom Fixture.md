# Documento de Refactorización: Custom Fixtures en Playwright

Este documento explica en detalle la implementación del patrón **Custom Fixtures** en la suite de pruebas automatizadas con Playwright (**TA-PW**).

---

## 🎯 Objetivo de la Mejora

Actualmente, cada archivo de prueba (`.spec.ts`) necesita importar e instanciar manualmente las clases de los Page Objects (por ejemplo, `const loginPage = new LoginPage(page);`) dentro de cada test o bloque `beforeEach`.

Con la implementación de **Custom Fixtures**:
1. Eliminamos el código repetitivo de instanciación manual (`new PageObject(page)`).
2. Playwright inyecta automáticamente las instancias preparadas directamente en los argumentos de cada test (`({ loginPage, inventoryPage })`).
3. El código de las pruebas se vuelve más limpio, mantenible y escalable.

---

## 📂 Archivos Afectados y Cambios Implementados

### 1. 🆕 `utils/fixture.ts` (Nuevo Archivo en carpeta `utils/`)
* **Propósito**: Define la extensión del objeto `test` de Playwright especificando todos los Page Objects disponibles como fixtures del proyecto.
* **Fixtures disponibles**:
  - `loginPage`: Instancia de `LoginPage`
  - `inventoryPage`: Instancia de `InventoryPage`
  - `productDetailPage`: Instancia de `ProductDetailPage`
  - `cartPage`: Instancia de `CartPage`
  - `stepOnePage`: Instancia de `CheckoutStepOnePage`
  - `stepTwoPage`: Instancia de `CheckoutStepTwoPage`
  - `completePage`: Instancia de `CheckoutCompletePage`

---

### 2. 📝 `tests/login.spec.ts`
* **Cambio**:
  - **Deprecado**: Importación desde `@playwright/test` e instanciación manual `new LoginPage(page)`.
  - **Actualizado**: Importación de `test` y `expect` desde `../utils/fixture` usando las fixtures `{ loginPage, inventoryPage }` como parámetros de las funciones de prueba.

---

### 3. 📝 `tests/inventory.spec.ts`
* **Cambio**:
  - **Deprecado**: Declaración de variables globales (`let inventoryPage: InventoryPage`) e instanciación manual en `beforeEach`.
  - **Actualizado**: Uso directo de `{ inventoryPage, loginPage, productDetailPage }` inyectados en cada prueba y en `beforeEach`.

---

### 4. 📝 `tests/cart.spec.ts`
* **Cambio**:
  - **Deprecado**: Inicialización repetida de `inventoryPage` y `cartPage` con operador `new`.
  - **Actualizado**: Recepción automática de las instancias `inventoryPage` y `cartPage` desde las fixtures.

---

### 5. 📝 `tests/checkout.spec.ts`
* **Cambio**:
  - **Deprecado**: Instanciación en cadena de 5 clases de páginas en el `beforeEach`.
  - **Actualizado**: Recepción limpia de todas las páginas de checkout necesarias a través de los argumentos del test.

---

## 📝 Formato de Comentarios en Código

En cada archivo modificado se ha dejado constancia visual del cambio:
```typescript
// ============================================================================
// ⚠️ [DEPRECADO - MODO ANTERIOR]: Instanciación manual con 'new'
// const loginPage = new LoginPage(page);
// ============================================================================
// ✅ [ACTUALIZADO - CUSTOM FIXTURE]: Inyección automática desde utils/fixture
// test('TC-LOG-01', async ({ loginPage }) => { ... });
// ============================================================================
```

---

## 🚀 Verificación y Ejecución

Para validar la ejecución de la suite de pruebas refactorizada utilizando la interfaz interactiva de Playwright:

```bash
npx playwright test --ui
```
