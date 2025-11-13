describe('Chrome on Android', () => {

    it('should open a URL and click an element', async () => {

        // (Optional) open a URL if using WebView or Chrome
        // await browser.url('https://wolftech.no/about-us/');

        // Find the "Views" menu item by Accessibility ID
        const views = await $('~Views');

        // Wait until the element is displayed (max 5 seconds)
        await views.waitForDisplayed({ timeout: 5000 });

        // Tap on the "Views" element
        await views.click();

        // Optionally, wait for an element on the next screen to ensure navigation worked
        const animation = await $('~Animation');
        await animation.waitForDisplayed({ timeout: 5000 });
    });

});
