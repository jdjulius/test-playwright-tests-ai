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

  test.describe('Validación de elementos de la página', () => {
    test.skip('Verificar que todos los elementos del formulario están visibles', async () => {
      await loginPage.initAllElements();

      expect(await loginPage.isInputEmailVisible()).toBeTruthy();
      expect(await loginPage.isInputPasswordVisible()).toBeTruthy();
      expect(await loginPage.isButtonIniciarSesionVisible()).toBeTruthy();
      expect(await loginPage.isLinkOlvidarPasswordVisible()).toBeTruthy();
    });

    test.skip('Verificar que el botón de iniciar sesión está habilitado', async () => {
      await loginPage.initButtonIniciarSesion();
      expect(await loginPage.isButtonIniciarSesionEnabled()).toBeTruthy();
    });

    test.skip('Verificar que todos los elementos están visibles usando método combinado', async () => {
      const allVisible = await loginPage.areAllElementsVisible();
      expect(allVisible).toBeTruthy();
    });
  });

  test.describe('Funcionalidad de login exitoso', () => {
    test('Login exitoso con credenciales válidas', async () => {
      const validEmail = 'apollostudiogt@gmail.com';
      const validPassword = 'wQt2x7@zI10*';
      const expectedUrl = 'https://dev.paisabombas.app/dashboard'; // Ajustar según la URL esperada

      await loginPage.performLoginWithValidation(validEmail, validPassword, expectedUrl);

      // Verificar que no hay mensajes de error
      const hasErrors = await loginPage.hasErrorMessages();
      expect(hasErrors).toBeFalsy();
    });

    test('Realizar login completo navegando y validando', async () => {
      const validEmail = 'apollostudiogt@gmail.com';
      const validPassword = 'ValidPassword123';

      await loginPage.performFullLogin(validEmail, validPassword);

      // Verificar que la URL cambió (no sigue siendo la página de login)
      const currentUrl = loginPage.page.url();
      expect(currentUrl).not.toContain('/login');
    });
  });

  test.describe.skip('Validación de credenciales incorrectas', () => {
    test('Login con email incorrecto', async () => {
      const invalidEmail = 'incorrect@email.com';
      const validPassword = 'ValidPassword123';

      await loginPage.performLogin(invalidEmail, validPassword, false);

      // Esperar a que aparezca el mensaje de error
      await loginPage.page.waitForTimeout(2000);

      const hasErrors = await loginPage.hasErrorMessages();
      expect(hasErrors).toBeTruthy();
    });

    test('Login con contraseña incorrecta', async () => {
      const validEmail = 'apollostudiogt@gmail.com';
      const invalidPassword = 'IncorrectPassword';

      await loginPage.performLogin(validEmail, invalidPassword, false);

      // Esperar a que aparezca el mensaje de error
      await loginPage.page.waitForTimeout(2000);

      const hasErrors = await loginPage.hasErrorMessages();
      expect(hasErrors).toBeTruthy();
    });

    test('Login con ambas credenciales incorrectas', async () => {
      const invalidEmail = 'wrong@email.com';
      const invalidPassword = 'WrongPassword';

      await loginPage.performLogin(invalidEmail, invalidPassword, false);

      // Esperar a que aparezca el mensaje de error
      await loginPage.page.waitForTimeout(2000);

      const hasErrors = await loginPage.hasErrorMessages();
      expect(hasErrors).toBeTruthy();
    });
  });

  test.describe.skip('Validación de campos vacíos', () => {
    test('Intentar login con campos vacíos', async () => {
      await loginPage.initAllElements();
      await loginPage.clickIniciarSesion();

      // Verificar que el formulario no está completo
      const isComplete = await loginPage.isFormComplete();
      expect(isComplete).toBeFalsy();

      // Verificar que sigue en la misma página
      const currentUrl = loginPage.page.url();
      expect(currentUrl).toContain('/login');
    });

    test('Intentar login solo con email', async () => {
      const email = 'apollostudiogt@gmail.com';

      await loginPage.initAllElements();
      await loginPage.fillEmail(email);
      await loginPage.clickIniciarSesion();

      // Verificar que el email se mantiene
      const emailValue = await loginPage.getEmailValue();
      expect(emailValue).toBe(email);

      // Verificar que el password está vacío
      const passwordValue = await loginPage.getPasswordValue();
      expect(passwordValue).toBe('');
    });

    test('Intentar login solo con contraseña', async () => {
      const password = 'ValidPassword123';

      await loginPage.initAllElements();
      await loginPage.fillPassword(password);
      await loginPage.clickIniciarSesion();

      // Verificar que el password se mantiene
      const passwordValue = await loginPage.getPasswordValue();
      expect(passwordValue).toBe(password);

      // Verificar que el email está vacío
      const emailValue = await loginPage.getEmailValue();
      expect(emailValue).toBe('');
    });
  });

  test.describe.skip('Funcionalidad de limpiar formulario', () => {
    test('Limpiar campos individuales', async () => {
      const email = 'test@email.com';
      const password = 'testpassword';

      await loginPage.initAllElements();

      // Llenar campos
      await loginPage.fillEmail(email);
      await loginPage.fillPassword(password);

      // Verificar que están llenos
      expect(await loginPage.getEmailValue()).toBe(email);
      expect(await loginPage.getPasswordValue()).toBe(password);

      // Limpiar email
      await loginPage.clearEmail();
      expect(await loginPage.getEmailValue()).toBe('');
      expect(await loginPage.getPasswordValue()).toBe(password);

      // Limpiar password
      await loginPage.clearPassword();
      expect(await loginPage.getPasswordValue()).toBe('');
    });

    test('Limpiar formulario completo', async () => {
      const email = 'test@email.com';
      const password = 'testpassword';

      await loginPage.initAllElements();

      // Llenar campos
      await loginPage.fillEmail(email);
      await loginPage.fillPassword(password);

      // Verificar que están llenos
      expect(await loginPage.getEmailValue()).toBe(email);
      expect(await loginPage.getPasswordValue()).toBe(password);

      // Limpiar todo el formulario
      await loginPage.clearForm();

      // Verificar que ambos campos están vacíos
      expect(await loginPage.getEmailValue()).toBe('');
      expect(await loginPage.getPasswordValue()).toBe('');
    });
  });

  test.describe.skip('Funcionalidad de olvidar contraseña', () => {
    test('Hacer clic en enlace olvidar contraseña', async () => {
      await loginPage.initLinkOlvidarPassword();

      // Verificar que el enlace está visible antes de hacer clic
      expect(await loginPage.isLinkOlvidarPasswordVisible()).toBeTruthy();

      await loginPage.clickOlvidarPassword();

      // Verificar que la URL cambió o que se abrió modal/página de recuperación
      await loginPage.page.waitForTimeout(1000);
      // Nota: Ajustar la validación según el comportamiento real de la aplicación
    });
  });

  test.describe.skip('Validación de estado del formulario', () => {
    test('Verificar estado completo del formulario', async () => {
      await loginPage.initAllElements();

      // Formulario vacío no está completo
      expect(await loginPage.isFormComplete()).toBeFalsy();

      // Solo email no está completo
      await loginPage.fillEmail('test@email.com');
      expect(await loginPage.isFormComplete()).toBeFalsy();

      // Email y password están completos
      await loginPage.fillPassword('testpassword');
      expect(await loginPage.isFormComplete()).toBeTruthy();

      // Limpiar email, ya no está completo
      await loginPage.clearEmail();
      expect(await loginPage.isFormComplete()).toBeFalsy();
    });
  });

  test.describe.skip('Manejo de errores', () => {
    test('Obtener mensaje de error específico', async () => {
      const invalidEmail = 'invalid@email.com';
      const invalidPassword = 'wrongpassword';

      await loginPage.performLogin(invalidEmail, invalidPassword, false);

      // Esperar a que aparezca el error
      await loginPage.page.waitForTimeout(2000);

      const hasErrors = await loginPage.hasErrorMessages();
      if (hasErrors) {
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toBeTruthy();
        expect(typeof errorMessage).toBe('string');
        expect(errorMessage.length).toBeGreaterThan(0);
      }
    });
  });

  test.describe.skip('Navegación', () => {
    test('Verificar navegación inicial a página de login', async () => {
      const currentUrl = loginPage.page.url();
      expect(currentUrl).toContain('/login');
    });

    test('Verificar que la página se carga correctamente', async () => {
      // Verificar que la página está completamente cargada
      await loginPage.page.waitForLoadState('domcontentloaded');

      // Verificar que al menos el formulario está presente
      const allVisible = await loginPage.areAllElementsVisible();
      expect(allVisible).toBeTruthy();
    });
  });
});
