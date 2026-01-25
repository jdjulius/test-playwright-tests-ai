/**
 * Clase base para todas las páginas
 * Contiene métodos comunes que pueden ser utilizados por todas las páginas
 */
export class BasePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navegar a una URL
   * @param {string} url - URL a la que navegar
   */
  async goto(url) {
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Esperar a que un elemento sea visible
   * @param {string} selector - Selector del elemento
   * @param {number} timeout - Timeout en milisegundos
   */
  async waitForElement(selector, timeout = 30000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Tomar captura de pantalla
   * @param {string} filename - Nombre del archivo
   */
  async takeScreenshot(filename) {
    await this.page.screenshot({
      path: `test-results/screenshots/${filename}`,
      fullPage: true,
    });
  }

  /**
   * Esperar a que la página cargue completamente
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Obtener el título de la página
   */
  async getPageTitle() {
    return await this.page.title();
  }

  /**
   * Verificar si un elemento está visible
   * @param {string} selector - Selector del elemento
   */
  async isElementVisible(selector) {
    try {
      return await this.page.locator(selector).isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Hacer clic en un elemento con espera
   * @param {string} selector - Selector del elemento
   */
  async clickElement(selector) {
    await this.page.locator(selector).waitFor({ state: 'visible' });
    await this.page.locator(selector).click();
  }

  /**
   * Llenar un campo de texto
   * @param {string} selector - Selector del campo
   * @param {string} text - Texto a llenar
   */
  async fillField(selector, text) {
    await this.page.locator(selector).waitFor({ state: 'visible' });
    await this.page.locator(selector).fill(text);
  }

  /**
   * Obtener el texto de un elemento
   * @param {string} selector - Selector del elemento
   */
  async getElementText(selector) {
    await this.page.locator(selector).waitFor({ state: 'visible' });
    return await this.page.locator(selector).textContent();
  }
}
