# Documentación del Escenario: TC-INV-04

## 1. ¿Por qué se realizó este test? (Propósito y Riesgo)
Confirmar que al hacer clic en un producto del inventario, la aplicación navegue a la vista detallada del producto (PDP) mostrando la información consistente (nombre y precio) mediante aserciones Web-First.

**Riesgo mitiga:** Enlaces rotos o inconsistencias de datos entre el catálogo y la vista extendida del producto.

---

## 2. Precondiciones y Datos de Entrada
- Usuario autenticado en `/inventory.html`.
- Producto objetivo: `"Sauce Labs Backpack"`.

---

## 3. Flujo de Ejecución
1. En la lista de productos, hace clic en el nombre "Sauce Labs Backpack".
2. Espera la redirección a la URL `/inventory-item.html?id=4`.
3. Valida con auto-waiting (`toHaveText`) que el título del producto y su precio en la vista PDP coincidan exactamente con la información esperada.

---

## 4. Interacción con Page Objects

### [InventoryPage](file:///c:/AG/QA/TA-PW/pages/InventoryPage.ts)
- **`openProductDetailByName('Sauce Labs Backpack')`**: Localiza el elemento con el texto específico y ejecuta `.click()`.

### [ProductDetailPage](file:///c:/AG/QA/TA-PW/pages/ProductDetailPage.ts)
- **`productName`**: Locator al título de detalle `.inventory_details_name`.
- **`productPrice`**: Locator al precio de detalle `.inventory_details_price`.

---

## 5. Criterios de Aceptación y Aserciones (Web-First Assertions)
- `await expect(page).toHaveURL(/.*inventory-item.html/)`
- `await expect(pdp.productName).toHaveText('Sauce Labs Backpack')`
- `await expect(pdp.productPrice).toHaveText('$29.99')`
