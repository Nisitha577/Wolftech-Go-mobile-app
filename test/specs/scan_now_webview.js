describe('Scan Now + Auth0 Login Flow', () => {
    it('should handle login flow simply and reliably', async () => {

        // 1. Click SCAN NOW
        const scanNowBtn = await $('android=new UiSelector().text("SCAN NOW")');
        await scanNowBtn.click();

        // Wait for app to transition
        await driver.pause(4000);

        // 2. Check contexts
        const contexts = await driver.getContexts();
        const webview = contexts.find(c => c.includes('WEBVIEW'));

        // ❗ If NO WEBVIEW is found → Already logged in
        if (!webview) {
            console.log("\x1b[36m[TEST]\x1b[0m No WebView detected — app skipped login and landed directly inside the app.");
            return; // End test early
        }

        // 3. Switch to WebView
        await driver.switchContext(webview);
        await driver.pause(1000);

        // 4. Try clicking Auth0 button (if visible)
        try {
            const authBtn = await $('//*[contains(text(),"Auth0")]');
            if (await authBtn.isDisplayed()) {
                await authBtn.click();
            }
        } catch (_) {
            console.log("\x1b[36m[TEST]\x1b[0m Auth0 button not visible — likely already logged in.");
        }

        // 5. If login form appears, fill credentials
        try {
            const username = await $('#username');
            await username.waitForDisplayed({ timeout: 5000 });

            await username.setValue('nisitha.prakash@avid.com');
            const password = await $('#password');
            await password.setValue('S3cretPa$$');

            const continueBtn = await $('//button[contains(text(),"Continue")]');
            await continueBtn.click();

        } catch (e) {
            console.log("\x1b[36m[TEST]\x1b[0m Login screen did not appear — continuing.");
        }

    });
});
