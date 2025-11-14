describe('Scan Now + Auth0 Login Flow', () => {
    it('should handle login, then logout flow simply and reliably', async () => {
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

        // 5. After login, click user icon and then logout
        await driver.pause(2000); // Wait for main screen

        // Click the user icon (profile)
        const userIcon = await $('//android.widget.Image[@text="Navigate to profile page"]');
        await userIcon.waitForDisplayed({ timeout: 5000 });
        await userIcon.click();
        console.log("[TEST] Clicked user icon");

        await driver.pause(1000); // Wait for profile/menu to open

        // Swipe up to reveal the logout button (if needed)
        const { width, height } = await driver.getWindowRect();
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: width / 2, y: height * 0.8 },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 500 },
                    { type: 'pointerMove', duration: 500, x: width / 2, y: height * 0.2 },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);
        await driver.pause(800); // Wait for scroll animation

        // Click the logout button
        const logoutBtn = await $('//android.widget.Button[@content-desc="Log out"]');
        await logoutBtn.waitForDisplayed({ timeout: 5000 });
        await logoutBtn.click();
        console.log("[TEST] Clicked logout button");

        // Optionally, add an assertion to confirm logout (e.g., login screen appears)
    });
});
