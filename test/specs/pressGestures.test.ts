import { HomeScreen } from "../screens/homeScreen";

const homeScreen = new HomeScreen();

describe('Press and Hold Gestures', () => {
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