import { LOGGER } from "../reporting/loggerHelper";

export class TapActionsUtil {
    /**
     * Perform a tap action on the specified element.
     * 
     * @param {string | WebdriverIO.Element} element - The element to tap, either as a selector string or a WebdriverIO element.
     * @param {number} [timeout=30000] - The timeout for waiting for the element to be displayed (in milliseconds).
     * @returns {Promise<void>} - A Promise that resolves when the tap action is completed.
     */
    async tap(element: string | WebdriverIO.Element, timeout?: number): Promise<void> {
        const actualTimeout = timeout ?? 30000;

        try {
            if (typeof element === 'string') {
                element = await $(element);
            }
            await element.waitForDisplayed({ timeout: actualTimeout });

            await driver.touchAction([
                {
                    action: 'tap',
                    element: element
                }
            ]);
        } catch (err) {
            LOGGER.error(`Error tapping on element: ${element}: \n${err.stack}`);
            throw err;
        }
    }

    /**
     * Perform a tap action at a specific offset from the top-left corner of the specified element.
     * 
     * @param {string | WebdriverIO.Element} element - The element to tap, either as a selector string or a WebdriverIO element.
     * @param {number} offsetX - The X-axis offset from the top-left corner of the element.
     * @param {number} offsetY - The Y-axis offset from the top-left corner of the element. 
     * @param {number} [timeout=30000] - The timeout for waiting for the element to be displayed (in milliseconds).
     * @returns {Promise<void>} - A Promise that resolves when the tap action is completed.
     */
    async tapAtOffset(element: string | WebdriverIO.Element, offsetX: number, offsetY: number, timeout?: number): Promise<void> {
        const actualTimeout = timeout ?? 30000;

        try {
            if (typeof element === 'string') {
                element = await $(element);
            }
            await element.waitForDisplayed({ timeout: actualTimeout });

            const location = await element.getLocation();
            const xCoordinate = location.x;
            const yCoordinate = location.y;

            await driver.touchAction([
                {
                    action: 'tap',
                    x: xCoordinate + offsetX,
                    y: yCoordinate + offsetY
                }
            ]);
        } catch (err) {
            LOGGER.error(`Error tapping on element (${element}) with offset (${offsetX}, ${offsetY}): \n${err.stack}`);
            throw err;
        }
    }
}