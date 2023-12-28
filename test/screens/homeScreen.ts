export class HomeScreen {
    private locators = {
        hamburgerMenuIcon: '~open menu',
        productTextOnHomeScreen: "//android.widget.TextView[@text='Products']"
    }

    public async getHamburgerMenuIconEle(): Promise<WebdriverIO.Element> {
        return await $(this.locators.hamburgerMenuIcon);
    }

    public async getProductTextOnHomeScreenEle(): Promise<WebdriverIO.Element> {
        return await $(this.locators.productTextOnHomeScreen);
    }
}