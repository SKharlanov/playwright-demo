/* eslint-disable @typescript-eslint/no-magic-numbers */
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: 'src/tests',
  // Folder for test artifacts such as screenshots, videos, traces, etc.
  outputDir: 'reports/test-results',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  timeout: 60000,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    [
      'allure-playwright',
      {
        resultsDir: './reports/allure',
        links: {
          tms: {
            nameTemplate: 'TMS #%s',
            urlTemplate: 'https://gitlab.com/skharlanov-group/playwright-demo/-/work_items/%s',
          },
          issue: {
            nameTemplate: 'Issue #%s',
            urlTemplate: 'https://gitlab.com/skharlanov-group/playwright-demo/-/issues/%s',
          },
        },
        environmentInfo: {
          nodeVersion: process.version,
        },
      },
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    screenshot: 'only-on-failure',
    actionTimeout: 3000,
    navigationTimeout: 3000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Chrome',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'Safari',
      use: { ...devices['Desktop Safari'] },
    },

    {
      name: 'Edge',
      use: { ...devices['Desktop Edge'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ].filter((p) => !process.env.BROWSER || p.name === process.env.BROWSER),

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
