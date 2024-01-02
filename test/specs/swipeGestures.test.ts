import { HomeScreen } from "../screens/homeScreen";
import { BaseActions } from "../../utilities/baseActions";

const homeScreen: HomeScreen = new HomeScreen();
const baseActions: BaseActions = new BaseActions();

describe('Swipe Gestures', () => {
    afterEach(async () => {
        // Terminate and Launch the driver again
        await driver.terminateApp("com.saucelabs.mydemoapp.rn");
        await driver.activateApp("com.saucelabs.mydemoapp.rn");
    });

    it('Should perform a vertical swipe (scroll down) on a mobile app', async () => {
        await driver.pause(2000);

        const startX = 500;
        const startY = 800;
        const endY = 200;

        await driver.touchAction([
            { action: 'press', x: startX, y: startY },
            { action: 'wait', ms: 500 },
            { action: 'moveTo', x: startX, y: endY },
            { action: 'release' }
        ]);
    });

    it('Should scroll until an element is visible on a mobile app', async () => {
        const footerEle = await homeScreen.getFooterEle();
        await baseActions.swipe(footerEle);
    });
});