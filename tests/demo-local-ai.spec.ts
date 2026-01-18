import { test, expect } from "@playwright/test";
import { ai } from "tests-ai";

/**
 * Ejemplo usando tests-ai con la demo local
 * 
 * NOTA: Este test requiere una clave API de Anthropic configurada
 * en el archivo .env como ANTHROPIC_API_KEY
 * 
 * Si no tienes la clave API, usa los tests en demo-local.spec.ts
 * que funcionan sin IA
 */

test.describe("Demo Local con tests-ai", () => {
  test("usar IA para interactuar con el formulario", async ({ page }) => {
    // Cargar la página de demo local
    await page.goto("file://" + process.cwd() + "/demo/index.html");

    // Usar IA para escribir y enviar texto
    await ai(
      "Escribe 'Probando tests-ai' en el campo de entrada y haz clic en el botón Enviar",
      { page, test }
    );

    // Verificar el resultado
    await expect(page.locator('#result')).toContainText('Probando tests-ai');
  });

  test("usar IA para marcar como completado", async ({ page }) => {
    await page.goto("file://" + process.cwd() + "/demo/index.html");

    // Primero agregar texto usando IA
    await ai("Escribe 'Mi tarea' en el campo y haz clic en Enviar", { page, test });

    // Luego marcar como completado usando IA
    await ai("Marca el checkbox 'Marcar como completado'", { page, test });

    // Verificar que tiene la clase completed
    await expect(page.locator('#result')).toHaveClass(/completed/);
  });

  test("usar IA para limpiar el formulario", async ({ page }) => {
    await page.goto("file://" + process.cwd() + "/demo/index.html");

    // Agregar texto
    await ai("Escribe algo y envíalo", { page, test });

    // Limpiar usando IA
    await ai("Haz clic en el botón Limpiar", { page, test });

    // Verificar que el campo está vacío
    await expect(page.locator('#input-field')).toHaveValue('');
  });
});
