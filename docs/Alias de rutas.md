# Guía de Arquitectura: Alias de Rutas (Path Aliases) en Playwright

Este documento detalla la implementación del patrón **Alias de Rutas (Path Aliases)** dentro del proyecto de automatización con Playwright (**TA-PW**), explicando su propósito, configuración, beneficios y ejemplos de uso práctico.

---

## 🎯 ¿Qué es un Alias de Ruta?

Un **Alias de Ruta** es un atajo o identificador prefijado (por ejemplo, `@pages`, `@utils`) definido en el compilador de TypeScript que reemplaza las rutas relativas tradicionales (`../`, `../../`).

En lugar de calcular manualmente cuántos niveles de carpetas subir o bajar:

```typescript
// ❌ Ruta relativa tradicional (frágil y propensa a errores)
import { LoginPage } from '../pages/LoginPage';
import { test, expect } from '../utils/fixture';
```

Se utiliza una ruta limpia, fija y desacoplada de la ubicación física del archivo:

```typescript
// ✅ Ruta con Alias (limpia, semántica y robusta)
import { LoginPage } from '@pages/LoginPage';
import { test, expect } from '@utils/fixture';
```

---

## 💡 Problema que Resuelve: "Relative Import Hell"

A medida que una suite de pruebas crece, surgen desafíos comunes con las rutas relativas:

1. **Ruptura de rutas al mover o refactorizar archivos:**
   - Si un test ubicado en `tests/login.spec.ts` importa `../utils/fixture`, y posteriormente se organiza en `tests/auth/login.spec.ts`, la ruta se rompe (`Cannot find module '../utils/fixture'`), obligando a corregir manualmente a `../../utils/fixture`.
   - Con **Alias de Rutas**, el import sigue siendo exactamente `@utils/fixture` sin importar la profundidad o ubicación del archivo.

2. **Dificultad de lectura y mantenimiento:**
   - Rutas como `../../../../components/Navbar` dificultan saber a simple vista a qué módulo pertenece cada import.
   - Un alias como `@pages/LoginPage` o `@utils/fixture` es autoexplicativo al instante.

3. **Productividad y Autocompletado en el IDE (VS Code):**
   - Al escribir `from '@pages/`, el editor sugiere automáticamente todas las clases de páginas disponibles sin tener que navegar por el árbol de carpetas.

---

## ⚙️ Configuración en `tsconfig.json`

Playwright tiene **soporte nativo** para los paths configurados en TypeScript. No requiere plugins adicionales ni herramientas externas de empaquetado.

La configuración se realiza dentro de `compilerOptions` en el archivo `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "commonjs",
    "moduleResolution": "node",
    "types": [
      "node",
      "@playwright/test"
    ],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,

    // 👇 CONFIGURACIÓN DE ALIAS DE RUTAS
    "baseUrl": ".",
    "paths": {
      "@pages/*": ["pages/*"],
      "@utils/*": ["utils/*"],
      "@tests/*": ["tests/*"]
    }
  },
  "include": [
    "**/*.ts",
    "playwright.config.ts"
  ]
}
```

### Explicación de los parámetros:
* **`baseUrl: "."`**: Define la raíz del proyecto como punto de partida para resolver todas las rutas relativas mapeadas.
* **`@pages/*`**: Apunta directamente al directorio `pages/*`.
* **`@utils/*`**: Apunta directamente al directorio `utils/*`.
* **`@tests/*`**: Apunta directamente al directorio `tests/*`.

---

## 📂 Archivos del Proyecto Afectados

### 1. `utils/fixture.ts`
Las importaciones de todas las clases Page Objects pasan de `../pages/` a `@pages/`:

```typescript
// ============================================================================
// ⚠️ [DEPRECADO - RUTA RELATIVA]:
// import { LoginPage } from '../pages/LoginPage';
// import { InventoryPage } from '../pages/InventoryPage';
// ============================================================================
// ✅ [ACTUALIZADO - ALIAS DE RUTAS]: Importación usando alias @pages
import { LoginPage } from '@pages/LoginPage';
import { InventoryPage } from '@pages/InventoryPage';
import { ProductDetailPage } from '@pages/ProductDetailPage';
import { CartPage } from '@pages/CartPage';
import { CheckoutStepOnePage } from '@pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '@pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '@pages/CheckoutCompletePage';
```

### 2. Archivos de Test (`tests/*.spec.ts`)
Los archivos `login.spec.ts`, `inventory.spec.ts`, `cart.spec.ts` y `checkout.spec.ts` importan `test` y `expect` desde `@utils/fixture`:

```typescript
// ============================================================================
// ⚠️ [DEPRECADO - RUTA RELATIVA]:
// import { test, expect } from '../utils/fixture';
// ============================================================================
// ✅ [ACTUALIZADO - ALIAS DE RUTAS]: Importación usando alias @utils
import { test, expect } from '@utils/fixture';
```

---

## 📊 Comparativa: Rutas Relativas vs. Alias de Rutas

| Criterio | Rutas Relativas (`../`) | Alias de Rutas (`@pages/`, `@utils/`) |
| :--- | :--- | :--- |
| **Mantenimiento al mover archivos** | Frágil (se rompen las rutas) | Inmune a cambios de jerarquía |
| **Legibilidad del código** | Compleja (`../../../`) | Clara, limpia y semántica |
| **Soporte en Playwright** | Nativo | Nativo (vía `tsconfig.json`) |
| **Autocompletado en IDE** | Limitado al contexto local | Global e inmediato para todo el proyecto |
| **Estándar en la industria** | Legado | Estándar moderno de arquitectura |

---

## 🚀 Ejecución y Validación

Para verificar que todos los alias funcionan correctamente y los tests compilan sin errores, ejecuta la suite con la UI interactiva:

```bash
npx playwright test --ui
```
