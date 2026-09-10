# Fix: Carga y Sincronización de Inventario y Carrito

Este documento detalla el análisis del aviso de Chromium sobre atributos de autocompletado en el formulario de login y la solución a las condiciones de carrera (*race conditions*) en la carga de elementos del catálogo e inventario en **Playwright**.

---

## 1. Análisis del Aviso en Consola: `[DOM] Input elements should have autocomplete attributes`

Durante la ejecución en la interfaz interactiva (`--ui`), se observó el siguiente mensaje en la pestaña de consola:

```text
[DOM] Input elements should have autocomplete attributes (suggested: "current-password"): (More info: https://goo.gl/9p2vKq) %o
```

### Diagnóstico:
1. **Origen Externo**: Este mensaje **no es un error de Playwright ni de las pruebas**. Es una advertencia informativa (*warning*) emitida directamente por el motor del navegador (Chromium/Blink).
2. **Causa**: En el código fuente del sitio web de SauceDemo (`saucedemo.com`), el campo de contraseña fue desarrollado como:
   ```html
   <input type="password" id="password" ... />
   ```
   sin incluir el atributo recomendado por los estándares web de accesibilidad y gestores de contraseñas: `autocomplete="current-password"`.
3. **Impacto**: Cero. Las pruebas no fallan por advertencias internas de la consola web de la aplicación bajo prueba.

---

## 2. El Problema Real: Desincronización de Carga (*Race Condition*)

Al ejecutar la suite en paralelo, algunas pruebas como `TC-INV-01` (conteo de productos en catálogo) o `TC-CRT-02` (conteo de productos en carrito) arrojaban fallos intermitentes:

```text
Error: expect(received).toBe(expected) // Object.is equality
Expected: 6
Received: 0
```

### ¿Por qué ocurría?
En Playwright, métodos de consulta directa como `locator.count()` o `locator.isVisible()` **NO tienen auto-espera** (a diferencia de aserciones como `await expect(locator).toHaveCount(6)`).

1. Al hacer clic en el botón de login, el navegador comienza la navegación hacia `inventory.html`.
2. La aplicación frontend (React) cambia la URL, pero sus componentes DOM (`.inventory_item`) tardan unos milisegundos adicionales en renderizarse en pantalla.
3. Si el test ejecutaba inmediatamente `await inventoryPage.getItemCount()`, Playwright consultaba el DOM en ese microsegundo exacto donde aún no existían los elementos, retornando `0`.

---

## 3. Soluciones Implementadas

### A. Sincronización en la Fixture `loggedInPage` ([utils/fixture.ts](file:///Users/guidosj/TA/PW/pw_mentoria/utils/fixture.ts))
Se aseguró que la fixture espere tanto el cambio de URL como la presencia real del primer producto en el DOM antes de entregar el control al test:

```typescript
// utils/fixture.ts
loggedInPage: async ({ loginPage, inventoryPage, page }, use) => {
  await loginPage.goto();
  await loginPage.login(
    process.env.STANDARD_USER ?? 'standard_user',
    process.env.STANDARD_PASSWORD ?? 'secret_sauce'
  );
  
  // ✅ 1. Espera a que la URL cambie a inventory.html
  await page.waitForURL(/.*inventory\.html/);

  // ✅ 2. Espera a que al menos el primer producto esté montado y visible en el DOM
  await inventoryPage.inventoryItems.first().waitFor();

  await use(inventoryPage);
},
```

---

### B. Navegación Segura en `goToCart` ([pages/InventoryPage.ts](file:///Users/guidosj/TA/PW/pw_mentoria/pages/InventoryPage.ts))
Al navegar al carrito, se agregó la espera explícita de la URL de destino:

```typescript
// pages/InventoryPage.ts
async goToCart(): Promise<void> {
  await this.shoppingCartLink.click();
  // ✅ Garantiza que la página del carrito haya cargado antes del siguiente paso
  await this.page.waitForURL(/.*cart\.html/);
}
```

---

### C. Conteo Robusto en `getCartItemCount` ([pages/CartPage.ts](file:///Users/guidosj/TA/PW/pw_mentoria/pages/CartPage.ts))
Para evitar que `locator.count()` devuelva `0` si los elementos `.cart_item` están terminando de renderizarse:

```typescript
// pages/CartPage.ts
async getCartItemCount(): Promise<number> {
  // ✅ Espera que el primer producto del carrito esté presente antes de contar
  await this.cartItems.first().waitFor({ timeout: 3000 }).catch(() => {});
  return await this.cartItems.count();
}
```

---

## 4. Resultado de la Verificación

Con estas mejoras de sincronización aplicadas, toda la suite de pruebas se ejecuta de forma consistente y sin condiciones de carrera:

```bash
Running 17 tests using 4 workers
  ✓ 17 passed (9.6s)
```

---

## 5. Modo de Ejecución Recomendado

Para observar la suite ejecutándose de manera interactiva:

```bash
npx playwright test --ui
```
