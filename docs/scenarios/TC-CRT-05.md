# Documentación del Escenario: TC-CRT-05

## 1. ¿Por qué se realizó este test? (Propósito y Riesgo)
Verificar que el botón "Checkout" en el carrito inicie correctamente el embudo de pago navegando a la pantalla de información del cliente.

**Riesgo mitiga:** Bloqueo del flujo de conversión de compra hacia la pasarela o formulario de envío.

---

## 2. Precondiciones y Datos de Entrada
- Al menos 1 producto en el carrito.
- Ubicación: `/cart.html`.

---

## 3. Flujo de Ejecución
1. Con 1 ítem en el carrito, presiona "Checkout".
2. Verifica la redirección a `https://www.saucedemo.com/checkout-step-one.html`.

---

## 4. Interacción con Page Objects

### [CartPage](file:///c:/AG/QA/TA-PW/pages/CartPage.ts)
- **`proceedToCheckout()`**: Clic en `checkoutButton` (`[data-test="checkout"]`).

---

## 5. Criterios de Aceptación y Aserciones
- `await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')`
