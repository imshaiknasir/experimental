const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  headless: false,
  projects: [
    {
      name: 'Edge with Extension',
      use: {
        ...devices['Desktop Edge'],
      }
    }
  ]
});