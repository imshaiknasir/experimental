import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [['html', {title: 'checking locator describe'}]],
  use: {
    trace: 'on',
  },
});
