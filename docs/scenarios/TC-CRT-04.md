# Documentación del Escenario: TC-CRT-04

## 1. ¿Por qué se realizó este test? (Propósito y Riesgo)
Probar la navegación de retorno desde el carrito al catálogo mediante el botón "Continue Shopping", preservando el estado de los artículos ya agregados.

**Riesgo mitiga:** Pérdida de la selección de productos al intentar seguir comprando.

---

## 2. Precondiciones y Datos de Entrada
- Producto agregado: `sauce-labs-backpack`.
- Ubicación: `/cart.html`.

---

## 3. Flujo de Ejecución
1. Agrega 1 producto y navega al carrito.
2. Presiona el botón "Continue Shopping".
3. Verifica el retorno a `/inventory.html`.
4. Valida que el contador del carrito se conserve en `"1"`.

---

## 4. Interacción con Page Objects

### [CartPage](file:///c:/AG/QA/TA-PW/pages/CartPage.ts)
- **`continueShopping()`**: Hace clic en `continueShoppingButton` (`[data-test="continue-shopping"]`).

### [InventoryPage](file:///c:/AG/QA/TA-PW/pages/InventoryPage.ts)
- **`getCartBadgeCount()`**: Confirma la persistencia del número de ítems.

---

## 5. Criterios de Aceptación y Aserciones
- `await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')`
- `expect(await inventoryPage.getCartBadgeCount()).toBe('1')`
