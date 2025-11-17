exports.config = {
    runner: 'local',

    hostname: '127.0.0.1',
    port: 4723,
    path: '/',

    specs: [
        './test/specs/login.js'
    ],

    maxInstances: 1,

    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'RFCT90L4K1W',   // From adb devices
        'appium:platformVersion': '13',       // Optional: adjust if needed
        'appium:automationName': 'UiAutomator2',
        'appium:appPackage': 'no.wolftech.news',
        'appium:appActivity': '.MainActivity',
        // 'appium:browserName': 'Chrome',
        'appium:noReset': false,
        'appium:fullReset': true,
        'appium:autoGrantPermissions': true,
        'appium:adbExecTimeout': 60000,
        'appium:app': "C:\\Users\\nisit\\Downloads\\tempapk\\app-debug.apk",

        // Chrome/WebView options
        'goog:chromeOptions': {
            prefs: {
                'profile.default_content_setting_values.notifications': 2
            }
        }
    }],

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
