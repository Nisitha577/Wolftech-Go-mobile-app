describe('Scan Now + Auth0 Login Flow', () => {
    it('should handle login flow simply and reliably', async () => {

        // 1. Click SCAN NOW
        const scanNowBtn = await $('android=new UiSelector().text("SCAN NOW")');
        await scanNowBtn.click();

        // wait for page transition
        await driver.pause(4000);

        // 2. Get contexts (just for debug)
        const contexts = await driver.getContexts();
        console.log('Contexts:', contexts);

        // 3. Click Auth0 button (native element)
        try {
            const auth0Btn = await $('//*[@text="Auth0"]');
            await auth0Btn.waitForDisplayed({ timeout: 8000 });
            await auth0Btn.click();
            console.log("[TEST] Clicked Auth0 button");
        } catch (err) {

            console.log("[TEST] Auth0 button not found, maybe already logged in.");
        }

        // 4. If HTML login form appears (email/password), fill it
        try {
            // these ONLY appear if login is NOT cached
            const username = await $('#username');
            await username.waitForDisplayed({ timeout: 6000 });

            await username.setValue('nisitha.prakash@avid.com');
            const password = await $('#password');
            await password.setValue('S3cretPa$$');

            const continueBtn = await $('//button[contains(text(),"Continue")]');
            await continueBtn.click();

            console.log("[TEST] Filled login form");
        } catch {
            console.log("[TEST] No login form appeared; likely auto-login / SSO.");
        }
    });
});
