# Guía de Captura de Imágenes Paso a Paso en Pruebas (Playwright)

Este documento registra la consulta técnica sobre cómo obtener e inspeccionar las imágenes y capturas paso a paso (*step-by-step screenshots*) durante y después de la ejecución de las pruebas en **Playwright Test UI**.

---

## 📌 Consulta
> **¿Cómo puedo obtener las imágenes del paso a paso de las pruebas cuando estoy en Playwright Test UI?**

---

## 🛠️ Opciones Disponibles

### Opción 1: Visualizar e inspeccionar en Playwright Test UI (Trace Viewer Integrado)
Al ejecutar las pruebas con `npx playwright test --ui`:
1. Seleccionar la prueba ejecutada en el panel izquierdo.
2. En la pestaña **Actions / Timeline** del panel lateral derecho, hacer clic o hovering en cualquier paso (`click`, `fill`, `toHaveText`, etc.).
3. Pestañas de vista previa:
   - **Before**: Captura de pantalla previa a la acción.
   - **Action**: Resalta el elemento interactuado.
   - **After**: Captura de pantalla posterior a la acción.
4. **Guardar la imagen:** Hacer clic derecho sobre la vista previa y seleccionar **"Guardar imagen como..."** (*Save image as...*).

---

### Opción 2: Configuración Automática de Capturas y Trazas (SELECCIONADA / UTILIZADA) ⭐

> [!IMPORTANT]
> **Estrategia Seleccionada en el Proyecto:**
> Se seleccionó e implementó la **Opción 2** mediante la modificación de [playwright.config.ts](file:///c:/AG/QA/TA-PW/playwright.config.ts), configurando la propiedad `screenshot: 'on'` para generar imágenes automáticamente en cada prueba.

#### Configuración en `playwright.config.ts`:

```typescript
export default defineConfig({
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry', // (O la opción 'on' para grabar el paso a paso completo)
    screenshot: 'on',        // Genera capturas de pantalla automáticamente al finalizar cada prueba
    video: 'on-first-retry'
  },
});
```

#### Ventajas de la Opción 2:
- Genera imágenes `.png` automáticamente dentro de la carpeta `test-results/`.
- Evita ensuciar el código de los tests (`tests/inventory.spec.ts`, etc.) con llamadas manuales a `page.screenshot()`.
- Integra automáticamente las capturas en los reportes de Playwright (HTML Report) y Allure Report.

---

### Opción 3: Capturas Manuales en Código (`page.screenshot`)
Agregar llamadas directas dentro del archivo `.spec.ts` si se requiere una captura en un instante específico:

```typescript
await page.screenshot({ path: 'test-results/mi-captura.png', fullPage: true });
```

---

## 🔍 Inspección de Trazas Grabadas
Para abrir y analizar una traza interactiva paso a paso generada por una ejecución:

```bash
npx playwright show-trace test-results/<nombre-del-directorio-test>/trace.zip
```
