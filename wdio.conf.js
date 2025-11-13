exports.config = {
    runner: 'local',

    hostname: '127.0.0.1',
    port: 4723,
    path: '/',

    specs: [
     './test/specs/first_test.js'
    ],

    maxInstances: 1,

    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'emulator-5554',   // From adb devices
        'appium:platformVersion': '13',         // Optional: adjust if needed
        'appium:automationName': 'UiAutomator2',
        'appium:appPackage': 'io.appium.android.apis',
        'appium:appActivity': '.ApiDemos',
        //'appium:browserName': 'Chrome',
        'appium:noReset': false,
        'appium:autoGrantPermissions': true,
        'appium:adbExecTimeout': 60000,

        // Chrome/WebView options
        'goog:chromeOptions': {
            prefs: {
                 'profile.default_content_setting_values.notifications': 2
            }
        }}],

    logLevel: 'info',
    bail: 0,
    waitforTimeout: 20000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    services: [
        ['appium', {
            args: {
                relaxedSecurity: true,
                allowInsecure: ['chromedriver_autodownload'],
                useDrivers: 'uiautomator2,chromium'
,
                
            }
        }]
    ],

    framework: 'mocha',
    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 120000
    }
};
