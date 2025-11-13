   
describe('Scan Now and Auth0 WebView Test', () => {
    it('should click SCAN NOW, switch to webview, click Auth0, and enter credentials', async () => {
    // Log commit state after entering app
    console.log('Commit: Clicked SCAN NOW, clicked Auth0, and entered app.');
        // Click the SCAN NOW button
        const scanNowButton = await $('android=new UiSelector().text("SCAN NOW")');
        await scanNowButton.click();

        // Wait for the next page/webview to load
        await driver.pause(7000);

        // Get all contexts (NATIVE_APP, WEBVIEW, etc.)
        const contexts = await driver.getContexts();
        const webviewContext = contexts.find(c => c.includes('WEBVIEW'));
        console.log('Available contexts:', contexts);
        console.log('Current context:', await driver.getContext());
        if (webviewContext) {
            await driver.switchContext(webviewContext);
            await driver.pause(5000);

            

            // Try flexible XPath for Auth0 button
            let auth0Button = await $('//*[contains(text(),"Auth0")]');
            await auth0Button.waitForDisplayed({ timeout: 7000 });
            await auth0Button.click();

            // Wait for login form to appear
            await driver.pause(2000);

            // Enter username (email address)
            const usernameField = await $('#username');
            await usernameField.waitForDisplayed({ timeout: 5000 });
            await usernameField.setValue('nisitha.prakash@avid.com');

           
            // Click and enter password
            const passwordField = await $('#password');
            await passwordField.waitForDisplayed({ timeout: 5000 });
            await passwordField.click();
            await passwordField.setValue('S3cretPa$$');

            // Click the Continue button in webview context
            // Try XPath for button with text 'Continue'
            const continueBtnWeb = await $('//button[contains(text(),"Continue")]');
            await continueBtnWeb.waitForDisplayed({ timeout: 7000 });
            await continueBtnWeb.click();
        } else {
            throw new Error('WEBVIEW context not found');
        }
    });
});

