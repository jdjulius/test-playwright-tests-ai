import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Página objeto para el componente Navbar - Módulo de Compras
 * Contiene todos los elementos y métodos para interactuar con la navegación de compras
 */
export class NavbarPage {
  constructor(page) {
    this.page = page;
    const selectorsPath = join(__dirname, '../../selectors/navbarSelector/NavbarSelector.json');
    const selectorsData = JSON.parse(readFileSync(selectorsPath, 'utf-8'));
    this.selectors = this.parseSelectors(selectorsData.locator);

    // Inicialización de elementos
    this.comprasNavBar = null;
    this.ordenesCompraSubmodule = null;
    this.comprasSubmodule = null;
    this.procesarOrdenesSubmodule = null;
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

  // Métodos de inicialización
  async initComprasNavBar() {
    this.comprasNavBar = this.page.locator(this.selectors.comprasNavBar);
  }

  async initOrdenesCompraSubmodule() {
    this.ordenesCompraSubmodule = this.page.locator(this.selectors.OrdenesCompraSubmodule);
  }

  async initComprasSubmodule() {
    this.comprasSubmodule = this.page.locator(this.selectors.comprasSubmodule);
  }

  async initProcesarOrdenesSubmodule() {
    this.procesarOrdenesSubmodule = this.page.locator(this.selectors.procesarOrdenesSubmodule);
  }

  async initAllElements() {
    await this.initComprasNavBar();
    await this.initOrdenesCompraSubmodule();
    await this.initComprasSubmodule();
    await this.initProcesarOrdenesSubmodule();
  }

  // Métodos de interacción
  async clickComprasNavBar() {
    await this.comprasNavBar.click();
  }

  async clickOrdenesCompraSubmodule() {
    await this.ordenesCompraSubmodule.click();
  }

  async clickComprasSubmodule() {
    await this.comprasSubmodule.click();
  }

  async clickProcesarOrdenesSubmodule() {
    await this.procesarOrdenesSubmodule.click();
  }

  // Métodos de validación
  async isComprasNavBarVisible() {
    return await this.comprasNavBar.isVisible();
  }

  async isOrdenesCompraSubmoduleVisible() {
    return await this.ordenesCompraSubmodule.isVisible();
  }

  async isComprasSubmoduleVisible() {
    return await this.comprasSubmodule.isVisible();
  }

  async isProcesarOrdenesSubmoduleVisible() {
    return await this.procesarOrdenesSubmodule.isVisible();
  }

  async areAllElementsVisible() {
    const comprasNavVisible = await this.isComprasNavBarVisible();
    const ordenesVisible = await this.isOrdenesCompraSubmoduleVisible();
    const comprasVisible = await this.isComprasSubmoduleVisible();
    const procesarVisible = await this.isProcesarOrdenesSubmoduleVisible();
    return comprasNavVisible && ordenesVisible && comprasVisible && procesarVisible;
  }

  async areSubmenuElementsVisible() {
    const ordenesVisible = await this.isOrdenesCompraSubmoduleVisible();
    const comprasVisible = await this.isComprasSubmoduleVisible();
    const procesarVisible = await this.isProcesarOrdenesSubmoduleVisible();
    return ordenesVisible && comprasVisible && procesarVisible;
  }

  // Métodos específicos del navbar de compras
  async expandComprasMenu() {
    if (!(await this.areSubmenuElementsVisible())) {
      await this.clickComprasNavBar();
      await this.page.waitForTimeout(500); // Esperar que se expanda el menú
    }
  }

  async navigateToOrdenesCompra() {
    await this.expandComprasMenu();
    await this.clickOrdenesCompraSubmodule();
  }

  async navigateToCompras() {
    await this.expandComprasMenu();
    await this.clickComprasSubmodule();
  }

  async navigateToProcesarOrdenes() {
    await this.expandComprasMenu();
    await this.clickProcesarOrdenesSubmodule();
  }

  async getComprasNavBarText() {
    return await this.comprasNavBar.textContent();
  }

  async getOrdenesCompraSubmoduleText() {
    return await this.ordenesCompraSubmodule.textContent();
  }

  async getComprasSubmoduleText() {
    return await this.comprasSubmodule.textContent();
  }

  async getProcesarOrdenesSubmoduleText() {
    return await this.procesarOrdenesSubmodule.textContent();
  }
}

module.exports = NavbarPage;
