import { BaseActions } from "../../utilities/actions/baseActions";

const platform = process.env.PLATFORM;

export class MyCartScreen extends BaseActions {
    private locators = {
        proceedToCheckoutButton: platform === "ANDROID" ?
            "~Proceed To Checkout button" :
            ""
    }

    async clickProceedToCheckoutButton() {
        const proceedToCheckoutButtonEle = await $(this.locators.proceedToCheckoutButton);
        await proceedToCheckoutButtonEle.waitForDisplayed();
        await proceedToCheckoutButtonEle.click();
    }
}