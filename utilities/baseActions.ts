export class BaseActions {
    /**
     * tap on element
     * @param element 
     */
    async tap(element: string, timeout?: number): Promise<void>;

    async tap(element: WebdriverIO.Element, timeout?: number): Promise<void>;

    async tap(element: any, timeout?: number): Promise<void> {
        const timeOut = timeout ?? 30000;

        if (typeof element === 'string') {
            element = await $(element);
        }
        await element.waitForDisplayed({ timeout: timeOut });
        await driver.touchAction([
            {
                action: 'tap',
                element: element
            }
        ]);
    }
}