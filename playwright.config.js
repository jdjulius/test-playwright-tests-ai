import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './test',
  testMatch: '**/*.spec.js',
  /* Global timeout for each test */
  timeout: 60000, // 60 seconds
  /* Global timeout for each expect() assertion */
  expect: {
    timeout: 30000, // 30 seconds for assertions
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace for all tests (exitosos y fallidos) */
    trace: 'on',

    /* Take screenshot for all tests */
    screenshot: 'on',

    /* Record video for all tests */
    video: 'on',

    /* Navigation timeout */
    navigationTimeout: 60000, // 1 minute
    /* Action timeout */
    actionTimeout: 60000, // 1 minute

    /* Configuración para mostrar el navegador */
    headless: false, // Mostrar el navegador (no headless)
    slowMo: 500, // Ralentizar acciones para ver mejor (500ms entre acciones)
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
