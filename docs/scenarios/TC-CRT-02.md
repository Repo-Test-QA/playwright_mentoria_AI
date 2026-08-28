# Documentación del Escenario: TC-CRT-02

## 1. ¿Por qué se realizó este test? (Propósito y Riesgo)
Verificar que los productos agregados desde el inventario se listen correctamente dentro de la página del carrito de compras (`/cart.html`) con la cantidad y títulos esperados.

**Riesgo mitiga:** Omisión de artículos seleccionados o distorsión de la lista de compra antes de pasar al pago.

---

## 2. Precondiciones y Datos de Entrada
- Usuario autenticado en `/inventory.html`.
- Productos agregados: `sauce-labs-backpack` y `sauce-labs-bolt-t-shirt`.

---

## 3. Flujo de Ejecución
1. Agrega los dos productos desde el inventario.
2. Navega al carrito haciendo clic en la cesta de compras.
3. Valida la URL (`/cart.html`).
4. Obtiene el número total de renglones y la lista de nombres.
5. Aserta que contenga exactamente los productos agregados.

---

## 4. Interacción con Page Objects

### [InventoryPage](file:///c:/AG/QA/TA-PW/pages/InventoryPage.ts)
- **`addItemToCartBySlug()`**: Agrega los productos.
- **`goToCart()`**: Clic en `shoppingCartLink` (`.shopping_cart_link`).

### [CartPage](file:///c:/AG/QA/TA-PW/pages/CartPage.ts)
- **`getCartItemCount()`**: Cuenta los elementos del locator `cartItems` (`.cart_item`).
- **`getCartItemNames()`**: Obtiene los nombres mediante `cartItemNames` (`.inventory_item_name`).

---

## 5. Criterios de Aceptación y Aserciones
- `expect(count).toBe(2)`
- `expect(names).toContain('Sauce Labs Backpack')`
- `expect(names).toContain('Sauce Labs Bolt T-Shirt')`
