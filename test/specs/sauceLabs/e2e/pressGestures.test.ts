import { LoggerHelper } from "../../../../utilities/reporting/loggerHelper";
import { HomeScreen } from "../../../screens/homeScreen";

let homeScreen: HomeScreen;

const specName: string = 'Press And Hold Gestures Tests';
describe('Press and Hold Gestures', () => {
    before(async () => {
        LoggerHelper.setupLogger(specName);
        homeScreen = new HomeScreen();
    });

    afterEach(async () => {
        // Terminate and Launch the driver again
        await driver.terminateApp("com.saucelabs.mydemoapp.rn");
        await driver.activateApp("com.saucelabs.mydemoapp.rn");
    });

    it('should perform a press and hold gesture on a mobile element', async () => {
        await homeScreen.pressHoldFirstItem();
    });

    it('should perform a press and hold gesture on a mobile element using coordinates', async () => {
        await homeScreen.PressHoldOffsetFirstItem();
    });
});