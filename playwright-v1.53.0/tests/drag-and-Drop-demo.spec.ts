import { test, expect } from '@playwright/test';

test.describe('Drag and Drop Demo', () => {
    test('in the-internet.herokuapp.com', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/drag_and_drop');

        // Drag and Drop A to B and verify the result
        await page.locator('#column-a').dragTo(page.locator('#column-b'));
        await expect(page.locator('#column-a')).toHaveText('B');
        await expect(page.locator('#column-b')).toHaveText('A');

        // Drag and Drop B to A and verify the result
        await page.locator('#column-b').dragTo(page.locator('#column-a'));
        await expect(page.locator('#column-a')).toHaveText('A');
        await expect(page.locator('#column-b')).toHaveText('B');
    });

    test('in globalsqa.com', async ({ page }) => {
        await page.goto('https://www.globalsqa.com/demo-site/draganddrop/');

        // Photo manager
        const iframe = page.frameLocator('iframe[data-src="../../demoSite/practice/droppable/photo-manager.html"]');
        const photo_Tatras = iframe.locator("//img[contains(@src,'high_tatras_min')]/parent::li")
        const photo_Tatras2 = iframe.locator("//img[contains(@src,'high_tatras2_min')]/parent::li")
        const trash = iframe.locator('#trash');

        // Drag and Drop photo_Tatras to Trash
        await photo_Tatras.waitFor({ state: 'visible' });
        await photo_Tatras.dragTo(trash);
        await expect(trash.locator('ul li')).toHaveCount(1);

        // Drag and Drop photo_Tatras2 to Trash
        await photo_Tatras2.dragTo(trash);
        await expect(trash.locator('ul li')).toHaveCount(2);


        // Accepted Elements
        await page.getByRole('tab', { name: 'Accepted Elements', exact: true }).click();
        const iframe2 = page.frameLocator('iframe[data-src="../../demoSite/practice/droppable/accepted-elements.html"]');
        const draggable = iframe2.locator('#draggable');
        const dropzone = iframe2.locator('#droppable');

        // Drag and Drop nonDroppable to droppable
        await draggable.dragTo(dropzone);
        await expect(dropzone.locator('p')).toHaveText('Dropped!');
    });

    test('in practice.expandtesting.com', async ({ page }) => {
        await page.goto('https://practice.expandtesting.com/drag-and-drop-circles');

        // Elements
        const target = page.locator('#target');
        const source = page.locator('#source');

        // Drag and Drop source to target
        await source.locator('.red').dragTo(target);
        await source.locator('.green').dragTo(target);
        await source.locator('.blue').dragTo(target);

        await expect(target.locator('div')).toHaveCount(3);
        await expect(target.locator('div').nth(0)).toHaveClass('red');
        await expect(target.locator('div').nth(2)).toHaveClass('blue');
        await expect(target.locator('div').nth(1)).toHaveClass('green');
    });
});