import { BaseActions } from "../../utilities/baseActions";

const platform = process.env.PLATFORM;

export class HamburgerMenuScreen extends BaseActions {
    private locators = {
        menuItemLogin: platform === "ANDROID" ?
            "~menu item log in" :
            "",
        menuItemLogOut: platform === "ANDROID" ?
            "~menu item log out" :
            ""
    };

    async clickMenuItemLogin() {
        const menuItemLoginEle = await $(this.locators.menuItemLogin);
        await menuItemLoginEle.waitForDisplayed();
        await menuItemLoginEle.click();
    }

    async clickMenuItemLogout() {
        const menuItemLogOutEle = await $(this.locators.menuItemLogOut);
        await menuItemLogOutEle.waitForDisplayed();
        await menuItemLogOutEle.click();
    }
}