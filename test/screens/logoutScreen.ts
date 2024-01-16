import { BaseActions } from "../../utilities/actions/baseActions";

const platform = process.env.PLATFORM;

export class LogoutScreen extends BaseActions {
    private locators = {
        logoutButton: platform === 'ANDROID' ?
            "//android.widget.Button[@text='LOG OUT']" :
            "",
        logOutOkButton:
            platform === 'ANDROID' ?
                "//android.widget.Button[@text='OK']" :
                ""
    }

    async clickLogoutButton() {
        const logoutButtonEle = await $(this.locators.logoutButton);
        await logoutButtonEle.waitForDisplayed();
        await logoutButtonEle.click()
    }

    async clickOkButton() {
        const logOutOkButtonEle = await $(this.locators.logOutOkButton);
        await logOutOkButtonEle.waitForDisplayed();
        await logOutOkButtonEle.click();
    }
}