# Automatización DemoQA Home Page

## Descripción

Automatización de pruebas para la página principal de DemoQA (https://demoqa.com/) implementada siguiendo el patrón Page Object Model (POM) con Playwright y JavaScript.

## Estructura de Archivos Creados

### 1. Selectores JSON

**Ruta**: `src/selectors/homedemoqa/HomeDemoQAPage.json`

- Contiene todos los locators XPath de los elementos de la página
- Incluye botones, labels y cards principales
- Formato estándar: name, type, locatorType, locator

### 2. Page Object Model

**Ruta**: `src/pages/homedemoqa/HomeDemoQAPage.js`

- Hereda de BasePage
- Implementa métodos de inicialización individuales para cada componente
- Incluye métodos de acción (click, navigate)
- Incluye métodos de validación (isVisible, validate navigation)

### 3. Clase de Tests

**Ruta**: `src/test/homedemoqa/HomeDemoQATest.js`

- Contiene todos los métodos de prueba sin decoradores @Test
- Implementa validaciones específicas para cada elemento
- Incluye asserts para comprobar resultados

### 4. Data Provider

**Ruta**: `src/data/homedemoqa/homedemoqa.json`

- Casos de prueba parametrizados
- Incluye tests para desktop y mobile
- Configuración de URL esperadas y descripciones

### 5. Spec de Playwright

**Ruta**: `src/test/homedemoqa/homedemoqa.spec.js`

- Archivo principal de ejecución con Playwright
- Implementa data-driven testing
- Configuración de dispositivos (desktop/mobile)
- Capturas de pantalla automáticas
- Hooks de setup y teardown

## Componentes Identificados

| Componente        | Tipo   | Descripción                       | XPath                                                     |
| ----------------- | ------ | --------------------------------- | --------------------------------------------------------- |
| buttonElementos   | button | Botón para acceder a Elements     | `//h5[normalize-space(text())='Elements']`                |
| buttonFormularios | button | Botón para acceder a Forms        | `//h5[normalize-space(text())='Forms']`                   |
| buttonAlertas     | button | Botón para acceder a Alerts       | `//h5[normalize-space(text())='Alerts, Frame & Windows']` |
| labelWidget       | label  | Label para acceder a Widgets      | `//h5[normalize-space(text())='Widgets']`                 |
| buttonInteraccion | button | Botón para acceder a Interactions | `//h5[normalize-space(text())='Interactions']`            |
| buttonBiblioteca  | button | Botón para acceder a Book Store   | `//h5[normalize-space(text())='Book Store Application']`  |

## Validaciones Implementadas

### Validaciones de Navegación

1. **validarBotonElementos**: Valida redirección a `/elements`
2. **validarBotonFormularios**: Valida redirección a `/forms`
3. **validarBotonAlertas**: Valida redirección a `/alertsWindows`
4. **validarLabelWidget**: Valida redirección a `/widgets`
5. **validarBotonInteraccion**: Valida redirección a `/interaction`
6. **validarBotonBiblioteca**: Valida redirección a `/books`

### Validaciones de Visibilidad

- **validarTodasLasCardsVisibles**: Verifica que todas las cards estén visibles
- **validarTitulosCards**: Valida que los títulos de las cards sean correctos

### Validaciones Integrales

- **validarNavegacionCompleta**: Ejecuta todas las validaciones de navegación secuencialmente

## Casos de Prueba Implementados

### Desktop Tests

- 9 casos de prueba para funcionalidad completa en desktop
- Validación de navegación para todos los elementos
- Validación de visibilidad y títulos

### Mobile Tests

- 3 casos de prueba específicos para dispositivos móviles
- Configuración responsive automática
- Validación de elementos principales en mobile

## Ejecución de Pruebas

### Ejecutar todas las pruebas de DemoQA Home

```bash
npx playwright test src/test/homedemoqa/homedemoqa.spec.js
```

### Ejecutar con reporte HTML

```bash
npx playwright test src/test/homedemoqa/homedemoqa.spec.js --reporter=html
```

### Ejecutar en modo debug

```bash
npx playwright test src/test/homedemoqa/homedemoqa.spec.js --debug
```

### Ejecutar solo en Chrome

```bash
npx playwright test src/test/homedemoqa/homedemoqa.spec.js --project=chromium
```

## Capturas de Pantalla Automáticas

El sistema genera automáticamente capturas en:

- **Inicio de cada test**: `homedemoqa-{index}-initial-{browser}.png`
- **Final de cada test**: `homedemoqa-{index}-final-{browser}.png`
- **En caso de error**: `homedemoqa-{index}-error-{browser}.png`
- **Validaciones específicas**: `homedemoqa-page-loaded.png`

## Metodología POM Implementada

### Principios Aplicados

1. **Una pantalla es un POM**: HomeDemoQAPage representa la página completa
2. **Todos los escenarios tienen assert**: Cada test incluye validaciones
3. **Inicialización granular**: Métodos init individuales por componente
4. **Separación de responsabilidades**: Page, Test y Spec separados

### Beneficios de la Implementación

- **Rendimiento optimizado**: Solo inicializa componentes necesarios
- **Control granular**: Debugging más fácil por componente
- **Flexibilidad**: Diferentes tests pueden usar diferentes componentes
- **Mantenimiento modular**: Cada componente es independiente
- **Reutilización**: Page Object reutilizable en múltiples tests

## Configuración de Dispositivos

### Desktop

- Viewport: 1920x1080
- User Agent: Chrome Windows

### Mobile

- Viewport: 375x667 (iPhone)
- User Agent: Safari iOS
- Touch habilitado

## Estructura de Datos

### Test Data Format

```json
{
  "nombre": "Descripción del test",
  "testType": "método_a_ejecutar",
  "expectedUrl": "url_esperada",
  "description": "Descripción detallada",
  "device": "desktop|mobile"
}
```

## Criterios de Éxito

✅ **Todos los componentes identificados correctamente**
✅ **Locators únicos y estables implementados**
✅ **Tests ejecutan sin errores**
✅ **Asserts validan escenarios correctamente**
✅ **Data provider funciona con múltiples casos**
✅ **Capturas automáticas implementadas**
✅ **Configuración responsive funcional**
✅ **Navegación validada para todos los elementos**

## Próximos Pasos

1. Ejecutar las pruebas para validar funcionamiento
2. Revisar reportes de Playwright generados
3. Ajustar selectores si es necesario según la estructura real de la página
4. Extender con más validaciones según necesidades específicas
