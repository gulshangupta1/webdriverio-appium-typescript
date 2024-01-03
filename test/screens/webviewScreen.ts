const platform = process.env.PLATFORM;

export class WebviewScreen {
    private locators = {
        urlInputField: platform === "ANDROID" ?
            "~URL input field" :
            "",
        goToSiteButton: platform === "ANDROID" ?
            "~Go To Site button" :
            ""
    }

    async enterUrl(url: string) {
        const urlInputFieldEle = await $(this.locators.urlInputField);
        await urlInputFieldEle.waitForDisplayed();
        await urlInputFieldEle.setValue(url);
        await driver.hideKeyboard();
    }

    async clickGoToSiteButton() {
        const goToSiteButtonEle = await $(this.locators.goToSiteButton);
        await goToSiteButtonEle.waitForDisplayed();
        await goToSiteButtonEle.click();
    }
}