# Documentación del Escenario: TC-INV-03

## 1. ¿Por qué se realizó este test? (Propósito y Riesgo)
Verificar que el filtro por Precio ordene correctamente los productos numéricamente de menor a mayor (`lohi`) y de mayor a menor (`hilo`).

**Riesgo mitiga:** Errores en la conversión o comparación numérica que muestren precios desordenados o mal formateados.

---

## 2. Precondiciones y Datos de Entrada
- Usuario autenticado en `/inventory.html`.
- Opciones del select: `lohi` y `hilo`.

---

## 3. Flujo de Ejecución
1. Aplica el filtro `lohi` (Price low to high).
2. Extrae los precios numéricos y valida que el arreglo esté ordenado ascendentemente.
3. Aplica el filtro `hilo` (Price high to low).
4. Extrae los precios numéricos y valida que el arreglo esté ordenado descendentemente.

---

## 4. Interacción con Page Objects

### [InventoryPage](file:///c:/AG/QA/TA-PW/pages/InventoryPage.ts)
- **`sortProducts(optionValue)`**: Cambia la opción del filtro de precio.
- **`getAllItemPrices()`**: Mapea el texto del locator `itemPrices` (`.inventory_item_price`), convierte los precios a valores flotantes e ignora el símbolo `$`.

---

## 5. Criterios de Aceptación y Aserciones
- `expect(prices).toEqual(sortedLohi)`
- `expect(prices).toEqual(sortedHilo)`
