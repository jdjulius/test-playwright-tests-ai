import { test, expect } from "@playwright/test";

/**
 * Ejemplo básico de Playwright SIN tests-ai
 * Usa este archivo para verificar que Playwright funciona correctamente
 * antes de configurar la API de Anthropic
 */

test.describe("TodoMVC - Ejemplo Básico (sin IA)", () => {
  test("agregar y verificar una tarea", async ({ page }) => {
    // Navegar a la aplicación
    await page.goto("https://demo.playwright.dev/todomvc");

    // Agregar una tarea usando selectores tradicionales
    const input = page.locator('input.new-todo');
    await input.fill("Comprar leche");
    await input.press("Enter");

    // Verificar que la tarea se agregó
    await expect(page.getByTestId("todo-title")).toContainText("Comprar leche");
  });

  test("marcar tarea como completada", async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc");

    // Agregar una tarea
    const input = page.locator('input.new-todo');
    await input.fill("Hacer ejercicio");
    await input.press("Enter");

    // Marcar como completada
    await page.locator('.toggle').click();

    // Verificar que está completada
    await expect(page.getByTestId("todo-item")).toHaveClass(/completed/);
  });
});
