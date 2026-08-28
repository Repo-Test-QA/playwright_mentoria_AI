# Documentación del Escenario: TC-CHK-01

## 1. ¿Por qué se realizó este test? (Propósito y Riesgo)
Garantizar la validación de campos obligatorios (Nombre, Apellido, Código Postal) en el formulario de información de envío (Checkout Paso 1).

**Riesgo mitiga:** Envío de órdenes con datos de despacho incompletos que impidan la facturación o la entrega postal.

---

## 2. Precondiciones y Datos de Entrada
- Estar en la página `/checkout-step-one.html`.

---

## 3. Flujo de Ejecución
1. Presiona "Continue" con el formulario totalmente vacío -> Valida mensaje de error de Nombre.
2. Llena solo el Nombre y presiona "Continue" -> Valida mensaje de error de Apellido.
3. Llena Nombre y Apellido (sin Código Postal) y presiona "Continue" -> Valida mensaje de error de Código Postal.

---

## 4. Interacción con Page Objects

### [CheckoutStepOnePage](file:///c:/AG/QA/TA-PW/pages/CheckoutStepOnePage.ts)
- **`fillInformation(firstName, lastName, postalCode)`**: Completa los inputs parcial o totalmente.
- **`continue()`**: Clic en `continueButton` (`[data-test="continue"]`).
- **`getErrorMessageText()`**: Extrae el mensaje de error del locator `errorMessage` (`[data-test="error"]`).

---

## 5. Criterios de Aceptación y Aserciones
- `expect(errorText).toContain('Error: First Name is required')`
- `expect(errorText).toContain('Error: Last Name is required')`
- `expect(errorText).toContain('Error: Postal Code is required')`
