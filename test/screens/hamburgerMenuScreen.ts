import { BaseActions } from "../../utilities/baseActions";

const platform = process.env.PLATFORM;

export class HamburgerMenuScreen extends BaseActions {
    private locators = {
        menuItemLogin: platform === "ANDROID" ?
            "~menu item log in" :
            "",
        menuItemLogOut: platform === "ANDROID" ?
            "~menu item log out" :
            "",
        menuItemWebview: platform === "ANDROID" ?
            "~menu item webview" :
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

    async clickMenuItemWebview() {
        const menuItemWebviewEle = await $(this.locators.menuItemWebview);
        await menuItemWebviewEle.waitForDisplayed();
        await menuItemWebviewEle.click();
    }
}