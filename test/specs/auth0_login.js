describe('Auth0 Login Test', () => {
    it('should enter email and password in Auth0 login', async () => {
        // Switch to webview context if not already done
        const contexts = await driver.getContexts();
        const webviewContext = contexts.find(c => c.includes('WEBVIEW'));
        if (webviewContext) {
            await driver.switchContext(webviewContext);
        }

        // Enter email
        const emailField = await $('//input[@type="email"]');
        await emailField.waitForDisplayed({ timeout: 5000 });
        await emailField.setValue('nisitha.prakash@avid.com');

        // Enter password
        const passwordField = await $('//input[@type="password"]');
        await passwordField.waitForDisplayed({ timeout: 5000 });
        await passwordField.setValue('S3cretPa$$');
    });
});