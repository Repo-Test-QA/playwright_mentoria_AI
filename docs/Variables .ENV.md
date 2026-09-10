# Registro y Guía de Implementación: Variables de Entorno (.ENV)

Este documento detalla la arquitectura, los cambios realizados y las pautas de uso para la adopción de variables de entorno en el proyecto de automatización con **Playwright** y **TypeScript**.

---

## 1. Objetivo

Eliminar datos sensibles (credenciales de acceso) y dependencias fijas de URLs (hardcoded URLs) en el código fuente de los Page Objects y Suites de pruebas, permitiendo:
- **Seguridad**: Proteger usuarios y contraseñas evitando su exposición en repositorios públicos o privados.
- **Portabilidad**: Ejecutar la misma suite en diferentes ambientes (Local, QA, Staging, Producción) simplemente modificando la variable `BASE_URL`.
- **Mantenibilidad**: Centralizar la configuración de prueba en un único punto de verdad.

---

## 2. Puntos Implementados

### Punto 1: Configuración Global y Carga de Entorno
- **Instalación de `dotenv` y `@types/node`**: Se incorporó `dotenv` para cargar las variables del archivo `.env`, y `@types/node` junto a `tsconfig.json` para proporcionar el tipado global de `process` en TypeScript y eliminar alertas en el editor/IDE.
- **[playwright.config.ts](file:///Users/guidosj/TA/PW/pw_mentoria/playwright.config.ts)**:
  - Se importó `dotenv` y `path` para inicializar las variables antes de la ejecución de cualquier test o fixture.
  - Se configuró la propiedad `baseURL` para consumir `process.env.BASE_URL || 'https://www.saucedemo.com'`.
- **Archivos `.env` y `.env.example`**:
  - Se creó el archivo `.env` con las variables locales (`BASE_URL`, `STANDARD_USER`, `STANDARD_PASSWORD`, `INVALID_USER`, `INVALID_PASSWORD`).
  - Se creó `.env.example` como plantilla limpia de referencia para el equipo.
  - Se verificó que [.gitignore](file:///Users/guidosj/TA/PW/pw_mentoria/.gitignore) ignore el archivo `.env`.

### Punto 2: Capa de Page Objects
- **[pages/LoginPage.ts](file:///Users/guidosj/TA/PW/pw_mentoria/pages/LoginPage.ts)**:
  - En el método `goto()`, se reemplazó la URL fija `'https://www.saucedemo.com/'` por la ruta relativa `'/'`. Playwright resolverá automáticamente esta ruta contra el `baseURL` configurado en `playwright.config.ts`.
  - El resto de Page Objects (`CartPage`, `InventoryPage`, `CheckoutStepOnePage`, etc.) no requirieron modificaciones ya que operan por interacción directa sobre la página y no realizan navegaciones absolutas independientes.

### Punto 3: Capa de Pruebas (Credenciales en `beforeEach` y Tests)
Se actualizaron todas las suites de prueba para consumir credenciales dinámicas desde las variables de entorno con valores por defecto (fallback seguro):
- **[tests/login.spec.ts](file:///Users/guidosj/TA/PW/pw_mentoria/tests/login.spec.ts)**:
  - `TC-LOG-01`: Consume `process.env.STANDARD_USER` y `process.env.STANDARD_PASSWORD`.
  - `TC-LOG-03`: Consume `process.env.INVALID_USER` y `process.env.INVALID_PASSWORD`.
- **[tests/inventory.spec.ts](file:///Users/guidosj/TA/PW/pw_mentoria/tests/inventory.spec.ts)**:
  - El hook `beforeEach` autentica consumiendo las variables de entorno `STANDARD_USER` y `STANDARD_PASSWORD`.
- **[tests/cart.spec.ts](file:///Users/guidosj/TA/PW/pw_mentoria/tests/cart.spec.ts)**:
  - El hook `beforeEach` autentica consumiendo las variables de entorno `STANDARD_USER` y `STANDARD_PASSWORD`.
- **[tests/checkout.spec.ts](file:///Users/guidosj/TA/PW/pw_mentoria/tests/checkout.spec.ts)**:
  - El hook `beforeEach` autentica consumiendo las variables de entorno `STANDARD_USER` y `STANDARD_PASSWORD`.

### Punto 4: Flexibilización de Aserciones de URL
Al cambiar de ambiente (`BASE_URL`), las aserciones que validan la URL completa fallarían. Por esta razón, se actualizaron las aserciones `toHaveURL` a expresiones regulares:
- `https://www.saucedemo.com/inventory.html` ➔ `/.*inventory\.html/`
- `https://www.saucedemo.com/cart.html` ➔ `/.*cart\.html/`
- `https://www.saucedemo.com/checkout-step-one.html` ➔ `/.*checkout-step-one\.html/`
- `https://www.saucedemo.com/checkout-step-two.html` ➔ `/.*checkout-step-two\.html/`
- `https://www.saucedemo.com/checkout-complete.html` ➔ `/.*checkout-complete\.html/`
- `https://www.saucedemo.com/` ➔ `/.*saucedemo\.com\/?$/` o comprobación flexible de raíz.

---

## 3. Matriz de Cambios por Archivo

| Archivo | Ubicación | Tipo de Modificación |
| :--- | :--- | :--- |
| `.env` | Raíz | Nuevo archivo de variables locales |
| `.env.example` | Raíz | Plantilla versionada en Git |
| `playwright.config.ts` | Raíz | Carga de `dotenv` y configuración dinámica de `baseURL` |
| `pages/LoginPage.ts` | `pages/` | Cambio de navegación absoluta a relativa `goto('/')` |
| `tests/login.spec.ts` | `tests/` | Consumo de credenciales y aserción regex de URL |
| `tests/inventory.spec.ts` | `tests/` | Inyección de variables en `beforeEach` |
| `tests/cart.spec.ts` | `tests/` | Inyección de variables en `beforeEach` y regex en aserciones de URL |
| `tests/checkout.spec.ts` | `tests/` | Inyección de variables en `beforeEach` y regex en aserciones de URL |

---

## 4. Modo de Ejecución Recomendado

Para verificar visualmente la carga y el comportamiento de toda la suite con las nuevas variables:

```bash
npx playwright test --ui
```
