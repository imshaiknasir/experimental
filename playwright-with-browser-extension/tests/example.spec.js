const {test} = require('../fixtures');

test('Case 1', async ({page}) => {
    await page.goto("https://google.com");
    await page.pause();
})