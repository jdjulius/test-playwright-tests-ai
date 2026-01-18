import { test, expect } from "@playwright/test";
import { ai } from "tests-ai";

/**
 * Test de ejemplo usando tests-ai con Playwright
 * Este test demuestra cómo usar IA para automatizar pruebas con texto en lenguaje natural
 */

test.describe("TodoMVC con tests-ai", () => {
  test("agregar una tarea usando IA", async ({ page }) => {
    // Navegar a la aplicación TodoMVC
    await page.goto("https://demo.playwright.dev/todomvc");

    // Usar IA para interactuar con la aplicación usando lenguaje natural
    await ai(
      "Escribe 'Comprar leche' en el campo de entrada y presiona Enter para agregar la tarea",
      { page, test }
    );

    // Verificar que la tarea se agregó
    await expect(page.getByTestId("todo-title")).toContainText("Comprar leche");
  });

  test("marcar tarea como completada usando IA", async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc");

    // Agregar una tarea primero
    await ai("Escribe 'Hacer ejercicio' y presiona Enter", { page, test });

    // Marcar como completada usando IA
    await ai("Marca la tarea 'Hacer ejercicio' como completada haciendo clic en el checkbox", {
      page,
      test,
    });

    // Verificar que está completada
    await expect(page.getByTestId("todo-item")).toHaveClass(/completed/);
  });

  test("filtrar tareas activas usando IA", async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc");

    // Agregar múltiples tareas
    await ai("Agrega una tarea llamada 'Leer libro'", { page, test });
    await ai("Agrega una tarea llamada 'Estudiar programación'", { page, test });
    
    // Marcar una como completada
    await ai("Marca 'Leer libro' como completada", { page, test });

    // Filtrar para mostrar solo activas
    await ai("Haz clic en el filtro 'Active' para mostrar solo tareas activas", {
      page,
      test,
    });

    // Verificar que solo se muestra la tarea activa
    const todoItems = page.getByTestId("todo-item");
    await expect(todoItems).toHaveCount(1);
    await expect(todoItems).toContainText("Estudiar programación");
  });
});
