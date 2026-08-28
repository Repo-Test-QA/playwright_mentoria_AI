# Documentación del Escenario: TC-CHK-05

## 1. ¿Por qué se realizó este test? (Propósito y Riesgo)
Probar la finalización exitosa del flujo completo de compra (Checkout Paso 3 - Confirmación) y verificar el mensaje de éxito y el retorno al estado inicial de la tienda.

**Riesgo mitiga:** Fallos en el procesamiento final de la compra, ausencia de mensajes de confirmación de pedido o problemas al reiniciar el flujo.

---

## 2. Precondiciones y Datos de Entrada
- Productos en el carrito y datos personales completados.
- Ubicación: `/checkout-step-two.html`.

---

## 3. Flujo de Ejecución
1. En Paso 2, presiona el botón "Finish".
2. Verifica la redirección a `/checkout-complete.html`.
3. Aserta que el título de confirmación diga `"Thank you for your order!"`.
4. Valida el texto explicativo de despacho.
5. Presiona "Back Home" y confirma el retorno a `/inventory.html`.

---

## 4. Interacción con Page Objects

### [CheckoutStepTwoPage](file:///c:/AG/QA/TA-PW/pages/CheckoutStepTwoPage.ts)
- **`finish()`**: Clic en `finishButton` (`[data-test="finish"]`).

### [CheckoutCompletePage](file:///c:/AG/QA/TA-PW/pages/CheckoutCompletePage.ts)
- **`getCompleteHeader()`**: Extrae el texto del encabezado `completeHeader` (`.complete-header`).
- **`getCompleteText()`**: Extrae el texto descriptivo `completeText` (`.complete-text`).
- **`backHome()`**: Clic en `backHomeButton` (`[data-test="back-to-products"]`).

---

## 5. Criterios de Aceptación y Aserciones
- `await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html')`
- `expect(header).toBe('Thank you for your order!')`
- `expect(text).toContain('Your order has been dispatched')`
- `await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')`
