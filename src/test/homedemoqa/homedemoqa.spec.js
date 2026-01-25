import { test, expect } from '@playwright/test';
import { HomeDemoQATest } from './HomeDemoQATest.js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const testDataPath = join(__dirname, '../../data/homedemoqa/homedemoqa.json');
const testData = JSON.parse(readFileSync(testDataPath, 'utf-8'));

/**
 * Suite de pruebas para la página Home de DemoQA
 * Utiliza Page Object Model y Data Provider para ejecutar múltiples escenarios
 */

// Configurar dispositivos para las pruebas
const devices = {
  desktop: {
    viewport: { width: 1920, height: 1080 },
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  },
  mobile: {
    viewport: { width: 375, height: 667 },
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
    hasTouch: true,
    isMobile: true,
  },
};

// Ejecutar pruebas para cada caso del data provider
testData.forEach((testCase, index) => {
  test(`${index + 1}. ${testCase.nombre}`, async ({ page, browserName }) => {
    // Configurar dispositivo si es necesario
    if (testCase.device === 'mobile') {
      await page.setViewportSize(devices.mobile.viewport);
      await page.setUserAgent(devices.mobile.userAgent);
    } else {
      await page.setViewportSize(devices.desktop.viewport);
    }

    // Crear instancia de la clase de pruebas
    const homeDemoQATest = new HomeDemoQATest(page);

    console.log(`Ejecutando: ${testCase.description}`);

    try {
      // Tomar captura inicial
      await page.goto('https://demoqa.com/');
      await page.screenshot({
        path: `test-results/screenshots/homedemoqa-${index + 1}-initial-${browserName}.png`,
        fullPage: true,
      });

      let testResult;

      // Ejecutar el tipo de test específico
      switch (testCase.testType) {
        case 'validarBotonElementos':
          testResult = await homeDemoQATest.validarBotonElementos();
          break;

        case 'validarBotonFormularios':
          testResult = await homeDemoQATest.validarBotonFormularios();
          break;

        case 'validarBotonAlertas':
          testResult = await homeDemoQATest.validarBotonAlertas();
          break;

        case 'validarLabelWidget':
          testResult = await homeDemoQATest.validarLabelWidget();
          break;

        case 'validarBotonInteraccion':
          testResult = await homeDemoQATest.validarBotonInteraccion();
          break;

        case 'validarBotonBiblioteca':
          testResult = await homeDemoQATest.validarBotonBiblioteca();
          break;

        case 'validarTodasLasCardsVisibles':
          testResult = await homeDemoQATest.validarTodasLasCardsVisibles();
          break;

        case 'validarTitulosCards':
          testResult = await homeDemoQATest.validarTitulosCards();
          break;

        case 'validarNavegacionCompleta':
          testResult = await homeDemoQATest.validarNavegacionCompleta();
          break;

        default:
          throw new Error(`Tipo de test no reconocido: ${testCase.testType}`);
      }

      // Tomar captura después de la prueba
      await page.screenshot({
        path: `test-results/screenshots/homedemoqa-${index + 1}-final-${browserName}.png`,
        fullPage: true,
      });

      // Validar que el resultado del test sea exitoso
      expect(testResult).toBeTruthy();

      // Validar URL esperada si se especifica
      if (testCase.expectedUrl && testCase.expectedUrl !== '') {
        const currentUrl = page.url();
        expect(currentUrl).toContain(testCase.expectedUrl);
      }

      console.log(`✅ Test exitoso: ${testCase.nombre}`);
    } catch (error) {
      // Tomar captura en caso de error
      await page.screenshot({
        path: `test-results/screenshots/homedemoqa-${index + 1}-error-${browserName}.png`,
        fullPage: true,
      });

      console.error(`❌ Test fallido: ${testCase.nombre} - Error: ${error.message}`);
      throw error;
    }
  });
});

// Pruebas adicionales específicas para validación de elementos individuales
test.describe('DemoQA Home - Validaciones Específicas', () => {
  test('Validar presencia de todos los elementos principales', async ({ page }) => {
    const homeDemoQATest = new HomeDemoQATest(page);
    await page.goto('https://demoqa.com/');

    // Verificar que todos los elementos principales estén presentes
    await homeDemoQATest.homeDemoQAPage.initButtonElementos();
    await homeDemoQATest.homeDemoQAPage.initButtonFormularios();
    await homeDemoQATest.homeDemoQAPage.initButtonAlertas();
    await homeDemoQATest.homeDemoQAPage.initLabelWidget();
    await homeDemoQATest.homeDemoQAPage.initButtonInteraccion();
    await homeDemoQATest.homeDemoQAPage.initButtonBiblioteca();

    const elementsVisible = await homeDemoQATest.homeDemoQAPage.isButtonElementosVisible();
    const formsVisible = await homeDemoQATest.homeDemoQAPage.isButtonFormulariosVisible();
    const alertsVisible = await homeDemoQATest.homeDemoQAPage.isButtonAlertasVisible();
    const widgetVisible = await homeDemoQATest.homeDemoQAPage.isLabelWidgetVisible();
    const interactionVisible = await homeDemoQATest.homeDemoQAPage.isButtonInteraccionVisible();
    const bookStoreVisible = await homeDemoQATest.homeDemoQAPage.isButtonBibliotecaVisible();

    expect(elementsVisible).toBeTruthy();
    expect(formsVisible).toBeTruthy();
    expect(alertsVisible).toBeTruthy();
    expect(widgetVisible).toBeTruthy();
    expect(interactionVisible).toBeTruthy();
    expect(bookStoreVisible).toBeTruthy();
  });

  test('Validar título de la página', async ({ page }) => {
    await page.goto('https://demoqa.com/');
    const title = await page.title();
    expect(title).toContain('DEMOQA');
  });

  test('Validar carga completa de la página', async ({ page }) => {
    await page.goto('https://demoqa.com/');

    // Esperar a que la página cargue completamente
    await page.waitForLoadState('networkidle');

    // Verificar que al menos un elemento principal esté visible
    await expect(page.locator('//h5[normalize-space(text())="Elements"]')).toBeVisible();

    // Tomar captura de la página completamente cargada
    await page.screenshot({
      path: 'test-results/screenshots/homedemoqa-page-loaded.png',
      fullPage: true,
    });
  });
});

// Hook para setup y teardown
test.beforeEach(async ({ page }) => {
  // Configuración previa a cada test
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-US,en;q=0.9',
  });
});

test.afterEach(async ({ page }, testInfo) => {
  // Cleanup después de cada test
  if (testInfo.status !== testInfo.expectedStatus) {
    // Tomar captura en caso de fallo inesperado
    await page.screenshot({
      path: `test-results/screenshots/failure-${testInfo.title}-${Date.now()}.png`,
      fullPage: true,
    });
  }
});
