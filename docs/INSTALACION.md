# Guía de Instalación y Configuración del Proyecto (TA-PW)

Este documento describe los pasos detallados para instalar las dependencias necesarias y ejecutar el proyecto de automatización de pruebas con Playwright en TypeScript.

---

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado en tu sistema:

1. **Node.js**: Versión 18.x o superior.
   - Puedes verificar tu versión ejecutando:
     ```bash
     node -v
     ```
2. **npm**: Gestor de paquetes incluido con Node.js.
   - Verifica tu versión ejecutando:
     ```bash
     npm -v
     ```

---

## 🚀 Pasos de Instalación

### 1. Clonar o Ubicar el Proyecto
Asegúrate de estar en el directorio raíz del proyecto:
```bash
cd c:\AG\QA\TA-PW
```
*(o el directorio clonado correspondiente, por ejemplo `c:\AG\TA-PW-V1`)*

### 2. Instalar las Dependencias de Node.js
Ejecuta el siguiente comando para instalar las librerías indicadas en el `package.json` (`@playwright/test`, `allure-playwright`, `@playwright/mcp`, etc.):

```bash
npm install
```

### 3. Instalar los Navegadores de Playwright
Playwright requiere descargar los binarios de los navegadores (Chromium, Firefox, WebKit). Ejecuta:

```bash
npx playwright install
```

*(Opcional: Si deseas instalar también las dependencias del sistema operativo requeridas por los navegadores, puedes ejecutar `npx playwright install --with-deps`)*

---

## 🧪 Ejecución de Pruebas

### 🎨 Modo Interfaz Gráfica (Recomendado)
Para ejecutar la suite de pruebas mediante la interfaz interactiva de Playwright (Playwright UI Mode):

```bash
npx playwright test --ui
```

### 🤖 Modo Headless (Línea de Comandos)
Para ejecutar todas las pruebas en segundo plano (modo headless):

```bash
npx playwright test
```

Para ejecutar una prueba o archivo específico:
```bash
npx playwright test tests/cart.spec.ts
```

---

## 📊 Reportes

### Reporte Nativo de Playwright
Para visualizar el reporte HTML generado automáticamente tras la ejecución:

```bash
npx playwright show-report
```

### Reporte de Allure (Opcional)
Si utilizas Allure Reporter:

```bash
# Generar reporte Allure
npx allure generate allure-results --clean -o allure-report

# Abrir reporte en el navegador
npx allure open allure-report
```
