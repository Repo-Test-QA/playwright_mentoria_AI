# Documentación del Escenario: TC-CHK-02

## 1. ¿Por qué se realizó este test? (Propósito y Riesgo)
Verificar que el usuario pueda cancelar el proceso de checkout en la primera fase y regresar de forma segura a su carrito de compras.

**Riesgo mitiga:** Bloqueo del usuario dentro del formulario sin opción de retornar a ajustar su carrito.

---

## 2. Precondiciones y Datos de Entrada
- Estar en la página `/checkout-step-one.html`.

---

## 3. Flujo de Ejecución
1. Presiona el botón "Cancel".
2. Verifica la redirección inmediata a `/cart.html`.

---

## 4. Interacción con Page Objects

### [CheckoutStepOnePage](file:///c:/AG/QA/TA-PW/pages/CheckoutStepOnePage.ts)
- **`cancel()`**: Hace clic en `cancelButton` (`[data-test="cancel"]`).

---

## 5. Criterios de Aceptación y Aserciones
- `await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')`
