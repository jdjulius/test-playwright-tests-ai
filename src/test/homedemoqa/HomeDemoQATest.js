import { HomeDemoQAPage } from '../../pages/homedemoqa/HomeDemoQAPage.js';

/**
 * Clase de pruebas para la página Home de DemoQA
 * Contiene todos los escenarios de prueba sin decoradores @Test
 */
export class HomeDemoQATest {
  constructor(page) {
    this.homeDemoQAPage = new HomeDemoQAPage(page);
  }

  /**
   * Validar que el botón elementos redireccione a página de elementos
   */
  async validarBotonElementos() {
    await this.homeDemoQAPage.navigateToHome();
    await this.homeDemoQAPage.initButtonElementos();

    const isVisible = await this.homeDemoQAPage.isButtonElementosVisible();
    if (!isVisible) {
      throw new Error('El botón Elementos no está visible');
    }

    await this.homeDemoQAPage.clickElementos();
    const navigationSuccessful = await this.homeDemoQAPage.validateElementsNavigation();

    if (!navigationSuccessful) {
      throw new Error('La navegación a la página de elementos no fue exitosa');
    }

    return navigationSuccessful;
  }

  /**
   * Validar que el botón formularios redireccione a página de formularios
   */
  async validarBotonFormularios() {
    await this.homeDemoQAPage.navigateToHome();
    await this.homeDemoQAPage.initButtonFormularios();

    const isVisible = await this.homeDemoQAPage.isButtonFormulariosVisible();
    if (!isVisible) {
      throw new Error('El botón Formularios no está visible');
    }

    await this.homeDemoQAPage.clickFormularios();
    const navigationSuccessful = await this.homeDemoQAPage.validateFormsNavigation();

    if (!navigationSuccessful) {
      throw new Error('La navegación a la página de formularios no fue exitosa');
    }

    return navigationSuccessful;
  }

  /**
   * Validar que el botón alertas redireccione a página de alertas
   */
  async validarBotonAlertas() {
    await this.homeDemoQAPage.navigateToHome();
    await this.homeDemoQAPage.initButtonAlertas();

    const isVisible = await this.homeDemoQAPage.isButtonAlertasVisible();
    if (!isVisible) {
      throw new Error('El botón Alertas no está visible');
    }

    await this.homeDemoQAPage.clickAlertas();
    const navigationSuccessful = await this.homeDemoQAPage.validateAlertsNavigation();

    if (!navigationSuccessful) {
      throw new Error('La navegación a la página de alertas no fue exitosa');
    }

    return navigationSuccessful;
  }

  /**
   * Validar que el label widget redireccione a página de widget
   */
  async validarLabelWidget() {
    await this.homeDemoQAPage.navigateToHome();
    await this.homeDemoQAPage.initLabelWidget();

    const isVisible = await this.homeDemoQAPage.isLabelWidgetVisible();
    if (!isVisible) {
      throw new Error('El label Widget no está visible');
    }

    await this.homeDemoQAPage.clickWidget();
    const navigationSuccessful = await this.homeDemoQAPage.validateWidgetNavigation();

    if (!navigationSuccessful) {
      throw new Error('La navegación a la página de widget no fue exitosa');
    }

    return navigationSuccessful;
  }

  /**
   * Validar que el botón interacción redireccione a página de interacción
   */
  async validarBotonInteraccion() {
    await this.homeDemoQAPage.navigateToHome();
    await this.homeDemoQAPage.initButtonInteraccion();

    const isVisible = await this.homeDemoQAPage.isButtonInteraccionVisible();
    if (!isVisible) {
      throw new Error('El botón Interacción no está visible');
    }

    await this.homeDemoQAPage.clickInteraccion();
    const navigationSuccessful = await this.homeDemoQAPage.validateInteractionNavigation();

    if (!navigationSuccessful) {
      throw new Error('La navegación a la página de interacción no fue exitosa');
    }

    return navigationSuccessful;
  }

  /**
   * Validar que el botón biblioteca redireccione a página de biblioteca
   */
  async validarBotonBiblioteca() {
    await this.homeDemoQAPage.navigateToHome();
    await this.homeDemoQAPage.initButtonBiblioteca();

    const isVisible = await this.homeDemoQAPage.isButtonBibliotecaVisible();
    if (!isVisible) {
      throw new Error('El botón Biblioteca no está visible');
    }

    await this.homeDemoQAPage.clickBiblioteca();
    const navigationSuccessful = await this.homeDemoQAPage.validateBookStoreNavigation();

    if (!navigationSuccessful) {
      throw new Error('La navegación a la página de biblioteca no fue exitosa');
    }

    return navigationSuccessful;
  }

  /**
   * Validar que todas las cards están visibles en la página
   */
  async validarTodasLasCardsVisibles() {
    await this.homeDemoQAPage.navigateToHome();

    const allCardsVisible = await this.homeDemoQAPage.areAllCardsVisible();

    if (!allCardsVisible) {
      throw new Error('No todas las cards están visibles en la página');
    }

    return allCardsVisible;
  }

  /**
   * Validar los títulos de todas las cards
   */
  async validarTitulosCards() {
    await this.homeDemoQAPage.navigateToHome();

    const expectedTitles = {
      Elementos: 'Elements',
      Formularios: 'Forms',
      Alertas: 'Alerts, Frame & Windows',
      Widget: 'Widgets',
      Interaccion: 'Interactions',
      Biblioteca: 'Book Store Application',
    };

    for (const [cardName, expectedTitle] of Object.entries(expectedTitles)) {
      const actualTitle = await this.homeDemoQAPage.getCardTitle(cardName);
      if (actualTitle !== expectedTitle) {
        throw new Error(
          `El título de la card ${cardName} no coincide. Esperado: ${expectedTitle}, Actual: ${actualTitle}`,
        );
      }
    }

    return true;
  }

  /**
   * Validar navegación completa de todos los elementos
   */
  async validarNavegacionCompleta() {
    // Validar navegación a Elementos
    await this.validarBotonElementos();

    // Validar navegación a Formularios
    await this.validarBotonFormularios();

    // Validar navegación a Alertas
    await this.validarBotonAlertas();

    // Validar navegación a Widget
    await this.validarLabelWidget();

    // Validar navegación a Interacción
    await this.validarBotonInteraccion();

    // Validar navegación a Biblioteca
    await this.validarBotonBiblioteca();

    return true;
  }
}
