import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Página objeto para la página de Login de Paisa Bombas
 * Contiene todos los elementos y métodos para interactuar con el formulario de login
 */
export class LoginPage {
  constructor(page) {
    this.page = page;
    this.url = 'https://dev.paisabombas.app/login';
    const selectorsPath = join(__dirname, '../../selectors/loginSelector/LoginSelector.json');
    const selectorsData = JSON.parse(readFileSync(selectorsPath, 'utf-8'));
    this.selectors = this.parseSelectors(selectorsData.locator);

    // Inicialización de elementos
    this.inputEmail = null;
    this.inputPassword = null;
    this.buttonIniciarSesion = null;
    this.linkOlvidarPassword = null;
    this.modalErrorMessage = null;
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

  async initInputEmail() {
    this.inputEmail = this.page.locator(this.selectors.inputEmail);
  }

  async initInputPassword() {
    this.inputPassword = this.page.locator(this.selectors.inputPassword);
  }

  async initButtonIniciarSesion() {
    this.buttonIniciarSesion = this.page.locator(this.selectors.buttonIniciarSesion);
  }

  async initLinkOlvidarPassword() {
    this.linkOlvidarPassword = this.page.locator(this.selectors.linkOlvidarPassword);
  }

  async initModalErrorMessage() {
    this.modalErrorMessage = this.page.locator(this.selectors.modalErrorMessage);
  }

  /**
   * Navegar a la página de login
   */
  async navigateToLogin() {
    await this.goto(this.url, { waitUntil: 'networkidle', timeout: 30000 });
    // Esperar a que los elementos clave estén cargados
    await this.page.waitForSelector('input[type="email"]', { timeout: 10000 });
  }

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
   * Realizar login con validación de URL esperada
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña del usuario
   * @param {string} expectedUrl - URL esperada después del login
   */
  async performLoginWithValidation(email, password, expectedUrl) {
    await this.performLogin(email, password);
    await this.page.waitForURL(expectedUrl, { timeout: 10000 });
  }

  /**
   * Realizar login completo navegando y validando
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña del usuario
   */
  async performFullLogin(email, password) {
    await this.performLogin(email, password);
  }

  /**
   * Inicializar todos los elementos
   */
  async initAllElements() {
    await this.initInputEmail();
    await this.initInputPassword();
    await this.initButtonIniciarSesion();
    await this.initLinkOlvidarPassword();
    await this.initModalErrorMessage();
  }

  // Métodos de interacción
  async fillEmail(email) {
    await this.inputEmail.fill(email);
  }

  async fillPassword(password) {
    await this.inputPassword.fill(password);
  }

  async clickIniciarSesion() {
    await this.buttonIniciarSesion.click();
  }

  async clickOlvidarPassword() {
    await this.linkOlvidarPassword.click();
  }

  // Métodos de validación
  async isInputEmailVisible() {
    return await this.inputEmail.isVisible();
  }

  async isInputPasswordVisible() {
    return await this.inputPassword.isVisible();
  }

  async isButtonIniciarSesionVisible() {
    return await this.buttonIniciarSesion.isVisible();
  }

  async isButtonIniciarSesionEnabled() {
    return await this.buttonIniciarSesion.isEnabled();
  }

  async isLinkOlvidarPasswordVisible() {
    return await this.linkOlvidarPassword.isVisible();
  }

  async areAllElementsVisible() {
    const emailVisible = await this.isInputEmailVisible();
    const passwordVisible = await this.isInputPasswordVisible();
    const buttonVisible = await this.isButtonIniciarSesionVisible();
    const linkVisible = await this.isLinkOlvidarPasswordVisible();
    return emailVisible && passwordVisible && buttonVisible && linkVisible;
  }

  // Métodos para obtener valores
  async getEmailValue() {
    return await this.inputEmail.inputValue();
  }

  async getPasswordValue() {
    return await this.inputPassword.inputValue();
  }

  // Métodos para limpiar formulario
  async clearEmail() {
    await this.inputEmail.clear();
  }

  async clearPassword() {
    await this.inputPassword.clear();
  }

  async clearForm() {
    await this.clearEmail();
    await this.clearPassword();
  }

  async isFormComplete() {
    const emailValue = await this.getEmailValue();
    const passwordValue = await this.getPasswordValue();
    return emailValue.trim() !== '' && passwordValue.trim() !== '';
  }

  // Métodos para manejo de errores
  async hasErrorMessages() {
    try {
      await this.modalErrorMessage.waitFor({ timeout: 5000 });
      return await this.modalErrorMessage.isVisible();
    } catch {
      return false;
    }
  }

  async getErrorMessage() {
    if (await this.hasErrorMessages()) {
      return await this.modalErrorMessage.textContent();
    }
    return null;
  }

  async goto(url, options = {}) {
    await this.page.goto(url, options);
  }
}
