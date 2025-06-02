const { test: base, chromium } = require('@playwright/test');
const path = require('path');

// Extend the base Playwright test object with custom fixtures
exports.test = base.extend({
  // Define a 'context' fixture that launches a persistent browser context
  context: async ({ }, use) => {
    const pathToExtension = path.join(process.cwd(), 'selectorHub-extension');
    const userDataDir = path.join(process.cwd(), 'user-data'); // Directory for persistent user data

    // Launch a persistent Chromium context, specifying 'msedge' channel for Edge
    const context = await chromium.launchPersistentContext(userDataDir, {
      channel: 'msedge', // This is crucial to launch Microsoft Edge
      headless: false, // Ensure the browser is visible
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    });

    // Provide the configured context to the tests
    await use(context);

    // Close the browser context after all tests using this fixture are done
    await context.close();
  },
});

// Export 'expect' from the base Playwright test for assertions
exports.expect = base.expect; 