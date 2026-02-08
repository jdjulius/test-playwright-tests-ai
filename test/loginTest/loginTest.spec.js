import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/loginPage/LoginPage.js';

test.describe('Login Tests - Paisa Bombas', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    // Aumentar timeout para navegación
    test.setTimeout(60000); // 60 segundos
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
  });

  test('Login exitoso con credenciales válidas', async () => {
    const validEmail = 'apollostudiogt@gmail.com';
    const validPassword = 'wQt2x7@zI10*';
    const expectedUrl = 'https://dev.paisabombas.app/dashboard';

    await loginPage.performLoginWithValidation(validEmail, validPassword, expectedUrl);
    const hasErrors = await loginPage.hasErrorMessages();
    expect(hasErrors).toBeFalsy();

    const currentUrl = loginPage.page.url();
    expect(currentUrl).not.toContain('/login');
  });

  test('Login fallido que muestra modal de error', async () => {
    const invalidEmail = 'incorrect@email.com';
    const invalidPassword = 'wrongpassword';

    await loginPage.performLogin(invalidEmail, invalidPassword, false);

    // Esperar a que aparezca el mensaje de error
    await loginPage.page.waitForTimeout(2000);

    const hasErrors = await loginPage.hasErrorMessages();
    expect(hasErrors).toBeTruthy();

    // Verificar que se mantiene en la página de login
    const currentUrl = loginPage.page.url();
    expect(currentUrl).toContain('/login');

    // Verificar que hay un mensaje de error visible
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBeTruthy();
    expect(typeof errorMessage).toBe('string');
    expect(errorMessage.length).toBeGreaterThan(0);
  });
});
