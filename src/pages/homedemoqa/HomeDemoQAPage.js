import { BasePage } from '../BasePage.js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Página objeto para la página Home de DemoQA
 * Contiene todos los elementos y métodos para interactuar con la página principal
 */
export class HomeDemoQAPage extends BasePage {
  constructor(page) {
    super(page);
    this.url = 'https://demoqa.com/';
    const selectorsPath = join(__dirname, '../../selectors/homedemoqa/HomeDemoQAPage.json');
    const selectorsData = JSON.parse(readFileSync(selectorsPath, 'utf-8'));
    this.selectors = this.parseSelectors(selectorsData.locator);

    // Inicialización de elementos
    this.buttonElementos = null;
    this.buttonFormularios = null;
    this.buttonAlertas = null;
    this.labelWidget = null;
    this.buttonInteraccion = null;
    this.buttonBiblioteca = null;
    this.cardElementos = null;
    this.cardFormularios = null;
    this.cardAlertas = null;
    this.cardWidget = null;
    this.cardInteraccion = null;
    this.cardBiblioteca = null;
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
   * Inicializa el botón de Elementos
   */
  async initButtonElementos() {
    this.buttonElementos = this.page.locator(this.selectors.buttonElementos);
  }

  /**
   * Inicializa el botón de Formularios
   */
  async initButtonFormularios() {
    this.buttonFormularios = this.page.locator(this.selectors.buttonFormularios);
  }

  /**
   * Inicializa el botón de Alertas
   */
  async initButtonAlertas() {
    this.buttonAlertas = this.page.locator(this.selectors.buttonAlertas);
  }

  /**
   * Inicializa el label de Widget
   */
  async initLabelWidget() {
    this.labelWidget = this.page.locator(this.selectors.labelWidget);
  }

  /**
   * Inicializa el botón de Interacción
   */
  async initButtonInteraccion() {
    this.buttonInteraccion = this.page.locator(this.selectors.buttonInteraccion);
  }

  /**
   * Inicializa el botón de Biblioteca
   */
  async initButtonBiblioteca() {
    this.buttonBiblioteca = this.page.locator(this.selectors.buttonBiblioteca);
  }

  /**
   * Inicializa la card de Elementos
   */
  async initCardElementos() {
    this.cardElementos = this.page.locator(this.selectors.cardElementos);
  }

  /**
   * Inicializa la card de Formularios
   */
  async initCardFormularios() {
    this.cardFormularios = this.page.locator(this.selectors.cardFormularios);
  }

  /**
   * Inicializa la card de Alertas
   */
  async initCardAlertas() {
    this.cardAlertas = this.page.locator(this.selectors.cardAlertas);
  }

  /**
   * Inicializa la card de Widget
   */
  async initCardWidget() {
    this.cardWidget = this.page.locator(this.selectors.cardWidget);
  }

  /**
   * Inicializa la card de Interacción
   */
  async initCardInteraccion() {
    this.cardInteraccion = this.page.locator(this.selectors.cardInteraccion);
  }

  /**
   * Inicializa la card de Biblioteca
   */
  async initCardBiblioteca() {
    this.cardBiblioteca = this.page.locator(this.selectors.cardBiblioteca);
  }

  // Métodos de acción

  /**
   * Navegar a la página de DemoQA Home
   */
  async navigateToHome() {
    await this.goto(this.url);
  }

  /**
   * Hacer clic en el botón de Elementos
   */
  async clickElementos() {
    await this.buttonElementos.click();
  }

  /**
   * Hacer clic en el botón de Formularios
   */
  async clickFormularios() {
    await this.buttonFormularios.click();
  }

  /**
   * Hacer clic en el botón de Alertas
   */
  async clickAlertas() {
    await this.buttonAlertas.click();
  }

  /**
   * Hacer clic en el label de Widget
   */
  async clickWidget() {
    await this.labelWidget.click();
  }

  /**
   * Hacer clic en el botón de Interacción
   */
  async clickInteraccion() {
    await this.buttonInteraccion.click();
  }

  /**
   * Hacer clic en el botón de Biblioteca
   */
  async clickBiblioteca() {
    await this.buttonBiblioteca.click();
  }

  // Métodos de validación

  /**
   * Verificar si el botón de Elementos está visible
   */
  async isButtonElementosVisible() {
    return await this.buttonElementos.isVisible();
  }

  /**
   * Verificar si el botón de Formularios está visible
   */
  async isButtonFormulariosVisible() {
    return await this.buttonFormularios.isVisible();
  }

  /**
   * Verificar si el botón de Alertas está visible
   */
  async isButtonAlertasVisible() {
    return await this.buttonAlertas.isVisible();
  }

  /**
   * Verificar si el label de Widget está visible
   */
  async isLabelWidgetVisible() {
    return await this.labelWidget.isVisible();
  }

  /**
   * Verificar si el botón de Interacción está visible
   */
  async isButtonInteraccionVisible() {
    return await this.buttonInteraccion.isVisible();
  }

  /**
   * Verificar si el botón de Biblioteca está visible
   */
  async isButtonBibliotecaVisible() {
    return await this.buttonBiblioteca.isVisible();
  }

  /**
   * Verificar si todas las cards están visibles
   */
  async areAllCardsVisible() {
    await this.initCardElementos();
    await this.initCardFormularios();
    await this.initCardAlertas();
    await this.initCardWidget();
    await this.initCardInteraccion();
    await this.initCardBiblioteca();

    return (
      (await this.cardElementos.isVisible()) &&
      (await this.cardFormularios.isVisible()) &&
      (await this.cardAlertas.isVisible()) &&
      (await this.cardWidget.isVisible()) &&
      (await this.cardInteraccion.isVisible()) &&
      (await this.cardBiblioteca.isVisible())
    );
  }

  /**
   * Verificar redirección después de hacer clic en Elementos
   */
  async validateElementsNavigation() {
    const expectedUrl = 'https://demoqa.com/elements';
    await this.page.waitForURL(expectedUrl, { timeout: 10000 });
    const currentUrl = this.page.url();
    return currentUrl.includes('elements');
  }

  /**
   * Verificar redirección después de hacer clic en Formularios
   */
  async validateFormsNavigation() {
    const expectedUrl = 'https://demoqa.com/forms';
    await this.page.waitForURL(expectedUrl, { timeout: 10000 });
    const currentUrl = this.page.url();
    return currentUrl.includes('forms');
  }

  /**
   * Verificar redirección después de hacer clic en Alertas
   */
  async validateAlertsNavigation() {
    const expectedUrl = 'https://demoqa.com/alertsWindows';
    await this.page.waitForURL(expectedUrl, { timeout: 10000 });
    const currentUrl = this.page.url();
    return currentUrl.includes('alertsWindows');
  }

  /**
   * Verificar redirección después de hacer clic en Widget
   */
  async validateWidgetNavigation() {
    const expectedUrl = 'https://demoqa.com/widgets';
    await this.page.waitForURL(expectedUrl, { timeout: 10000 });
    const currentUrl = this.page.url();
    return currentUrl.includes('widgets');
  }

  /**
   * Verificar redirección después de hacer clic en Interacción
   */
  async validateInteractionNavigation() {
    const expectedUrl = 'https://demoqa.com/interaction';
    await this.page.waitForURL(expectedUrl, { timeout: 10000 });
    const currentUrl = this.page.url();
    return currentUrl.includes('interaction');
  }

  /**
   * Verificar redirección después de hacer clic en Biblioteca
   */
  async validateBookStoreNavigation() {
    const expectedUrl = 'https://demoqa.com/books';
    await this.page.waitForURL(expectedUrl, { timeout: 10000 });
    const currentUrl = this.page.url();
    return currentUrl.includes('books');
  }

  /**
   * Obtener el texto del título de una card específica
   * @param {string} cardName - Nombre de la card
   */
  async getCardTitle(cardName) {
    const cardSelector = this.selectors[`card${cardName}`];
    if (cardSelector) {
      const titleSelector = `${cardSelector} h5`;
      return await this.page.locator(titleSelector).textContent();
    }
    throw new Error(`Card ${cardName} no encontrada`);
  }
}
