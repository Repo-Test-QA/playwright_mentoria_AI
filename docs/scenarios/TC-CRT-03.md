# Documentación del Escenario: TC-CRT-03

## 1. ¿Por qué se realizó este test? (Propósito y Riesgo)
Asegurar que el usuario pueda arrepentirse y remover productos individualmente directamente dentro del carrito de compras.

**Riesgo mitiga:** Incapacidad de editar el carrito antes de comprar, lo que puede llevar al abandono del carrito o cobros indebidos.

---

## 2. Precondiciones y Datos de Entrada
- Productos agregados: `sauce-labs-backpack` y `sauce-labs-onesie`.
- Ubicación: `/cart.html`.

---

## 3. Flujo de Ejecución
1. Agrega los dos productos y entra al carrito.
2. Confirma que existen 2 ítems.
3. Hace clic en el botón "Remove" de la mochila (`sauce-labs-backpack`).
4. Valida que el conteo baje a 1 y que solo quede el producto "Sauce Labs Onesie".

---

## 4. Interacción con Page Objects

### [CartPage](file:///c:/AG/QA/TA-PW/pages/CartPage.ts)
- **`removeItemBySlug('sauce-labs-backpack')`**: Clic en `[data-test="remove-sauce-labs-backpack"]`.
- **`getCartItemCount()`**: Verifica la reducción de la lista.
- **`getCartItemNames()`**: Obtiene la lista actualizada de nombres.

---

## 5. Criterios de Aceptación y Aserciones
- `expect(await cartPage.getCartItemCount()).toBe(1)`
- `expect(remainingNames).toEqual(['Sauce Labs Onesie'])`
