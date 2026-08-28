# Documentación del Escenario: TC-INV-01

## 1. ¿Por qué se realizó este test? (Propósito y Riesgo)
Verificar que tras autenticarse, la tienda despliegue el inventario completo de productos disponibles con sus nombres correspondientes.

**Riesgo mitiga:** Catálogos vacíos, carga incompleta de ítems o problemas de rendering que impidan al cliente visualizar la oferta de la tienda.

---

## 2. Precondiciones y Datos de Entrada
- Usuario autenticado con `standard_user`.
- Ubicación: `/inventory.html`.

---

## 3. Flujo de Ejecución
1. Inicia sesión como `standard_user`.
2. Obtiene la cantidad total de tarjetas de producto desplegadas.
3. Extrae la lista de nombres de todos los productos.
4. Aserta que la cantidad sea exactamente 6 y que contenga productos clave.

---

## 4. Interacción con Page Objects

### [LoginPage](file:///c:/AG/QA/TA-PW/pages/LoginPage.ts)
- Realiza login con credenciales válidas.

### [InventoryPage](file:///c:/AG/QA/TA-PW/pages/InventoryPage.ts)
- **`getItemCount()`**: Cuenta los elementos del locator `inventoryItems` (`.inventory_item`).
- **`getAllItemNames()`**: Obtiene los textos del locator `itemNames` (`.inventory_item_name`).

---

## 5. Criterios de Aceptación y Aserciones
- `expect(itemCount).toBe(6)`
- `expect(names).toContain('Sauce Labs Backpack')`
- `expect(names).toContain('Sauce Labs Onesie')`
