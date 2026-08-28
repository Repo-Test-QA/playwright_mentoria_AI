# Suite de Automatización de Pruebas - SauceDemo (Playwright + TypeScript)

Este repositorio contiene la suite automatizada de pruebas end-to-end para la plataforma [SauceDemo](https://www.saucedemo.com/) construida con **Playwright**, **TypeScript** y el patrón **Page Object Model (POM)**.

---

## 📁 Estructura del Proyecto

- **[pages/](file:///c:/AG/QA/TA-PW/pages)**: Clases Page Object Model para cada pantalla de la aplicación.
- **[tests/](file:///c:/AG/QA/TA-PW/tests)**: Archivos de prueba organizados por módulo (`login`, `inventory`, `cart`, `checkout`).
- **[docs/](file:///c:/AG/QA/TA-PW/docs)**: Documentación del proyecto.
  - **[PLANNING.md](file:///c:/AG/QA/TA-PW/docs/PLANNING.md)**: Planificación y diseño de arquitectura.
  - **[CAPTURA_PASO_A_PASO.md](file:///c:/AG/QA/TA-PW/docs/CAPTURA_PASO_A_PASO.md)**: Guía de capturas de pantalla y trazas paso a paso (Opción 2 aplicada).
  - **[scenarios/](file:///c:/AG/QA/TA-PW/docs/scenarios)**: Explicación en Markdown individual para cada escenario de prueba (`TC-LOG-01` a `TC-CHK-05`).

---

## ⚡ Comandos Rápidos

### Ejecutar pruebas en modo UI (Interactiva)
```bash
npx playwright test --ui
```

### Ver el reporte nativo HTML
```bash
npx playwright show-report
```
