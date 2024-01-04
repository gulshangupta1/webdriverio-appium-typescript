import { HomeScreen } from "../screens/homeScreen";
import { expect } from 'chai';

const homeScreen: HomeScreen = new HomeScreen();

describe('Chai Assertions in Mobile Automation', () => {
    it('Should assert the visibility of the burger icon', async () => {
        await driver.pause(10000);
        await (await homeScreen.getHamburgerMenuIconEle()).waitForDisplayed();
        expect(await (await homeScreen.getHamburgerMenuIconEle()).isDisplayed()).to.be.true;
    });
});