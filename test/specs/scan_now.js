describe('Scan Now Button Test', () => {
    it('should find and click the SCAN NOW button', async () => {
        // Use UiSelector to find the button by text
        const scanNowButton = await $('android=new UiSelector().text("SCAN NOW")');
        await scanNowButton.click();
        // Optionally, add an assertion or next step here
        // Example: await expect(scanNowButton).toBeDisplayed();
    });
});
