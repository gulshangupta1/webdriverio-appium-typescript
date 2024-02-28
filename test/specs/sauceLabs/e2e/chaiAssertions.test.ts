import { LoggerHelper } from "../../../../utilities/reporting/loggerHelper";
import { HomeScreen } from "../../../screens/homeScreen";
import { expect } from 'chai';

const homeScreen: HomeScreen = new HomeScreen();

const specName: string = 'Chai Assertions Tests';
describe('Chai Assertions in Mobile Automation', () => {
    before(async () => {
        LoggerHelper.setupLogger(specName);
    });

    it('Should assert the visibility of the burger icon', async () => {
        await driver.pause(10000);
        await (await homeScreen.getHamburgerMenuIconEle()).waitForDisplayed();
        expect(await (await homeScreen.getHamburgerMenuIconEle()).isDisplayed()).to.be.true;
    });
});