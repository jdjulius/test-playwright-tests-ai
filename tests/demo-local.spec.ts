import { test, expect } from "@playwright/test";

/**
 * Ejemplo de verificación básica usando la demo local
 * Este test funciona sin conexión a internet
 */

test.describe("Demo Local - Verificación Básica", () => {
  test("verificar que la página carga correctamente", async ({ page }) => {
    // Cargar la página de demo local
    await page.goto("file://" + process.cwd() + "/demo/index.html");

    // Verificar que el título existe
    await expect(page.locator('h1')).toContainText("Demo Simple para tests-ai");

    // Verificar que los elementos principales existen
    await expect(page.locator('#input-field')).toBeVisible();
    await expect(page.locator('#submit-btn')).toBeVisible();
    await expect(page.locator('#clear-btn')).toBeVisible();
  });

  test("interactuar con el formulario", async ({ page }) => {
    await page.goto("file://" + process.cwd() + "/demo/index.html");

    // Escribir texto
    await page.locator('#input-field').fill('Hola Mundo');
    
    // Hacer clic en enviar
    await page.locator('#submit-btn').click();

    // Verificar el resultado
    await expect(page.locator('#result')).toContainText('Has escrito: Hola Mundo');
  });

  test("marcar como completado", async ({ page }) => {
    await page.goto("file://" + process.cwd() + "/demo/index.html");

    // Agregar texto primero
    await page.locator('#input-field').fill('Tarea de prueba');
    await page.locator('#submit-btn').click();

    // Marcar checkbox
    await page.locator('#complete-checkbox').check();

    // Verificar que tiene la clase 'completed'
    await expect(page.locator('#result')).toHaveClass(/completed/);
  });
});
