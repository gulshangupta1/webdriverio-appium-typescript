import { PressActionsUtil } from "./pressActionsUtil";
import { SwipeActionsUtil } from "./swipeActionsUtil";
import { SwitchContextUtil } from "./switchContextUtil";
import { TapActionsUtil } from "./tapActionsUtil";

export class BaseActions {
    tapActionsUtil: TapActionsUtil;
    pressActionsUtil: PressActionsUtil;
    swipeActionsUtil: SwipeActionsUtil;
    switchContextUtil: SwitchContextUtil;

    constructor() {
        this.tapActionsUtil = new TapActionsUtil();
        this.pressActionsUtil = new PressActionsUtil();
        this.swipeActionsUtil = new SwipeActionsUtil();
        this.switchContextUtil = new SwitchContextUtil();
    }

    async tap(element: string | WebdriverIO.Element, timeout?: number): Promise<void> {
        await this.tapActionsUtil.tap(element, timeout);
    }

    async tapAtOffset(element: string | WebdriverIO.Element, offsetX: number, offsetY: number, timeout?: number): Promise<void> {
        await this.tapActionsUtil.tapAtOffset(element, offsetX, offsetY, timeout);
    }

    async pressAndHold(element: string | WebdriverIO.Element, pressDuration: number, timeout?: number): Promise<void> {
        await this.pressActionsUtil.pressAndHold(element, pressDuration, timeout);
    }

    async pressAndHoldAtOffset(element: string | WebdriverIO.Element, offsetX: number, offsetY: number, pressDuration: number, timeout?: number): Promise<void> {
        await this.pressActionsUtil.pressAndHoldAtOffset(element, offsetX, offsetY, pressDuration, timeout);
    }

    async swipe(element: string | WebdriverIO.Element, maxScrollAttempts: number = 5): Promise<boolean> {
        return await this.swipeActionsUtil.swipe(element, maxScrollAttempts);
    }


    async horizontalSwipe(element: string | WebdriverIO.Element, maxScrollAttempts: number = 5): Promise<boolean> {
        return await this.swipeActionsUtil.horizontalSwipe(element, maxScrollAttempts);
    }

    async swipeByPercentage(element: string | WebdriverIO.Element, startPercentage: number = 50, endPercentage: number = 20, maxScrollAttempts: number = 5): Promise<boolean> {
        return await this.swipeActionsUtil.swipeByPercentage(element, startPercentage, endPercentage, maxScrollAttempts);
    }

    async horizontalSwipeByPercentage(element: string | WebdriverIO.Element, startPercentage: number = 0, endPercentage: number = 100, maxScrollAttempts: number = 5): Promise<boolean> {
        return await this.swipeActionsUtil.horizontalSwipeByPercentage(element, startPercentage, endPercentage, maxScrollAttempts);
    }

    async switchContext(contextName: string, timeout?: number): Promise<void> {
        await this.switchContextUtil.switchContext(contextName, timeout);
    }

    async switchToNativeContext(timeout?: number): Promise<void> {
        await this.switchContextUtil.switchToNativeContext(timeout);
    }

    async switchToWebContext(timeout?: number): Promise<void> {
        await this.switchContextUtil.switchToWebContext(timeout);
    }
}