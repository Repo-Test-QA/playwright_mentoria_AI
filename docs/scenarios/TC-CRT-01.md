# Documentación del Escenario: TC-CRT-01

## 1. ¿Por qué se realizó este test? (Propósito y Riesgo)
Asegurar que el contador numérico (badge) ubicado en el ícono del carrito refleje de forma acumulativa e inmediata la cantidad total de artículos agregados por el usuario.

**Riesgo mitiga:** Desincronización entre la selección del usuario y el indicador global del carrito, provocando compras erróneas o confusión.

---

## 2. Precondiciones y Datos de Entrada
- Usuario en `/inventory.html`.
- Productos agregados: `sauce-labs-backpack`, `sauce-labs-bike-light`.

---

## 3. Flujo de Ejecución
1. Verifica que inicialmente el carrito no tenga badge (conteo 0).
2. Agrega el primer producto y valida que el badge marque `"1"`.
3. Agrega el segundo producto y valida que el badge incremente a `"2"`.

---

## 4. Interacción con Page Objects

### [InventoryPage](file:///c:/AG/QA/TA-PW/pages/InventoryPage.ts)
- **`addItemToCartBySlug()`**: Agrega productos de forma secuencial.
- **`getCartBadgeCount()`**: Evalúa la visibilidad y texto del badge.

---

## 5. Criterios de Aceptación y Aserciones
- `expect(await inventoryPage.getCartBadgeCount()).toBe('0')`
- `expect(await inventoryPage.getCartBadgeCount()).toBe('1')`
- `expect(await inventoryPage.getCartBadgeCount()).toBe('2')`
