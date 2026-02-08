import { test, expect } from '@playwright/test';
const ProcesarOrdenesTest = require('./ProcesarOrdenesTest');

test.describe('Procesar Ordenes', () => {
  let procesarOrdenesTest;

  test.beforeEach(async ({ page }) => {
    procesarOrdenesTest = new ProcesarOrdenesTest(page);
  });

  // Tests para el submódulo de Procesar Ordenes
});
