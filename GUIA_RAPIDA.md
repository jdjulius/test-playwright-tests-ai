# Guía Rápida - tests-ai con Playwright

## Inicio Rápido en 3 Pasos

### 1️⃣ Instalar
```bash
npm install
npx playwright install chromium
```

### 2️⃣ Configurar API Key
```bash
# Crear archivo .env
cp .env.example .env

# Editar .env y agregar tu clave:
# ANTHROPIC_API_KEY=sk-ant-tu-clave-aqui
```

💡 Obtén tu clave gratis en: https://console.anthropic.com/

### 3️⃣ Ejecutar
```bash
npm test
```

## ¿Cómo Funciona?

```typescript
// En lugar de esto:
await page.locator('input.new-todo').fill('Comprar pan');
await page.locator('input.new-todo').press('Enter');

// Escribe esto:
await ai("Escribe 'Comprar pan' en el campo de entrada y presiona Enter", 
  { page, test }
);
```

## Comandos Útiles

| Comando | Descripción |
|---------|-------------|
| `npm test` | Ejecuta todas las pruebas |
| `npm run test:headed` | Ejecuta con navegador visible |
| `npm run test:ui` | Modo interactivo con UI |
| `npm run test:report` | Muestra el reporte HTML |

## Ejemplo Completo

```typescript
import { test, expect } from "@playwright/test";
import { ai } from "tests-ai";

test("ejemplo simple", async ({ page }) => {
  // Navegar
  await page.goto("https://demo.playwright.dev/todomvc");
  
  // Usar IA con lenguaje natural
  await ai("Agrega la tarea 'Estudiar TypeScript'", { page, test });
  
  // Verificar resultado
  await expect(page.getByTestId("todo-title"))
    .toContainText("Estudiar TypeScript");
});
```

## Solución de Problemas

❌ **Error: "ANTHROPIC_API_KEY not found"**
- Verifica que creaste el archivo `.env`
- Asegúrate de que tiene tu clave API válida

❌ **Error: "Chromium not found"**
- Ejecuta: `npx playwright install chromium`

❌ **Las pruebas fallan con timeout**
- La IA necesita tiempo para analizar la página
- Esto es normal en la primera ejecución
- Considera aumentar el timeout en `playwright.config.ts`

## Recursos

- 📖 [README completo](./README.md)
- 🔗 [tests-ai en GitHub](https://github.com/andytyler/playwright-ai)
- 🎭 [Documentación Playwright](https://playwright.dev)
