// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 6 * 60 * 1000, // global test timeout (5 min)
  reporter: [['html'],['dot'],['list'],['allure-playwright']],
  use: {
    trace: 'on', // Capture trace on test failure
    baseURL:'https://opensource-demo.orangehrmlive.com',
    // actionTimeout: 15000,       // 15s per action
    // navigationTimeout: 30000,   // 30s per navigation
    screenshot: 'on', // Capture screenshots on test failure
    video: 'on' // Capture videos only on test failure

  },
  expect: {
     timeout: 600000,             // 10s per assertion
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
