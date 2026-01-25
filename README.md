# 🎭 Test Playwright Tests AI

Proyecto de automatización de pruebas web utilizando **Playwright** con integración de **tests-ai** para la generación de tests con inteligencia artificial.

## 📋 Índice

- [¿Qué es Playwright?](#-qué-es-playwright)
- [¿Qué es tests-ai?](#-qué-es-tests-ai)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Instalación](#-instalación)
- [Configuración](#️-configuración)
- [Estructura de Archivos](#-estructura-de-archivos)
- [Uso del Proyecto](#-uso-del-proyecto)
- [Patrones de Diseño](#-patrones-de-diseño)
- [Scripts Disponibles](#-scripts-disponibles)
- [Ejemplos de Uso](#-ejemplos-de-uso)
- [Reportes y Resultados](#-reportes-y-resultados)
- [Contribuir](#-contribuir)

## 🎭 ¿Qué es Playwright?

**Playwright** es una biblioteca de automatización de navegadores web de código abierto desarrollada por Microsoft. Permite:

### 🌟 Características Principales

- **Multi-navegador**: Soporta Chromium, Firefox, Safari y Edge
- **Multi-plataforma**: Funciona en Windows, macOS y Linux
- **Multi-lenguaje**: JavaScript, TypeScript, Python, Java y .NET
- **Velocidad**: Ejecuta pruebas de forma rápida y confiable
- **Robustez**: Auto-wait inteligente para elementos
- **Debugging**: Herramientas avanzadas de depuración

### 🔧 Capacidades

```javascript
// Navegación automática
await page.goto('https://example.com');

// Interacción con elementos
await page.click('button');
await page.fill('input', 'texto');

// Aserciones automáticas
await expect(page.locator('h1')).toBeVisible();

// Capturas y videos
await page.screenshot({ path: 'captura.png' });
```

## 🤖 ¿Qué es tests-ai?

**tests-ai** es una extensión que permite escribir pruebas usando **lenguaje natural** en lugar de selectores específicos. Utiliza IA para interpretar instrucciones en español/inglés y ejecutar acciones en la página web.

### 🧠 Funcionamiento

```javascript
// Método tradicional
await page.locator('#username').fill('usuario');
await page.locator('#password').fill('contraseña');
await page.locator('button[type="submit"]').click();

// Con tests-ai
await ai("Escribe 'usuario' en el campo de nombre de usuario", { page, test });
await ai("Escribe 'contraseña' en el campo de contraseña", { page, test });
await ai("Haz clic en el botón de iniciar sesión", { page, test });
```

## 🏗 Arquitectura del Proyecto

```
test-playwright-tests-ai/
├── 📁 src/                    # Código fuente de automatización
│   ├── 📁 data/               # Datos de prueba en JSON
│   ├── 📁 docs/               # Documentación específica
│   ├── 📁 pages/              # Page Object Model
│   ├── 📁 selectors/          # Selectores en JSON
│   └── 📁 test/               # Clases de prueba
├── 📁 test/                   # Tests de Playwright
│   └── 📁 homedemoqa/         # Tests específicos de DemoQA
├── 📁 prompts/                # Prompts para AI
├── 📁 playwright-report/      # Reportes HTML
├── 📁 test-results/           # Resultados y capturas
├── 📄 playwright.config.js    # Configuración de Playwright
├── 📄 package.json           # Dependencias y scripts
└── 📄 README.md              # Este archivo
```

## 🚀 Instalación

### 1️⃣ Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd test-playwright-tests-ai
```

### 2️⃣ Instalar Dependencias

```bash
# Instalar dependencias del proyecto
npm install

# Instalar navegadores de Playwright
npx playwright install

# O instalar solo Chromium (más rápido)
npx playwright install chromium
```

### 3️⃣ Verificar Instalación

```bash
# Verificar que Playwright está instalado
npx playwright --version

# Ejecutar test de ejemplo
npm test
```

## ⚙️ Configuración

### Variables de Entorno

Si usas tests-ai, necesitas configurar tu API key:

```bash
# Crear archivo .env
touch .env

# Agregar tu clave API
echo "ANTHROPIC_API_KEY=sk-ant-tu-clave-aqui" >> .env
```

### Configuración de Playwright

El archivo [`playwright.config.js`](playwright.config.js) contiene:

```javascript
module.exports = defineConfig({
  testDir: './test',           // Directorio de tests
  timeout: 180000,             // 3 minutos por test
  fullyParallel: true,         // Ejecutar en paralelo
  headless: false,             // Mostrar navegador
  screenshot: 'on',            // Capturas siempre
  video: 'on',                 // Videos siempre
  trace: 'on',                 // Trazas siempre
  
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } }
  ]
});
```

## 📁 Estructura de Archivos

### Page Object Model (POM)

```javascript
// src/pages/homedemoqa/HomeDemoQAPage.js
export class HomeDemoQAPage extends BasePage {
  constructor(page) {
    super(page);
    this.url = 'https://demoqa.com/';
    // Cargar selectores desde JSON
    this.selectors = this.parseSelectors(selectorsData.locator);
  }

  async navegarAElementos() {
    await this.buttonElementos.click();
  }

  async validarCargaPrincipal() {
    return await this.labelElementos.isVisible();
  }
}
```

### Selectores en JSON

```json
// src/selectors/homedemoqa/HomeDemoQAPage.json
{
  "locator": {
    "buttonElementos": {
      "name": "buttonElementos",
      "type": "button",
      "locatorType": "xpath",
      "locator": "//h5[normalize-space(text())=\"Elements\"]"
    }
  }
}
```

### Tests Estructurados

```javascript
// test/homedemoqa/demoqa-home.spec.js
const { test, expect } = require('@playwright/test');

test.describe('DemoQA Home Page Tests', () => {
  test('Validar página principal carga correctamente', async ({ page }) => {
    await page.goto('https://demoqa.com/');
    await expect(page).toHaveTitle(/DEMOQA/);
    await expect(page.locator('//h5[normalize-space(text())="Elements"]')).toBeVisible();
  });
});
```

## 🎯 Uso del Proyecto

### 1. Ejecutar Todos los Tests

```bash
# Ejecutar todos los tests
npm test

# Con navegador visible
npm run test:headed

# Modo interactivo
npm run test:ui
```

### 2. Ejecutar Tests Específicos

```bash
# Solo tests de DemoQA
npx playwright test test/homedemoqa/

# Un archivo específico
npx playwright test test/homedemoqa/demoqa-home.spec.js

# Un test específico
npx playwright test -g "Validar página principal"
```

### 3. Debugging

```bash
# Modo debug
npx playwright test --debug

# Con Playwright Inspector
npx playwright test --debug --project=chromium
```

## 🎨 Patrones de Diseño

### Page Object Model (POM)

```javascript
// Separación clara de responsabilidades
class HomePage {
  constructor(page) {
    this.page = page;
    this.elements = {
      logo: page.locator('[data-testid="logo"]'),
      menu: page.locator('nav ul li')
    };
  }

  async clickLogo() {
    await this.elements.logo.click();
  }
}
```

### Data-Driven Testing

```json
// src/data/homedemoqa/homedemoqa.json
{
  "testData": {
    "validUser": {
      "username": "admin",
      "password": "password123"
    },
    "urls": {
      "home": "https://demoqa.com/",
      "elements": "https://demoqa.com/elements"
    }
  }
}
```

### Configuración Modular

```javascript
// Selectores externos en JSON para fácil mantenimiento
const selectorsData = JSON.parse(readFileSync(selectorsPath, 'utf-8'));
this.selectors = this.parseSelectors(selectorsData.locator);
```

## 📜 Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| **Ejecución** | | |
| Test básico | `npm test` | Ejecuta todos los tests |
| Test con UI | `npm run test:ui` | Modo interactivo con interfaz |
| Test visible | `npm run test:headed` | Ejecuta con navegador visible |
| **Específicos** | | |
| Login | `npm run test:login` | Tests de autenticación |
| Google | `npm run test:google` | Tests de búsqueda Google |
| Paisa | `npm run test:paisa` | Tests específicos Paisa |
| **Configuración** | | |
| Instalar | `npm run playwright:install` | Instala navegadores |

## 💡 Ejemplos de Uso

### Test Tradicional de Playwright

```javascript
test('Login tradicional', async ({ page }) => {
  // Navegar a la página
  await page.goto('https://ejemplo.com/login');
  
  // Llenar formulario
  await page.fill('#username', 'usuario');
  await page.fill('#password', 'contraseña');
  
  // Hacer clic en submit
  await page.click('button[type="submit"]');
  
  // Verificar navegación
  await expect(page).toHaveURL(/dashboard/);
});
```

### Test con tests-ai

```javascript
test('Login con AI', async ({ page, test }) => {
  await page.goto('https://ejemplo.com/login');
  
  // Usar lenguaje natural
  await ai("Escribe 'usuario' en el campo de nombre de usuario", { page, test });
  await ai("Escribe 'contraseña' en el campo de contraseña", { page, test });
  await ai("Haz clic en el botón de iniciar sesión", { page, test });
  
  // Verificación tradicional
  await expect(page).toHaveURL(/dashboard/);
});
```

### Test con Page Object Model

```javascript
test('Login con POM', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.navegarALogin();
  await loginPage.iniciarSesion('usuario', 'contraseña');
  await loginPage.validarLoginExitoso();
});
```

## 📊 Reportes y Resultados

### Estructura de Reportes

```
test-results/
├── 📁 screenshots/           # Capturas automáticas
├── 📁 videos/               # Videos de ejecución
├── 📁 traces/               # Trazas de Playwright
├── 📄 results.json          # Resultados en JSON
├── 📄 junit.xml             # Formato JUnit
└── 📁 [test-name]/          # Carpetas por test fallido
    ├── 📄 error-context.md  # Contexto del error
    ├── 📄 screenshot.png     # Captura del error
    └── 📄 trace.zip          # Traza completa
```

### Ver Reportes

```bash
# Reporte HTML interactivo
npx playwright show-report

# Abrir traza específica
npx playwright show-trace test-results/trace.zip
```

### Configuración de Reportes

```javascript
// playwright.config.js
reporter: [
  ['html', { open: 'never' }],           // Reporte HTML
  ['json', { outputFile: 'results.json' }], // JSON para CI/CD
  ['junit', { outputFile: 'junit.xml' }]    // JUnit para integración
]
```

## 🔍 Debugging Avanzado

### Playwright Inspector

```bash
# Ejecutar con inspector
npx playwright test --debug

# Pausar en un punto específico
await page.pause(); // En tu test
```

### Traces Visuales

```bash
# Generar trace
npx playwright test --trace on

# Ver trace
npx playwright show-trace trace.zip
```

### Screenshots Automáticos

```javascript
// En caso de fallo automático
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    await page.screenshot({ 
      path: `error-${testInfo.title}-${Date.now()}.png`,
      fullPage: true 
    });
  }
});
```

## 🚀 Mejores Prácticas

### 1. **Usar Esperas Inteligentes**

```javascript
// ❌ Evitar esperas estáticas
await page.waitForTimeout(5000);

// ✅ Usar esperas dinámicas
await page.waitForSelector('[data-testid="resultado"]');
await expect(page.locator('[data-testid="resultado"]')).toBeVisible();
```

### 2. **Selectores Robustos**

```javascript
// ❌ Selectores frágiles
page.locator('div > span:nth-child(3)');

// ✅ Selectores semánticos
page.locator('[data-testid="usuario-nombre"]');
page.getByRole('button', { name: 'Enviar' });
page.getByText('Bienvenido');
```

### 3. **Configuración de Timeouts**

```javascript
// Global en playwright.config.js
timeout: 30000,
expect: { timeout: 5000 },

// Por test
test.setTimeout(60000);

// Por acción
await page.click('button', { timeout: 10000 });
```

### 4. **Organización de Tests**

```javascript
test.describe('Módulo de Usuario', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/usuario');
  });

  test.describe('Autenticación', () => {
    test('Login exitoso', async ({ page }) => {});
    test('Login fallido', async ({ page }) => {});
  });
});
```

## 🐛 Troubleshooting Común

### Problemas Frecuentes

1. **Elementos no encontrados**
   ```javascript
   // ✅ Verificar que el elemento esté visible primero
   await expect(page.locator('[data-testid="elemento"]')).toBeVisible();
   await page.click('[data-testid="elemento"]');
   ```

2. **Tests lentos**
   ```javascript
   // ✅ Usar navegadores específicos
   npx playwright test --project=chromium
   
   // ✅ Ejecutar en paralelo
   fullyParallel: true
   ```

3. **Capturas de contexto**
   ```javascript
   // ✅ Más información en errores
   test.afterEach(async ({ page }, testInfo) => {
     await testInfo.attach('screenshot', {
       body: await page.screenshot(),
       contentType: 'image/png',
     });
   });
   ```

## 🤝 Contribuir

### 1. Fork del Proyecto

```bash
git clone https://github.com/tu-usuario/test-playwright-tests-ai.git
cd test-playwright-tests-ai
```

### 2. Crear Rama

```bash
git checkout -b feature/nueva-funcionalidad
```

### 3. Realizar Cambios

```bash
# Crear nuevos tests en test/
# Agregar Page Objects en src/pages/
# Actualizar selectores en src/selectors/
```

### 4. Ejecutar Tests

```bash
npm test
npm run test:headed
```

### 5. Commit y Push

```bash
git add .
git commit -m "feat: agregar nueva funcionalidad"
git push origin feature/nueva-funcionalidad
```

## 📚 Recursos Adicionales

### Documentación Oficial

- [📖 Playwright Docs](https://playwright.dev/)
- [🎭 Playwright API](https://playwright.dev/docs/api/class-playwright)
- [🔧 Configuration](https://playwright.dev/docs/test-configuration)
- [🧪 Test Generator](https://playwright.dev/docs/codegen)

### Tests-AI

- [🤖 tests-ai NPM](https://www.npmjs.com/package/tests-ai)
- [🧠 Anthropic Console](https://console.anthropic.com/)

### Videos y Tutoriales

- [📺 Playwright YouTube Channel](https://www.youtube.com/@Playwright)
- [🎓 Microsoft Learn - Playwright](https://learn.microsoft.com/en-us/training/)

---

## 📄 Licencia

Este proyecto está bajo la Licencia ISC. Ver [LICENSE](LICENSE) para más detalles.

## 👥 Autores

- **Tu Nombre** - *Desarrollo inicial* - [TuGitHub](https://github.com/tu-usuario)

---

**¿Preguntas o Sugerencias?** 

Abre un [issue](../../issues) o contacta al equipo de desarrollo.

---

*Hecho con ❤️ y ☕ usando Playwright + tests-ai*