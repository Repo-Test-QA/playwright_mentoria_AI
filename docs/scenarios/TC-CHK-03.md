# Documentación del Escenario: TC-CHK-03

## 1. ¿Por qué se realizó este test? (Propósito y Riesgo)
Validar la exactitud de la suma financiera del subtotal de productos, cálculo del impuesto (Tax) y total final antes de autorizar la orden en Checkout Paso 2 (Overview).

**Riesgo mitiga:** Discrepancias contables, cobros incorrectos de impuestos o totales erróneos presentados al cliente.

---

## 2. Precondiciones y Datos de Entrada
- Productos agregados: `Sauce Labs Backpack` ($29.99) y `Sauce Labs Bike Light` ($9.99).
- Subtotal esperado: $39.98.
- Tax esperado (~8%): $3.20.
- Total esperado: $43.18.

---

## 3. Flujo de Ejecución
1. En Checkout Paso 1, ingresa información válida (Nombre, Apellido, Zip) y presiona Continue.
2. En Checkout Paso 2, extrae los valores numéricos de Subtotal, Tax y Total.
3. Aserta la precisión decimal matemática de los 3 rubros.

---

## 4. Interacción con Page Objects

### [CheckoutStepOnePage](file:///c:/AG/QA/TA-PW/pages/CheckoutStepOnePage.ts)
- **`fillInformation()`** y **`continue()`**.

### [CheckoutStepTwoPage](file:///c:/AG/QA/TA-PW/pages/CheckoutStepTwoPage.ts)
- **`getSubtotal()`**: Limpia y parsea el texto de `subtotalLabel` (`.summary_subtotal_label`).
- **`getTax()`**: Limpia y parsea el texto de `taxLabel` (`.summary_tax_label`).
- **`getTotal()`**: Limpia y parsea el texto de `totalLabel` (`.summary_total_label`).

---

## 5. Criterios de Aceptación y Aserciones
- `expect(subtotal).toBe(39.98)`
- `expect(tax).toBeCloseTo(3.20, 2)`
- `expect(total).toBeCloseTo(43.18, 2)`
