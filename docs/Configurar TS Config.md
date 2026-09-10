# Configurar TS Config

> *"veo que en los archivos test se muestra un alert sobre la palabra proccess, se indica que no se encuentra el nombre"*

Este documento detalla la solución al problema de reconocimiento de tipos globales de Node.js (como `process`), la instalación de dependencias de tipos y la configuración del archivo [tsconfig.json](file:///Users/guidosj/TA/PW/pw_mentoria/tsconfig.json) en proyectos de automatización con **Playwright** y **TypeScript**.

---

## 1. Contexto del Problema

Al comenzar a utilizar variables de entorno mediante `process.env` en los archivos de prueba (`.spec.ts`) o configuración (`playwright.config.ts`), el editor de código (VS Code u otros) y el compilador de TypeScript muestran una advertencia o error del tipo:

```text
Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
```

### ¿Por qué ocurre?
TypeScript por defecto no asume que el código se ejecuta en un entorno de **Node.js** (donde existen objetos globales como `process`, `__dirname`, `Buffer`, etc.). Para que el analizador de código y el autocompletado reconozcan estas palabras reservadas sin marcar error, es necesario proveer las definiciones de tipos correspondientes y un archivo de configuración que le indique al compilador cómo interpretar el proyecto.

---

## 2. Pasos de Solución

### Paso 1: Instalar los tipos de Node.js
Se debe instalar el paquete `@types/node` como dependencia de desarrollo:

```bash
npm install -D @types/node
```

Esto añade las definiciones de TypeScript oficiales para las APIs globales de Node.js a tu [package.json](file:///Users/guidosj/TA/PW/pw_mentoria/package.json).

---

### Paso 2: Crear el archivo `tsconfig.json`
En la raíz del proyecto, se crea el archivo [tsconfig.json](file:///Users/guidosj/TA/PW/pw_mentoria/tsconfig.json) con la siguiente estructura recomendada para proyectos con Playwright:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "commonjs",
    "moduleResolution": "node",
    "types": ["node", "@playwright/test"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": [
    "**/*.ts",
    "playwright.config.ts"
  ]
}
```

---

## 3. Desglose de Parámetros de `tsconfig.json`

| Propiedad | Valor | Propósito |
| :--- | :--- | :--- |
| `target` | `"ESNext"` | Emite JavaScript moderno con soporte para las últimas características de ECMAScript. |
| `module` | `"commonjs"` | Define el sistema de módulos compatible con Node.js estándar. |
| `moduleResolution` | `"node"` | Utiliza el algoritmo de resolución de dependencias clásico de Node.js para ubicar paquetes en `node_modules`. |
| `types` | `["node", "@playwright/test"]` | **Clave**: Carga explícitamente las declaraciones globales de Node (`process`, `__dirname`) y de Playwright (`test`, `expect`). |
| `strict` | `true` | Habilita todas las comprobaciones estrictas de tipado para mayor robustez y prevención de errores en tiempo de ejecución. |
| `esModuleInterop` | `true` | Permite importar módulos CommonJS como si fueran módulos ES6 estándar (ej. `import dotenv from 'dotenv'`). |
| `skipLibCheck` | `true` | Omite la verificación de tipos de todos los archivos `.d.ts` de librerías externas, acelerando notablemente la compilación. |
| `forceConsistentCasingInFileNames` | `true` | Evita problemas de discrepancia de mayúsculas/minúsculas entre sistemas operativos (Mac/Linux vs Windows). |
| `include` | `["**/*.ts", "playwright.config.ts"]` | Especifica qué archivos del proyecto deben ser analizados por TypeScript. |

---

## 4. Verificación y Validación

### Verificación de Tipos
Para comprobar que no existan errores de compilación ni advertencias de tipos en ningún archivo del proyecto:

```bash
npx tsc --noEmit
```
> Si el comando finaliza sin mensajes de salida y con código de salida `0`, significa que todos los tipos y globales (`process`, `test`, `expect`, Page Objects, etc.) están 100% reconocidos.

### Ejecución de Pruebas
Para confirmar que Playwright ejecute la suite correctamente bajo esta configuración:

```bash
npx playwright test --ui
```
