import { BasePage } from '../BasePage.js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Página objeto para la página de Login de Paisa Bombas
 * Contiene todos los elementos y métodos para interactuar con el formulario de login
 */
export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.url = 'https://dev.paisabombas.app/login';
    const selectorsPath = join(__dirname, '../../selectors/loginSelector/LoginSelector.json');
    const selectorsData = JSON.parse(readFileSync(selectorsPath, 'utf-8'));
    this.selectors = this.parseSelectors(selectorsData.locator);

    // Inicialización de elementos
    this.inputEmail = null;
    this.inputPassword = null;
    this.buttonIniciarSesion = null;
    this.linkOlvidarPassword = null;
  }

  /**
   * Convierte los selectores JSON a un objeto más fácil de usar
   * @param {Array} locators - Array de locators del JSON
   * @returns {Object} Objeto con los selectores organizados por nombre
   */
  parseSelectors(locators) {
    const selectors = {};
    locators.forEach((locator) => {
      selectors[locator.name] = locator.locator;
    });
    return selectors;
  }

  // Métodos de inicialización por componente - Usar cuando solo necesites inicializar componentes específicos

  /**
   * Inicializa el campo de email
   */
  async initInputEmail() {
    this.inputEmail = this.page.locator(this.selectors.inputEmail);
  }

  /**
   * Inicializa el campo de contraseña
   */
  async initInputPassword() {
    this.inputPassword = this.page.locator(this.selectors.inputPassword);
  }

  /**
   * Inicializa el botón de iniciar sesión
   */
  async initButtonIniciarSesion() {
    this.buttonIniciarSesion = this.page.locator(this.selectors.buttonIniciarSesion);
  }

  /**
   * Inicializa el enlace de olvidar contraseña
   */
  async initLinkOlvidarPassword() {
    this.linkOlvidarPassword = this.page.locator(this.selectors.linkOlvidarPassword);
  }

  /**
   * Inicializa todos los elementos de la página
   */
  async initAllElements() {
    await this.initInputEmail();
    await this.initInputPassword();
    await this.initButtonIniciarSesion();
    await this.initLinkOlvidarPassword();
  }

  // Métodos de navegación

  /**
   * Navegar a la página de login
   */
  async navigateToLogin() {
    await this.goto(this.url, { waitUntil: 'networkidle', timeout: 30000 });
    // Esperar a que los elementos clave estén cargados
    await this.page.waitForSelector('input[type="email"]', { timeout: 10000 });
  }

  // Métodos de acción

  /**
   * Llenar el campo de email
   * @param {string} email - Email a introducir
   */
  async fillEmail(email) {
    await this.inputEmail.fill(email);
  }

  /**
   * Llenar el campo de contraseña
   * @param {string} password - Contraseña a introducir
   */
  async fillPassword(password) {
    await this.inputPassword.fill(password);
  }

  /**
   * Hacer clic en el botón de iniciar sesión
   */
  async clickIniciarSesion() {
    await this.buttonIniciarSesion.click();
  }

  /**
   * Hacer clic en el enlace de olvidar contraseña
   */
  async clickOlvidarPassword() {
    await this.linkOlvidarPassword.click();
  }

  /**
   * Limpiar el campo de email
   */
  async clearEmail() {
    await this.inputEmail.clear();
  }

  /**
   * Limpiar el campo de contraseña
   */
  async clearPassword() {
    await this.inputPassword.clear();
  }

  /**
   * Limpiar ambos campos del formulario
   */
  async clearForm() {
    await this.clearEmail();
    await this.clearPassword();
  }

  // Métodos de login completo

  /**
   * Realizar login completo con credenciales
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña del usuario
   * @param {boolean} waitForNavigation - Si esperar navegación después del login (default: true)
   */
  async performLogin(email, password, waitForNavigation = true) {
    await this.initAllElements();
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickIniciarSesion();

    if (waitForNavigation) {
      // Esperar a que la página cambie después del login exitoso
      await this.page.waitForLoadState('networkidle');
    }
  }

  /**
   * Realizar login completo navegando primero a la página
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña del usuario
   * @param {boolean} waitForNavigation - Si esperar navegación después del login (default: true)
   */
  async performFullLogin(email, password, waitForNavigation = true) {
    await this.navigateToLogin();
    await this.performLogin(email, password, waitForNavigation);
  }

  /**
   * Realizar login con validación de éxito
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña del usuario
   * @param {string} expectedUrl - URL esperada después del login exitoso
   */
  async performLoginWithValidation(email, password, expectedUrl) {
    await this.performLogin(email, password, false);
    return await this.validateSuccessfulLogin(expectedUrl);
  }

  // Métodos de validación

  /**
   * Verificar si el campo de email está visible
   */
  async isInputEmailVisible() {
    return await this.inputEmail.isVisible();
  }

  /**
   * Verificar si el campo de contraseña está visible
   */
  async isInputPasswordVisible() {
    return await this.inputPassword.isVisible();
  }

  /**
   * Verificar si el botón de iniciar sesión está visible
   */
  async isButtonIniciarSesionVisible() {
    return await this.buttonIniciarSesion.isVisible();
  }

  /**
   * Verificar si el enlace de olvidar contraseña está visible
   */
  async isLinkOlvidarPasswordVisible() {
    return await this.linkOlvidarPassword.isVisible();
  }

  /**
   * Verificar si todos los elementos del formulario están visibles
   */
  async areAllElementsVisible() {
    await this.initAllElements();
    return (
      (await this.isInputEmailVisible()) &&
      (await this.isInputPasswordVisible()) &&
      (await this.isButtonIniciarSesionVisible()) &&
      (await this.isLinkOlvidarPasswordVisible())
    );
  }

  /**
   * Verificar si el botón de iniciar sesión está habilitado
   */
  async isButtonIniciarSesionEnabled() {
    return await this.buttonIniciarSesion.isEnabled();
  }

  /**
   * Verificar si el formulario está completo (ambos campos tienen valor)
   */
  async isFormComplete() {
    const emailValue = await this.inputEmail.inputValue();
    const passwordValue = await this.inputPassword.inputValue();
    return emailValue.trim() !== '' && passwordValue.trim() !== '';
  }

  /**
   * Validar login exitoso verificando redirección
   * @param {string} expectedUrl - URL esperada después del login exitoso
   */
  async validateSuccessfulLogin(expectedUrl) {
    try {
      await this.page.waitForURL(expectedUrl, { timeout: 10000 });
      const currentUrl = this.page.url();
      return currentUrl.includes(expectedUrl.replace('https://', '').replace('http://', ''));
    } catch (error) {
      return false;
    }
  }

  /**
   * Verificar si hay mensajes de error en el formulario
   */
  async hasErrorMessages() {
    // Buscar elementos comunes de error
    const errorSelectors = [
      '.error',
      '.alert-danger',
      '.text-danger',
      '[data-testid="error"]',
      '.form-error',
    ];

    for (const selector of errorSelectors) {
      const errorElement = this.page.locator(selector);
      if (await errorElement.isVisible()) {
        return true;
      }
    }
    return false;
  }

  /**
   * Obtener texto de mensaje de error si existe
   */
  async getErrorMessage() {
    const errorSelectors = [
      '.error',
      '.alert-danger',
      '.text-danger',
      '[data-testid="error"]',
      '.form-error',
    ];

    for (const selector of errorSelectors) {
      const errorElement = this.page.locator(selector);
      if (await errorElement.isVisible()) {
        return await errorElement.textContent();
      }
    }
    return null;
  }

  /**
   * Obtener el valor actual del campo email
   */
  async getEmailValue() {
    return await this.inputEmail.inputValue();
  }

  /**
   * Obtener el valor actual del campo contraseña
   */
  async getPasswordValue() {
    return await this.inputPassword.inputValue();
  }
}
