import { test, expect } from '@playwright/test';

test.describe('Ordenes de Compra', () => {
  let ordenesCompraTest;

  test.beforeEach(async ({ page }) => {
    ordenesCompraTest = new OrdenesCompraTest(page);
  });

  // Tests para el submódulo de Ordenes de Compra
});
