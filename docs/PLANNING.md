# Plan de Planificación y Arquitectura de Automatización

Este documento contiene el plan integral de diseño, arquitectura y ejecución para la automatización de pruebas de la plataforma **SauceDemo** (`https://www.saucedemo.com/`).

---

## 🎯 Alcance del Proyecto

El objetivo principal es implementar una suite de pruebas robusta, mantenible y escalable utilizando **Playwright**, **TypeScript** y el patrón de diseño **Page Object Model (POM)**.

### Módulos Coberturados (17 Escenarios):
- **Autenticación (Login / Logout):** `TC-LOG-01`, `TC-LOG-03`
- **Catálogo e Inventario:** `TC-INV-01`, `TC-INV-02`, `TC-INV-03`, `TC-INV-04`, `TC-INV-05`
- **Carrito de Compras:** `TC-CRT-01`, `TC-CRT-02`, `TC-CRT-03`, `TC-CRT-04`, `TC-CRT-05`
- **Proceso de Checkout y Compra:** `TC-CHK-01`, `TC-CHK-02`, `TC-CHK-03`, `TC-CHK-04`, `TC-CHK-05`

---

## 🏗️ Arquitectura del Proyecto (Page Object Model)

```
c:\AG\QA\TA-PW\
├── pages/                    # Encapsulación de selectores y métodos por pantalla
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── ProductDetailPage.ts
│   ├── CartPage.ts
│   ├── CheckoutStepOnePage.ts
│   ├── CheckoutStepTwoPage.ts
│   └── CheckoutCompletePage.ts
├── tests/                    # Especificación de pruebas agrupadas por módulo
│   ├── login.spec.ts
│   ├── inventory.spec.ts
│   ├── cart.spec.ts
│   └── checkout.spec.ts
└── docs/                     # Documentación general y técnica
    ├── PLANNING.md           # (Este archivo)
    ├── CAPTURA_PASO_A_PASO.md# Guía de capturas paso a paso (Opción 2 configurada)
    └── scenarios/            # Documentación técnica en Markdown por cada test
        ├── TC-LOG-01.md
        ├── TC-LOG-03.md
        ├── TC-INV-01.md
        ├── ...
        └── TC-CHK-05.md
```

---

## ⚙️ Buenas Prácticas Aplicadas

1. **Locators Semánticos y Resilientes:** Uso preferente de atributos `data-test` e identificadores estables para evitar fragilidad ante cambios estéticos.
2. **Aserciones Web-First (`expect`):** Aprovechamiento de reintentos automáticos y autowaiting nativos de Playwright.
3. **Aislamiento de Tests:** Cada prueba se ejecuta en su propio `BrowserContext` limpio y sin interferencias de estado.
4. **Documentación por Escenario:** Cada test en `tests/` cuenta con un archivo coincidente en `docs/scenarios/` que explica el riesgo de negocio, precondiciones y métodos POM utilizados.

---

## 🚀 Guía de Ejecución

### 1. Ejecutar en Modo Interactivo (UI Mode)
```bash
npx playwright test --ui
```

### 2. Generar y Abrir el Reporte Nativo HTML
```bash
npx playwright show-report
```

### 3. Generar Reporte Allure (Si se cuenta con Java JDK)
```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```
