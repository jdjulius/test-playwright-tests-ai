# test-playwright-tests-ai

**Ejemplo claro, realista y corto de automatización de pruebas con Playwright usando tests-ai** 

Este proyecto demuestra cómo usar `tests-ai` con Playwright para escribir pruebas automatizadas usando lenguaje natural e inteligencia artificial.

## 🌟 ¿Qué es tests-ai?

`tests-ai` es un paquete NPM que permite escribir pruebas de Playwright usando **lenguaje natural** en lugar de selectores CSS frágiles. Utiliza la API de Anthropic Claude para entender instrucciones en español o inglés y ejecutar acciones en la interfaz de usuario.

### Ventajas:
- ✨ **Lenguaje natural**: Escribe pruebas como hablarías con una persona
- 🎯 **Sin selectores frágiles**: No más `div.class > span:nth-child(3)`
- 🤖 **IA integrada**: Usa Anthropic Claude para entender la interfaz
- 🌍 **Multiidioma**: Funciona en español, inglés y otros idiomas

## 📋 Requisitos Previos

- Node.js 18 o superior
- Una clave API de Anthropic (obtén una gratis en [console.anthropic.com](https://console.anthropic.com/))

## 🚀 Instalación

1. **Clona este repositorio:**
   ```bash
   git clone https://github.com/jdjulius/test-playwright-tests-ai.git
   cd test-playwright-tests-ai
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Instala los navegadores de Playwright:**
   ```bash
   npx playwright install chromium
   ```

4. **Configura tu clave API de Anthropic:**
   
   Copia el archivo de ejemplo:
   ```bash
   cp .env.example .env
   ```
   
   Luego edita `.env` y agrega tu clave API:
   ```env
   ANTHROPIC_API_KEY=tu-clave-api-real-aqui
   ```

## 📖 Ejemplo de Uso

Aquí está el ejemplo principal de este proyecto (`tests/todo.spec.ts`):

```typescript
import { test, expect } from "@playwright/test";
import { ai } from "tests-ai";

test("agregar una tarea usando IA", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");

  // ¡Usa lenguaje natural en lugar de selectores!
  await ai(
    "Escribe 'Comprar leche' en el campo de entrada y presiona Enter",
    { page, test }
  );

  // Verificación tradicional de Playwright
  await expect(page.getByTestId("todo-title")).toContainText("Comprar leche");
});
```

### Comparación: Con y Sin tests-ai

**Sin tests-ai (selectores tradicionales):**
```typescript
await page.locator('input.new-todo').fill('Comprar leche');
await page.locator('input.new-todo').press('Enter');
await page.locator('.toggle').first().click();
```

**Con tests-ai (lenguaje natural):**
```typescript
await ai("Escribe 'Comprar leche' y presiona Enter", { page, test });
await ai("Marca la primera tarea como completada", { page, test });
```

## 🧪 Ejecutar las Pruebas

### Pruebas sin API Key (Demo Local)

Si quieres probar Playwright sin configurar la API de Anthropic primero:

```bash
# Ejecutar solo las pruebas de la demo local (sin IA)
npx playwright test tests/demo-local.spec.ts

# Con interfaz visible
npx playwright test tests/demo-local.spec.ts --headed
```

### Pruebas con tests-ai (requiere API Key)

Una vez configurada tu `ANTHROPIC_API_KEY`:

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar solo las pruebas con IA
npx playwright test tests/todo.spec.ts
npx playwright test tests/demo-local-ai.spec.ts

# Ejecutar con interfaz gráfica visible
npm run test:headed

# Ejecutar en modo interactivo UI
npm run test:ui

# Ver el reporte de resultados
npm run test:report
```

## 📁 Estructura del Proyecto

```
test-playwright-tests-ai/
├── demo/
│   └── index.html            # Demo HTML local para pruebas sin internet
├── tests/
│   ├── todo.spec.ts          # Ejemplos con tests-ai (TodoMVC)
│   ├── demo-local.spec.ts    # Pruebas básicas sin IA (demo local)
│   └── demo-local-ai.spec.ts # Pruebas con IA (demo local)
├── playwright.config.ts       # Configuración de Playwright
├── package.json              # Dependencias y scripts
├── .env.example              # Plantilla de variables de entorno
├── GUIA_RAPIDA.md            # Guía rápida en español
└── README.md                 # Este archivo
```

## 🎯 Casos de Uso Incluidos

### Con tests-ai (requiere API Key):

**`tests/todo.spec.ts`** - Ejemplos con TodoMVC (requiere internet):
1. **Agregar una tarea**: Demuestra cómo usar IA para escribir y agregar elementos
2. **Marcar como completada**: Muestra cómo interactuar con checkboxes usando lenguaje natural
3. **Filtrar tareas**: Ejemplo de navegación y filtrado usando IA

**`tests/demo-local-ai.spec.ts`** - Ejemplos con demo local (sin internet):
1. Interacción con formularios usando IA
2. Marcar elementos como completados
3. Limpiar formularios con lenguaje natural

### Sin tests-ai (no requiere API Key):

**`tests/demo-local.spec.ts`** - Pruebas básicas de Playwright:
1. Verificar carga de página
2. Interacción con formularios usando selectores tradicionales
3. Marcar checkboxes de forma convencional

💡 **Recomendación**: Empieza con `tests/demo-local.spec.ts` para verificar que Playwright funciona, luego prueba los ejemplos con IA.

## 💡 Consejos y Mejores Prácticas

1. **Sé específico**: Instrucciones claras obtienen mejores resultados
   - ✅ Bueno: "Haz clic en el botón rojo que dice 'Guardar'"
   - ❌ Malo: "Guarda"

2. **Combina con selectores tradicionales**: Usa IA para acciones y selectores para verificaciones
   ```typescript
   await ai("Completa el formulario de registro", { page, test });
   await expect(page.locator('.success-message')).toBeVisible();
   ```

3. **Manejo de errores**: tests-ai puede fallar si la interfaz es ambigua

4. **Costo**: Cada llamada a `ai()` consume tokens de la API de Anthropic

## 📚 Recursos Adicionales

- [Documentación de tests-ai](https://github.com/andytyler/playwright-ai)
- [Documentación de Playwright](https://playwright.dev)
- [API de Anthropic](https://docs.anthropic.com)

## 📝 Notas Importantes

⚠️ **Este ejemplo requiere una clave API de Anthropic activa para funcionar.** Sin la clave API, las pruebas fallarán.

⚠️ **Las llamadas a la IA consumen créditos:** Anthropic cobra por uso de tokens. Revisa sus precios en [anthropic.com/pricing](https://www.anthropic.com/pricing)

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar este ejemplo, abre un issue o pull request.

## 📄 Licencia

ISC
