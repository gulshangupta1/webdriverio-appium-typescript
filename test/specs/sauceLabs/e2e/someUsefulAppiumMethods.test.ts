import { expect } from "chai";
import { LOGGER, LoggerHelper } from "../../../../utilities/reporting/loggerHelper";
import { AndroidKeyActions } from "../../../../utilities/actions/androidKeyActions";

const NetworkConnectionStatus = {
    NO_CONNECTION: 0,
    AIRPLANE_MODE: 1,
    WIFI_ONLY: 2,
    DATA_ONLY: 4,
    ALL_NETWORKS: 6
};
const appStatus = {
    NOT_INSTALLED: 0,
    NOT_RUNNING: 1,
    RUNNING_IN_BACKGROUNG_OR_SUSPENDED: 2,
    RUNNING_IN_BACKGROUND: 3,
    RUNNING_IN_FOREGROUND: 4
};
let connectionStatus: number;
let androidKeyActions: AndroidKeyActions;

const specName: string = 'Some useful appium methods tests';
describe(specName, () => {
    before(async () => {
        LoggerHelper.setupLogger(specName);
        androidKeyActions = new AndroidKeyActions();
    });

    afterEach(async () => {
        // Terminate and Launch the driver again
        await driver.terminateApp("com.saucelabs.mydemoapp.rn");
        await driver.activateApp("com.saucelabs.mydemoapp.rn");
    });

    it('Toggle Airplane Mode Tests', async () => {
        const packageName: string = await driver.getCurrentPackage();
        await driver.terminateApp(packageName);

        connectionStatus = await driver.getNetworkConnection();
        expect(connectionStatus).to.be.equal(NetworkConnectionStatus.ALL_NETWORKS);    // 6: All network connections

        // Toggle Airplane Mode
        await driver.toggleAirplaneMode();
        connectionStatus = await driver.getNetworkConnection();
        expect(connectionStatus).to.be.equal(NetworkConnectionStatus.AIRPLANE_MODE);    // 1: Airplane mode
        await driver.toggleAirplaneMode();
        await driver.pause(5000);
        connectionStatus = await driver.getNetworkConnection();
        expect(connectionStatus).to.be.equal(NetworkConnectionStatus.ALL_NETWORKS);    // 6: All network connections
    });

    it('Toggle Data test', async () => {
        const packageName: string = await driver.getCurrentPackage();
        await driver.terminateApp(packageName);

        connectionStatus = await driver.getNetworkConnection();
        expect(connectionStatus).to.be.equal(NetworkConnectionStatus.ALL_NETWORKS);

        // Toggle Data
        await driver.toggleData();
        connectionStatus = await driver.getNetworkConnection();
        expect(connectionStatus).to.be.equal(NetworkConnectionStatus.WIFI_ONLY);    // 2: WiFi only
        await driver.toggleData();
        await driver.pause(5000);
        connectionStatus = await driver.getNetworkConnection();
        expect(connectionStatus).to.be.equal(NetworkConnectionStatus.ALL_NETWORKS);    // 6: All network connections
    });

    it('Toggle WiFi test', async () => {
        const packageName: string = await driver.getCurrentPackage();
        await driver.terminateApp(packageName);

        connectionStatus = await driver.getNetworkConnection();
        expect(connectionStatus).to.be.equal(NetworkConnectionStatus.ALL_NETWORKS);

        // Toggle WiFi
        await driver.toggleWiFi();
        connectionStatus = await driver.getNetworkConnection();
        expect(connectionStatus).to.be.equal(NetworkConnectionStatus.DATA_ONLY);    // 4: Data only
        await driver.toggleWiFi();
        await driver.pause(5000);
        connectionStatus = await driver.getNetworkConnection();
        expect(connectionStatus).to.be.equal(NetworkConnectionStatus.ALL_NETWORKS);    // 6: All network connections
    });

    it('Toggle Location Service', async () => {
        // Toggle Location Service
        await driver.toggleLocationServices();
        await driver.pause(5000);
        await driver.toggleLocationServices();
    });

    it('Lock device tests', async () => {
        // Lock the device
        await driver.lock();
        let isLocked = await driver.isLocked();
        expect(isLocked).to.be.true;

        // Unlock the device
        await driver.unlock();
        isLocked = await driver.isLocked();
        expect(isLocked).to.be.false;
    });

    it('Install and Uninstall app test and app status', async () => {
        const appPackageName: string = await driver.getCurrentPackage();
        const appPath: string = `${process.cwd()}/app/android/android_sauce_lab_app.apk`;

        let isAppInstalled: boolean = await driver.isAppInstalled(appPackageName);
        expect(isAppInstalled, 'App shoudl be installed').to.be.true;
        let appState: number = await driver.queryAppState(appPackageName);
        expect(appState, 'App should be running in foreground').to.be.equal(appStatus.RUNNING_IN_FOREGROUND);    // 4: running in foreground

        // Uninstall the app
        await driver.pause(5000);
        await driver.removeApp(appPackageName);
        isAppInstalled = await driver.isAppInstalled(appPackageName);
        expect(isAppInstalled, 'App should not be installed').to.be.false;
        appState = await driver.queryAppState(appPackageName);
        expect(appState, 'App should not be installed').to.be.equal(appStatus.NOT_INSTALLED);    // 0: not installed

        // Intsall the app again
        await driver.installApp(appPath);
        isAppInstalled = await driver.isAppInstalled(appPackageName);
        expect(isAppInstalled, 'App should be installed').to.be.true;
        appState = await driver.queryAppState(appPackageName);
        expect(appState, 'App should not be running').to.be.equal(appStatus.NOT_RUNNING);    // 1: not running

        // Launch the app after installation
        await driver.activateApp(appPackageName);
        isAppInstalled = await driver.isAppInstalled(appPackageName);
        expect(isAppInstalled, 'App should be installed').to.be.true;
        appState = await driver.queryAppState(appPackageName);
        expect(appState, 'App should be running in foreground').to.be.equal(appStatus.RUNNING_IN_FOREGROUND);    // 4: running in foreground

        // Terminate the app
        await driver.terminateApp(appPackageName);
        isAppInstalled = await driver.isAppInstalled(appPackageName);
        expect(isAppInstalled, 'App should be installed').to.be.true;
        appState = await driver.queryAppState(appPackageName);
        expect(appState, 'App should not be running').to.be.equal(appStatus.NOT_RUNNING);    // 1: not running

        // Launch the app
        await driver.activateApp(appPackageName);
        isAppInstalled = await driver.isAppInstalled(appPackageName);
        expect(isAppInstalled, 'App should be installed').to.be.true;
        appState = await driver.queryAppState(appPackageName);
        expect(appState, 'App should be running in foreground').to.be.equal(appStatus.RUNNING_IN_FOREGROUND);  // 4: running in foreground
    });

    it('Device time and display density', async () => {
        // Get device time
        const deviceTime: string = await driver.getDeviceTime();
        LOGGER.info('Device time: ' + deviceTime);

        // Get display density
        const displayDensity: number = await driver.getDisplayDensity();
        expect(displayDensity, 'Display density should be greater than 0').greaterThan(0);
        LOGGER.info('Device display density: ' + displayDensity);
    });

    it('Settings tests', async () => {
        const settings = await driver.getSettings();
        LOGGER.info(settings);
    });

    it('Battery specific tests', async () => {
        const fullBattery: number = 100;
        const batteryPercentage: number = 80;

        // Change the battery percentace
        await driver.powerCapacity(batteryPercentage);
        await driver.pause(5000);
        await driver.powerCapacity(fullBattery);

        // Change the state the battery charger to connected or not
        await driver.powerAC('on');
        await driver.powerAC('off');
    });

    it('Clipboard related tests', async () => {
        let textToCopy: string = 'Hi appium';
        const textToCopyBase64 = Buffer.from(textToCopy).toString('base64');

        // Set the clipboard (copy)
        await driver.setClipboard(textToCopyBase64);

        // Get the clipboard
        let clipboardData = await driver.getClipboard();
        const clipboardTextUtf8 = Buffer.from(clipboardData, 'base64').toString('utf-8');
        expect(textToCopy, 'Data is not getting copied to clipboard').to.be.equal(clipboardTextUtf8);
    });

    it('Android press button tests', async () => {
        // Home button
        await androidKeyActions.pressHome();

        // Increase volume
        await androidKeyActions.pressVolumeUp();

        // Decrese volume
        await androidKeyActions.pressVolumeDown();

        // Serach button
        await androidKeyActions.pressSearch();

        // Open and close notificarion panel
        await androidKeyActions.pressNotification();
        await androidKeyActions.pressNotification();

        // turn off and turn on power
        await androidKeyActions.pressPower();
        await androidKeyActions.pressPower();
    });

    it('Switch between two apps (activateApp(appPackageName))', async () => {
        const souceLabAppPackage: string = await driver.getCurrentPackage();
        const cameraAppPackage = 'com.android.camera2';

        // Opening camera
        await driver.activateApp(cameraAppPackage);

        // Switching between apps
        for (let i = 0; i < 3; i++) {
            await driver.pause(5000);
            await driver.activateApp(souceLabAppPackage);
            await driver.pause(5000);
            await driver.activateApp(cameraAppPackage);
        }

        // Terminating both apps
        await driver.terminateApp(souceLabAppPackage);
        await driver.terminateApp(cameraAppPackage);
    });

    it('Switch between two apps (startActivity(packageName, activityName))', async () => {
        const sauceLabAppPackage: string = await driver.getCurrentPackage();
        const sauceLabAppPackageActivity = "com.saucelabs.mydemoapp.rn.MainActivity";

        const cameraAppPackage = 'com.android.camera2';
        const cameraAppActivity = "com.android.camera.CameraLauncher";


        // Launch the camera app
        await driver.startActivity(cameraAppPackage, cameraAppActivity);

        // Click camera
        await androidKeyActions.pressCamera();
        await driver.pause(5000);

        await driver.startActivity(sauceLabAppPackage, sauceLabAppPackageActivity);

        // Terminating both apps
        await driver.terminateApp(sauceLabAppPackage);
        await driver.terminateApp(cameraAppPackage);

        await driver.pause(1000);
    });

    it.only('Toggle network speed', async () => {
        // await driver.toggleNetworkSpeed('gsm');
        // await driver.toggleNetworkSpeed('edge');
        // // await driver.toggleNetworkSpeed('hscsd');    // Not working
        // await driver.toggleNetworkSpeed('gprs');
        // await driver.toggleNetworkSpeed('umts');
        // await driver.toggleNetworkSpeed('hsdpa');
        // await driver.toggleNetworkSpeed('lte');
        // await driver.toggleNetworkSpeed('evdo');
        // // Change back to previous speed
        // await driver.toggleNetworkSpeed('full');

        // Get bar details
        // const result = await driver.getSystemBars();
        // console.log(result);
    });
});


