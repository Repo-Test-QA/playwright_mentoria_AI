# Documentación del Escenario: TC-INV-05

## 1. ¿Por qué se realizó este test? (Propósito y Riesgo)
Probar la interacción directa de agregar y remover un producto desde la tarjeta del producto en el catálogo principal, verificando la alternancia del botón y el contador del carrito.

**Riesgo mitiga:** Fallos en el estado local de los botones o inconsistencias en la interacción inicial con la cesta de compras.

---

## 2. Precondiciones y Datos de Entrada
- Usuario autenticado en `/inventory.html`.
- Producto slug: `"sauce-labs-backpack"`.

---

## 3. Flujo de Ejecución
1. Presiona "Add to cart" para la mochila.
2. Comprueba que el contador del carrito muestre `"1"`.
3. Verifica que el botón cambie a "Remove".
4. Presiona "Remove".
5. Verifica que el contador del carrito vuelva a `"0"`.

---

## 4. Interacción con Page Objects

### [InventoryPage](file:///c:/AG/QA/TA-PW/pages/InventoryPage.ts)
- **`addItemToCartBySlug('sauce-labs-backpack')`**: Clic en `[data-test="add-to-cart-sauce-labs-backpack"]`.
- **`getCartBadgeCount()`**: Obtiene la cantidad indicada en `shoppingCartBadge` (`.shopping_cart_badge`).
- **`isRemoveButtonVisible('sauce-labs-backpack')`**: Comprueba visibilidad de `[data-test="remove-sauce-labs-backpack"]`.
- **`removeItemFromCartBySlug('sauce-labs-backpack')`**: Clic en `[data-test="remove-sauce-labs-backpack"]`.

---

## 5. Criterios de Aceptación y Aserciones
- `expect(await inventoryPage.getCartBadgeCount()).toBe('1')`
- `expect(await inventoryPage.isRemoveButtonVisible('sauce-labs-backpack')).toBeTruthy()`
- `expect(await inventoryPage.getCartBadgeCount()).toBe('0')`
