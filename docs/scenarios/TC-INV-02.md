# Documentación del Escenario: TC-INV-02

## 1. ¿Por qué se realizó este test? (Propósito y Riesgo)
Garantizar el correcto funcionamiento del filtro de ordenamiento alfabético por Nombre (A a Z y Z a A).

**Riesgo mitiga:** Fallos en la lógica de ordenamiento que muestren productos fuera de orden, afectando la experiencia del usuario y la búsqueda de artículos.

---

## 2. Precondiciones y Datos de Entrada
- Usuario autenticado en `/inventory.html`.
- Opciones del select: `az` (A-Z) y `za` (Z-A).

---

## 3. Flujo de Ejecución
1. Selecciona la opción "Name (A to Z)".
2. Lee la lista de nombres y verifica que coincida con el orden alfabético ascendente.
3. Selecciona la opción "Name (Z to A)".
4. Lee la lista de nombres y verifica que coincida con el orden alfabético descendente.

---

## 4. Interacción con Page Objects

### [InventoryPage](file:///c:/AG/QA/TA-PW/pages/InventoryPage.ts)
- **`sortProducts(optionValue)`**: Interactúa con `sortSelect` (`[data-test="product-sort-container"]`) mediante `.selectOption()`.
- **`getAllItemNames()`**: Obtiene la lista ordenada de nombres en pantalla.

---

## 5. Criterios de Aceptación y Aserciones
- `expect(names).toEqual(sortedAZ)`
- `expect(names).toEqual(sortedZA)`
