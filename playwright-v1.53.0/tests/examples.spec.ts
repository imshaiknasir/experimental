import { test, expect, request } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).describe('The `Get Started` Link').click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('lambdatest', async ({ page }) => {
  await page.goto('https://www.lambdatest.com/selenium-playground/select-dropdown-demo');

  // wait for dropdown to be visible
  await expect(page.locator('#select-demo')).toBeVisible();

  // select a option from dropdown
  await page.locator('#select-demo').selectOption('Sunday');

  // verify the selected option using toContainText
  await expect(page.locator('[id="__next"]')).toContainText('Day selected :- Sunday');

  // verify the selected option using toHaveValue
  await expect(page.locator('#select-demo')).toHaveValue('Sunday');

  // verify the dropdown using toMatchAriaSnapshot
  await expect(page.locator('#select-demo')).toMatchAriaSnapshot(`
    - combobox:
      - option "Please select" [disabled]
      - option "Sunday" [selected]
      - option "Monday"
      - option "Tuesday"
      - option "Wednesday"
      - option "Thursday"
      - option "Friday"
      - option "Saturday"
    `);

  // verify the selected option using toMatchAriaSnapshot
  await expect(page.locator('[id="__next"]')).toMatchAriaSnapshot(`- paragraph: Day selected :- Sunday`);

  // select multiple options from dropdown
  await page.locator('#multi-select').selectOption(['New Jersey', 'New York', 'Ohio', 'Texas', 'Pennsylvania']);

  // verify the selected options using toMatchAriaSnapshot
  await expect(page.locator('#multi-select')).toMatchAriaSnapshot(`
    - listbox:
      - option "California"
      - option "Florida"
      - option "New Jersey" [selected]
      - option "New York" [selected]
      - option "Ohio" [selected]
      - option "Texas" [selected]
      - option "Pennsylvania" [selected]
      - option "Washington"
    `);

  // select a option from dropdown
  await page.locator('#multi-select').selectOption('Florida');
  await page.getByRole('button', { name: 'First Selected' }).click();
  await expect(page.locator('[id="__next"]').first().describe('First selected option')).toContainText('Florida');
  await page.locator('#multi-select').selectOption('New York');
  await page.getByRole('button', { name: 'Get Last Selected' }).click();
  await expect(page.locator('[id="__next"]').last().describe('Last selected option')).toContainText('New York');
});

test.describe('API Authentication and Login Bypass', () => {
  const loginPayload = { username: "user404", password: "User#404" }
  let token;
  test.beforeAll(async ({ request }) => {
    const loginResponse = await request.post("https://bookcart.azurewebsites.net/api/login",
      {
        data: loginPayload
      })
    expect(loginResponse.ok()).toBeTruthy()// this is for checking the response which is 200 OK
    const loginresponseJson = await loginResponse.json()// get the json data from the response
    token = loginresponseJson.token// get the token alone from the entire json response
    console.log(token)
  })


  test('Bypassing the login using API calls', async ({ page }) => {
    //below is the javascript function to insert the token into the local storage
    await page.addInitScript(value => {
      window.localStorage.setItem('authToken', value)
    }, token)
    await page.goto('https://bookcart.azurewebsites.net')
    const title = page.locator("div[class='p-1 ng-star-inserted'] strong:has-text('Harry Potter and the Chamber of Secrets')")
    console.log(await title.textContent())
  })
});