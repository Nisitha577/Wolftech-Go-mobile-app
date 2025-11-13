describe('Scan Now and Auth0 WebView Test', () => {
    it('should click SCAN NOW, switch to webview, and click Auth0', async () => {
        // Click the SCAN NOW button
        const scanNowButton = await $('android=new UiSelector().text("SCAN NOW")');
        await scanNowButton.click();

        // Wait for the next page/webview to load
        await driver.pause(3000);

        // Get all contexts (NATIVE_APP, WEBVIEW, etc.)
        const contexts = await driver.getContexts();
        // Switch to the webview context
        const webviewContext = contexts.find(c => c.includes('WEBVIEW'));
        if (webviewContext) {
            await driver.switchContext(webviewContext);

            // Click the Auth0 button in the webview (native view selector)
            const auth0Button = await $('//*[text()="Auth0"]');
            await auth0Button.click();
        } else {
            throw new Error('WEBVIEW context not found');
        }
    });
});
