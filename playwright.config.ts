import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Carga de variables de entorno desde el archivo .env
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({

  // Directorio donde buscará los tests
  testDir: './tests',

  // TIEMPO MÁXIMO por test (30 segundos es estándar)
  timeout: 30 * 1000,

  // Aserciones: Tiempo de espera para expect(locator).toBeVisible()
  expect: {
    timeout: 5000
  },

  // PARALELISMO
  // En CI (Jenkins) queremos todos los cores al máximo.
  // En local, a veces es mejor limitar para ver qué pasa.
  fullyParallel: true,


  // REINTENTOS
  // Si falla en CI, reintenta 2 veces (flaky tests). En local, 0.
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,


  // REPORTES
  // 'html' genera un reporte web interactivo al final.
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],


  // --- CONFIGURACIÓN GLOBAL (use) ---
  // Esto aplica a todos los proyectos/navegadores
  use: {
    // URL base: Así en los tests solo pones page.goto('/')
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',

    // HEADLESS: 
    // true = Invisible (Rápido, ideal para CI/Docker)
    // false = Visible (Abre el navegador, ideal para debugear)
    headless: false,

    // TRAZAS (Trace Viewer): **LA JOYA DE PLAYWRIGHT**
    // Guarda un snapshot completo del DOM, red y consola paso a paso.
    // 'on-first-retry' significa que si falla, reintenta y graba la traza.
    trace: 'on-first-retry', // optión "on" -> Graba el paso a paso con imágenes en cada ejecución.

    // SCREENSHOTS:
    // 'off', 'on', 'only-on-failure' (Recomendado para no llenar el disco)
    screenshot: 'on',        // Toma captura al finalizar cada prueba (o 'only-on-failure').
    //screenshot: 'only-on-failure',  

    // VIDEO:
    video: 'on-first-retry'
    // Graba un video de la ejecución si falla.
    //video: 'retain-on-failure',



  },

  // --- PROYECTOS (Navegadores) ---
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Comentamos estos para ir rápido por ahora, luego los descomentas
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
