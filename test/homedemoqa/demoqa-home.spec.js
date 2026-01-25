const { test, expect } = require('@playwright/test');

// Configurar timeout personalizado para estos tests
test.use({
  actionTimeout: 15000,
  navigationTimeout: 30000,
});

test.describe('DemoQA Home Page Tests', () => {
  test('Validar página principal de DemoQA carga correctamente', async ({ page }) => {
    await page.goto('https://demoqa.com/', { waitUntil: 'domcontentloaded' });

    // Esperar a que al menos un elemento principal esté visible
    await page.waitForSelector('//h5[normalize-space(text())="Elements"]', { timeout: 15000 });

    // Verificar que el título contiene DemoQA
    await expect(page).toHaveTitle(/DEMOQA/);

    // Tomar captura de la página
    await page.screenshot({ path: 'test-results/screenshots/demoqa-home.png', fullPage: true });
  });

  test('Validar elementos principales están visibles', async ({ page }) => {
    await page.goto('https://demoqa.com/', { waitUntil: 'domcontentloaded' });

    // Esperar a que al menos un elemento cargue
    await page.waitForSelector('//h5[normalize-space(text())="Elements"]', { timeout: 15000 });

    // Verificar que los elementos principales estén visibles
    await expect(page.locator('//h5[normalize-space(text())="Elements"]')).toBeVisible();
    await expect(page.locator('//h5[normalize-space(text())="Forms"]')).toBeVisible();
    await expect(
      page.locator('//h5[normalize-space(text())="Alerts, Frame & Windows"]'),
    ).toBeVisible();
    await expect(page.locator('//h5[normalize-space(text())="Widgets"]')).toBeVisible();
    await expect(page.locator('//h5[normalize-space(text())="Interactions"]')).toBeVisible();
    await expect(
      page.locator('//h5[normalize-space(text())="Book Store Application"]'),
    ).toBeVisible();

    // Tomar captura
    await page.screenshot({
      path: 'test-results/screenshots/demoqa-elements-visible.png',
      fullPage: true,
    });
  });

  test('Validar navegación a Elements', async ({ page }) => {
    await page.goto('https://demoqa.com/', { waitUntil: 'domcontentloaded' });

    // Esperar y hacer clic en Elements
    await page.waitForSelector('//h5[normalize-space(text())="Elements"]', { timeout: 15000 });
    await page.click('//h5[normalize-space(text())="Elements"]');

    // Verificar navegación exitosa con timeout más permisivo
    await page.waitForURL('**/elements', { timeout: 30000 });
    expect(page.url()).toContain('elements');

    // Tomar captura
    await page.screenshot({
      path: 'test-results/screenshots/demoqa-elements-page.png',
      fullPage: true,
    });
  });

  test('Validar navegación a Forms', async ({ page }) => {
    await page.goto('https://demoqa.com/', { waitUntil: 'domcontentloaded' });

    // Esperar y hacer clic en Forms
    await page.waitForSelector('//h5[normalize-space(text())="Forms"]', { timeout: 15000 });
    await page.click('//h5[normalize-space(text())="Forms"]');

    // Verificar navegación exitosa
    await page.waitForURL('**/forms', { timeout: 30000 });
    expect(page.url()).toContain('forms');

    // Tomar captura
    await page.screenshot({
      path: 'test-results/screenshots/demoqa-forms-page.png',
      fullPage: true,
    });
  });

  test('Validar navegación a Alerts, Frame & Windows', async ({ page }) => {
    await page.goto('https://demoqa.com/', { waitUntil: 'domcontentloaded' });

    // Esperar y hacer clic en Alerts, Frame & Windows
    await page.waitForSelector('//h5[normalize-space(text())="Alerts, Frame & Windows"]', {
      timeout: 15000,
    });
    await page.click('//h5[normalize-space(text())="Alerts, Frame & Windows"]');

    // Verificar navegación exitosa
    await page.waitForURL('**/alertsWindows', { timeout: 30000 });
    expect(page.url()).toContain('alertsWindows');

    // Tomar captura
    await page.screenshot({
      path: 'test-results/screenshots/demoqa-alerts-page.png',
      fullPage: true,
    });
  });

  test('Validar navegación a Widgets', async ({ page }) => {
    await page.goto('https://demoqa.com/', { waitUntil: 'domcontentloaded' });

    // Esperar y hacer clic en Widgets
    await page.waitForSelector('//h5[normalize-space(text())="Widgets"]', { timeout: 15000 });
    await page.click('//h5[normalize-space(text())="Widgets"]');

    // Verificar navegación exitosa
    await page.waitForURL('**/widgets', { timeout: 30000 });
    expect(page.url()).toContain('widgets');

    // Tomar captura
    await page.screenshot({
      path: 'test-results/screenshots/demoqa-widgets-page.png',
      fullPage: true,
    });
  });

  test('Validar navegación a Interactions', async ({ page }) => {
    await page.goto('https://demoqa.com/', { waitUntil: 'domcontentloaded' });

    // Esperar y hacer clic en Interactions
    await page.waitForSelector('//h5[normalize-space(text())="Interactions"]', { timeout: 15000 });
    await page.click('//h5[normalize-space(text())="Interactions"]');

    // Verificar navegación exitosa
    await page.waitForURL('**/interaction', { timeout: 30000 });
    expect(page.url()).toContain('interaction');

    // Tomar captura
    await page.screenshot({
      path: 'test-results/screenshots/demoqa-interactions-page.png',
      fullPage: true,
    });
  });

  test('Validar navegación a Book Store Application', async ({ page }) => {
    await page.goto('https://demoqa.com/', { waitUntil: 'domcontentloaded' });

    // Esperar y hacer clic en Book Store Application
    await page.waitForSelector('//h5[normalize-space(text())="Book Store Application"]', {
      timeout: 15000,
    });
    await page.click('//h5[normalize-space(text())="Book Store Application"]');

    // Verificar navegación exitosa
    await page.waitForURL('**/books', { timeout: 30000 });
    expect(page.url()).toContain('books');

    // Tomar captura
    await page.screenshot({
      path: 'test-results/screenshots/demoqa-bookstore-page.png',
      fullPage: true,
    });
  });
});

// Tests adicionales para validaciones específicas
test.describe('DemoQA Home - Validaciones Avanzadas', () => {
  test('Validar que todas las cards son clickeables', async ({ page }) => {
    await page.goto('https://demoqa.com/', { waitUntil: 'domcontentloaded' });

    // Esperar a que al menos un elemento cargue
    await page.waitForSelector('//h5[normalize-space(text())="Elements"]', { timeout: 15000 });

    const cardSelectors = [
      '//h5[normalize-space(text())="Elements"]',
      '//h5[normalize-space(text())="Forms"]',
      '//h5[normalize-space(text())="Alerts, Frame & Windows"]',
      '//h5[normalize-space(text())="Widgets"]',
      '//h5[normalize-space(text())="Interactions"]',
      '//h5[normalize-space(text())="Book Store Application"]',
    ];

    for (const selector of cardSelectors) {
      await expect(page.locator(selector)).toBeVisible({ timeout: 10000 });
      await expect(page.locator(selector)).toBeEnabled();
    }

    // Tomar captura
    await page.screenshot({
      path: 'test-results/screenshots/demoqa-all-cards-validation.png',
      fullPage: true,
    });
  });

  test('Validar responsive design - Mobile', async ({ page }) => {
    // Configurar viewport móvil
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('https://demoqa.com/', { waitUntil: 'domcontentloaded' });

    // Esperar a que al menos un elemento cargue
    await page.waitForSelector('//h5[normalize-space(text())="Elements"]', { timeout: 15000 });

    // Verificar que los elementos siguen siendo visibles en mobile
    await expect(page.locator('//h5[normalize-space(text())="Elements"]')).toBeVisible();
    await expect(page.locator('//h5[normalize-space(text())="Forms"]')).toBeVisible();

    // Tomar captura en mobile
    await page.screenshot({
      path: 'test-results/screenshots/demoqa-mobile-view.png',
      fullPage: true,
    });
  });
});
