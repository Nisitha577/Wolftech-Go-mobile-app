describe('Scan Now and Auth0 Button Test', () => {
    it('should click SCAN NOW and then Auth0', async () => {
        // Click the SCAN NOW button
        const scanNowButton = await $('android=new UiSelector().text("SCAN NOW")');
        await scanNowButton.click();

        // Wait for the next page to load
        await driver.pause(3000);

        // Log available contexts
        const contexts = await driver.getContexts();
        console.log('Available contexts:', contexts);
        console.log('Current context:', await driver.getContext());

        // Find Auth0 using XPath as shown in Inspector
        const auth0Button = await $('//android.widget.TextView[@text="Auth0"]');
        await auth0Button.waitForDisplayed({ timeout: 5000 });
        await auth0Button.click();
    });
});