export class HamburgerMenuScreen {
    private locators = {
        menuItemLogin: '~menu item log in',
        menuItemLogOut: '~menu item log out',
    }

    public async getMenuItemLoginEle(): Promise<WebdriverIO.Element> {
        return await $(this.locators.menuItemLogin);
    }

    public async getMenuItemLogOutEle(): Promise<WebdriverIO.Element> {
        return await $(this.locators.menuItemLogOut);
    }
}