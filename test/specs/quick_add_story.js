describe('Quick Add Story Flow', () => {
    it('should click the plus button and then click Story', async () => {
        // Click the plus (+) button (Quick add)
        const plusBtn = await $('//android.widget.Button[@content-desc="Quick add"]');
        await plusBtn.waitForDisplayed({ timeout: 5000 });
        await plusBtn.click();
        console.log('[TEST] Clicked Quick add (+) button');

        // Wait for the overlay to appear
        const overlay = await $('//android.view.View[@resource-id="ion-overlay-2"]');
        await overlay.waitForDisplayed({ timeout: 5000 });

        // Click the Story option inside the overlay
        // Try to find the element by text inside the overlay
        const storyBtn = await $('//android.view.View[@resource-id="ion-overlay-2" and contains(@text, "Story")]');
        await storyBtn.waitForDisplayed({ timeout: 5000 });
        await storyBtn.click();
        console.log('[TEST] Clicked Story option');
    });
});
