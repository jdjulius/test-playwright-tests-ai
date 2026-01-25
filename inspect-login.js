import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    console.log('Navegando a la página...');
    await page.goto('https://dev.paisabombas.app/login', {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    console.log('Esperando a que la página se cargue completamente...');
    await page.waitForTimeout(5000);

    console.log('Obteniendo todo el HTML de la página...');
    const fullHTML = await page.content();
    console.log('HTML Length:', fullHTML.length);

    // Buscar elementos por diferentes métodos
    console.log('\n=== BUSCANDO ELEMENTOS ===');

    // Método 1: Buscar inputs
    try {
      const inputCount = await page.locator('input').count();
      console.log(`Encontrados ${inputCount} inputs`);

      for (let i = 0; i < inputCount; i++) {
        const input = page.locator('input').nth(i);
        const type = await input.getAttribute('type');
        const name = await input.getAttribute('name');
        const id = await input.getAttribute('id');
        const className = await input.getAttribute('class');
        const placeholder = await input.getAttribute('placeholder');

        console.log(`Input ${i + 1}:`, {
          type: type || 'no-type',
          name: name || 'no-name',
          id: id || 'no-id',
          class: className || 'no-class',
          placeholder: placeholder || 'no-placeholder',
        });
      }
    } catch (e) {
      console.log('Error buscando inputs:', e.message);
    }

    // Método 2: Buscar botones
    try {
      const buttonCount = await page.locator('button').count();
      console.log(`Encontrados ${buttonCount} botones`);

      for (let i = 0; i < buttonCount; i++) {
        const button = page.locator('button').nth(i);
        const text = await button.textContent();
        const className = await button.getAttribute('class');
        const id = await button.getAttribute('id');
        const type = await button.getAttribute('type');

        console.log(`Button ${i + 1}:`, {
          text: text?.trim() || 'no-text',
          type: type || 'no-type',
          id: id || 'no-id',
          class: className || 'no-class',
        });
      }
    } catch (e) {
      console.log('Error buscando botones:', e.message);
    }

    // Método 3: Buscar enlaces
    try {
      const linkCount = await page.locator('a').count();
      console.log(`Encontrados ${linkCount} enlaces`);

      for (let i = 0; i < Math.min(linkCount, 10); i++) {
        const link = page.locator('a').nth(i);
        const text = await link.textContent();
        const href = await link.getAttribute('href');
        const className = await link.getAttribute('class');

        console.log(`Link ${i + 1}:`, {
          text: text?.trim() || 'no-text',
          href: href || 'no-href',
          class: className || 'no-class',
        });
      }
    } catch (e) {
      console.log('Error buscando enlaces:', e.message);
    }

    // Buscar específicamente por palabras clave
    console.log('\n=== BUSCANDO POR PALABRAS CLAVE ===');

    try {
      const emailInput = await page
        .locator(
          'input[type="email"], input[name*="email"], input[placeholder*="email"], input[id*="email"]',
        )
        .count();
      console.log(`Inputs de email encontrados: ${emailInput}`);

      const passwordInput = await page.locator('input[type="password"]').count();
      console.log(`Inputs de password encontrados: ${passwordInput}`);

      const loginButtons = await page
        .locator('button:has-text("Iniciar"), button:has-text("Login"), button:has-text("Entrar")')
        .count();
      console.log(`Botones de login encontrados: ${loginButtons}`);

      const forgotLinks = await page
        .locator('a:has-text("Olvid"), a:has-text("Forgot"), a:has-text("contraseña")')
        .count();
      console.log(`Enlaces de olvidar contraseña: ${forgotLinks}`);
    } catch (e) {
      console.log('Error en búsqueda por palabras clave:', e.message);
    }

    console.log('\n=== ESPERANDO 10 SEGUNDOS PARA INSPECCIÓN MANUAL ===');
    await page.waitForTimeout(10000);
  } catch (error) {
    console.error('Error general:', error.message);
  } finally {
    await browser.close();
    console.log('Inspección completada.');
  }
})();
