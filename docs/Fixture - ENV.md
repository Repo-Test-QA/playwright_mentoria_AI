# Fixture Global (utils/fixture.ts) - Análisis y Centralización de Autenticación con Variables de Entorno

> *"En la Fixture Global (utils/fixture.ts) (Mejora de arquitectura opcional): Como en inventory.spec.ts, cart.spec.ts y checkout.spec.ts siempre repites el login en el beforeEach, puedes crear un fixture especial (por ejemplo loggedInPage): Este fixture lee process.env.STANDARD_USER y process.env.STANDARD_PASSWORD en un único punto central. Así evitas tener que llamar process.env en cada archivo de test."*

---

## 1. Dictamen de Factibilidad

### **Es 100% factible y altamente recomendada.**

Implementar un fixture personalizado de autenticación (`loggedInPage`) en [utils/fixture.ts](file:///Users/guidosj/TA/PW/pw_mentoria/utils/fixture.ts) representa una optimización arquitectónica clave para el proyecto de automatización con Playwright. Permite centralizar la lectura de credenciales y eliminar código repetitivo sin comprometer las pruebas directas de inicio de sesión.

---

## 2. El Problema Actual en el Proyecto

Antes de esta refactorización, el siguiente bloque de código se encontraba **exactamente duplicado** en los hooks `beforeEach` de 3 suites independientes:
- [tests/inventory.spec.ts](file:///Users/guidosj/TA/PW/pw_mentoria/tests/inventory.spec.ts)
- [tests/cart.spec.ts](file:///Users/guidosj/TA/PW/pw_mentoria/tests/cart.spec.ts)
- [tests/checkout.spec.ts](file:///Users/guidosj/TA/PW/pw_mentoria/tests/checkout.spec.ts)

```typescript
test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(
    process.env.STANDARD_USER ?? 'standard_user',
    process.env.STANDARD_PASSWORD ?? 'secret_sauce'
  );
});
```

### Consecuencias negativas del enfoque repetido:
1. **Violación del principio DRY (*Don't Repeat Yourself*)**: Si el flujo de inicio de sesión cambia (por ejemplo, validación de un banner, cookies o segundo factor), se debe modificar cada suite de pruebas individualmente.
2. **Fuga de responsabilidades (Leak of Concerns)**: Las pruebas de catálogo, carrito y checkout no deberían gestionar credenciales ni variables de entorno; su único propósito es validar la funcionalidad de su módulo sobre una sesión preexistente.
3. **Dispersión de variables de entorno**: `process.env.STANDARD_USER` y `process.env.STANDARD_PASSWORD` quedan esparcidos por múltiples archivos de test.

---

## 3. Beneficios de la Solución (Pros)

| Beneficio | Impacto en el Proyecto |
| :--- | :--- |
| **Punto Único de Verdad (Single Source of Truth)** | Las variables de entorno de autenticación se leen únicamente en [utils/fixture.ts](file:///Users/guidosj/TA/PW/pw_mentoria/utils/fixture.ts). |
| **Código Limpio y Declarativo** | Se elimina el boilerplate de login en los `beforeEach` de las suites de catálogo, carrito y compra. |
| **Aislamiento de Fallas** | Si las credenciales fallan o el servicio de login se cae, Playwright identifica el fallo en el *fixture setup*, indicando claramente que el problema no se originó en la lógica de carrito o checkout. |
| **Cero Impacto en [tests/login.spec.ts](file:///Users/guidosj/TA/PW/pw_mentoria/tests/login.spec.ts)** | Las pruebas de autenticación (tanto exitosas como fallidas) continúan usando `loginPage` directamente, ya que allí el objeto bajo prueba es el propio formulario. |

---

## 4. Puntos a Considerar (Trade-offs)

1. **Nivel de Abstracción**: El inicio de sesión ocurre de forma transparente al invocar la fixture `loggedInPage`, lo que requiere que los desarrolladores conozcan el patrón de Custom Fixtures de Playwright.
2. **Manejo de Múltiples Roles**: `loggedInPage` autentica por defecto con `STANDARD_USER`. Para pruebas con otros roles (`problem_user`, `locked_out_user`), se puede utilizar `loginPage.login(...)` de forma explícita o extender fixtures dedicadas (`problemUserPage`).
3. **Evolución Futura (`storageState`)**: En proyectos muy extensos, este patrón es el paso previo ideal para migrar a autenticación por cookies/sesión guardada (`storageState`), evitando repetir el login visual en cada prueba.

---

## 5. Implementación Técnica

### 1. Extensión de Fixtures en [utils/fixture.ts](file:///Users/guidosj/TA/PW/pw_mentoria/utils/fixture.ts)

Se añade `loggedInPage` a los tipos y a la definición extendida de `test`:

```typescript
type MyPageFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  productDetailPage: ProductDetailPage;
  cartPage: CartPage;
  stepOnePage: CheckoutStepOnePage;
  stepTwoPage: CheckoutStepTwoPage;
  completePage: CheckoutCompletePage;
  // ✅ Nueva fixture pre-autenticada
  loggedInPage: InventoryPage;
};

export const test = base.extend<MyPageFixtures>({
  // ... fixtures existentes ...
  loggedInPage: async ({ loginPage, inventoryPage }, use) => {
    await loginPage.goto();
    await loginPage.login(
      process.env.STANDARD_USER ?? 'standard_user',
      process.env.STANDARD_PASSWORD ?? 'secret_sauce'
    );
    await use(inventoryPage);
  },
});
```

### 2. Comparativa en los Tests (Antes vs Después)

#### [tests/inventory.spec.ts](file:///Users/guidosj/TA/PW/pw_mentoria/tests/inventory.spec.ts)
```typescript
// ❌ ANTES (Boilerplate repetido y variables dispersas)
test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(process.env.STANDARD_USER ?? 'standard_user', process.env.STANDARD_PASSWORD ?? 'secret_sauce');
});

// ✅ DESPUÉS (Limpio y desacoplado)
test.beforeEach(async ({ loggedInPage }) => {
  // La fixture ejecuta el login automáticamente y deja la sesión lista en inventoryPage
});
```

#### [tests/cart.spec.ts](file:///Users/guidosj/TA/PW/pw_mentoria/tests/cart.spec.ts)
```typescript
// ✅ DESPUÉS
test.beforeEach(async ({ loggedInPage }) => {});
```

#### [tests/checkout.spec.ts](file:///Users/guidosj/TA/PW/pw_mentoria/tests/checkout.spec.ts)
```typescript
// ❌ ANTES
test.beforeEach(async ({ loginPage, inventoryPage, cartPage }) => {
  await loginPage.goto();
  await loginPage.login(process.env.STANDARD_USER ?? 'standard_user', process.env.STANDARD_PASSWORD ?? 'secret_sauce');
  await inventoryPage.addItemToCartBySlug('sauce-labs-backpack');
  // ...
});

// ✅ DESPUÉS
test.beforeEach(async ({ loggedInPage, cartPage }) => {
  // Precondición: Agregar 2 productos e ir a Checkout Paso 1 (usando la página pre-autenticada)
  await loggedInPage.addItemToCartBySlug('sauce-labs-backpack');
  await loggedInPage.addItemToCartBySlug('sauce-labs-bike-light');
  await loggedInPage.goToCart();
  await cartPage.proceedToCheckout();
});
```

---

## 6. Validación de la Suite

Para validar la ejecución interactiva completa con la nueva fixture:

```bash
npx playwright test --ui
```
