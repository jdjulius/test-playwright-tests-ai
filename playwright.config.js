import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const isCI = !!process.env.CI;

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './test',
  testMatch: '**/*.spec.js',
  
  // Timeouts optimizados para CI
  timeout: isCI ? 45000 : 60000,
  expect: { timeout: isCI ? 10000 : 30000 },
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  
  // Reintentos optimizados
  retries: isCI ? 2 : 0,
  
  // Configuración de workers optimizada
  workers: isCI ? 2 : undefined,
  
  // Solo reportes necesarios en CI
  reporter: isCI 
    ? [
        ['html', { outputFolder: 'playwright-report' }],
        ['json', { outputFile: 'test-results/results.json' }],
        ['junit', { outputFile: 'test-results/junit.xml' }]
      ]
    : [['html', { open: 'never' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: process.env.BASE_URL || 'https://dev.paisabombas.app/',
    
    // Configuración optimizada para CI
    headless: isCI,
    slowMo: isCI ? 0 : 500,
    
    // Artifacts optimizados para CI
    screenshot: isCI ? 'only-on-failure' : 'on',
    video: isCI ? 'retain-on-failure' : 'on',
    trace: isCI ? 'on-first-retry' : 'on',
    
    // Configuraciones adicionales para estabilidad
    actionTimeout: 30000,
    navigationTimeout: 30000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
