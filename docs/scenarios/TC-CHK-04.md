# Documentación del Escenario: TC-CHK-04

## 1. ¿Por qué se realizó este test? (Propósito y Riesgo)
Probar la opción de cancelación de la orden en la pantalla de resumen (Checkout Paso 2) y verificar que devuelva al usuario a la vista principal de la tienda (`/inventory.html`).

**Riesgo mitiga:** Bloqueo del proceso o redirecciones erróneas al desistir de la compra en la revisión final.

---

## 2. Precondiciones y Datos de Entrada
- Estar en la pantalla Checkout Paso 2 (`/checkout-step-two.html`).

---

## 3. Flujo de Ejecución
1. Llena datos en Paso 1 y avanza a Paso 2.
2. En Paso 2, presiona el botón "Cancel".
3. Verifica la redirección a `/inventory.html`.

---

## 4. Interacción con Page Objects

### [CheckoutStepTwoPage](file:///c:/AG/QA/TA-PW/pages/CheckoutStepTwoPage.ts)
- **`cancel()`**: Clic en `cancelButton` (`[data-test="cancel"]`).

---

## 5. Criterios de Aceptación y Aserciones
- `await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')`
