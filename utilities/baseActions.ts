export class BaseActions {
    /**
     * Perform a tap action on the specified element.
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
            console.error(`Error tapping on element: ${element}\n${err.stack}`);
            throw err;
        }
    }

    /**
     * Perform a tap action at a specific offset from the top-left corner of the specified element.
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
            console.error(`Error tapping on element (${element}) with offset (${offsetX}, ${offsetY})\n${err.stack}`);
            throw err;
        }
    }

    /**
     * Perform a press and hold action on the specified element for the specified duration.
     * @param {string | WebdriverIO.Element} element - The element to perform the press and hold action on, either as a selector string or a WebdriverIO element.
     * @param {number} pressDuration - The duration (in milliseconds) to press and hold the element.
     * @param {number} [timeout=30000] - The timeout for waiting for the element to be displayed (in milliseconds).
     * @returns {Promise<void>} - A Promise that resolves when the press and hold action is completed.
     */
    async pressAndHold(element: string | WebdriverIO.Element, pressDuration: number, timeout?: number): Promise<void> {
        const actualTimeout = timeout ?? 30000;

        try {
            if (typeof element === 'string') {
                element = await $(element);
            }
            await element.waitForDisplayed({ timeout: actualTimeout });

            await driver.touchAction([
                { action: 'press', element: element },
                { action: 'wait', ms: pressDuration },
                { action: 'release' }
            ]);
        } catch (err) {
            console.error(`Error performing press and hold on element (${element})\n${err.message}`)
            throw err;
        }
    }

    /**
     * Perform a press and hold action at a specific offset from the top-left corner of the specified element for the specified duration.
     * @param {string | WebdriverIO.Element} element - The element to perform the press and hold action on, either as a selector string or a WebdriverIO element.
     * @param {number} offsetX - The X-axis offset from the top-left corner of the element.
     * @param {number} offsetY - The Y-axis offset from the top-left corner of the element.
     * @param {number} pressDuration - The duration (in milliseconds) to press and hold at the specified offset.
     * @param {number} [timeout=30000] - The timeout for waiting for the element to be displayed (in milliseconds).
     * @returns {Promise<void>} - A Promise that resolves when the press and hold action is completed.
     */
    async pressAndHoldAtOffset(element: string | WebdriverIO.Element, offsetX: number, offsetY: number, pressDuration: number, timeout?: number): Promise<void> {
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
                { action: 'press', x: xCoordinate + offsetX, y: yCoordinate + offsetY },
                { action: 'wait', ms: pressDuration },
                { action: 'release' }
            ]);
        } catch (err) {
            console.error(`Error performing press and hold on element (${element}) with offset (${offsetX}, ${offsetY})\n${err.message}`)
            throw err;
        }
    }

    /**
     * Perform a swipe (scroll) action to find an element within a specified number of attempts.
     * @param {string | WebdriverIO.Element} element - The element to find, either as a selector string or a WebdriverIO element. 
     * @param {number} maxScrollAttempts - The maximum number of scroll attempts. 
     * @param {number} [timeout=30000] - The timeout for waiting for the element to be displayed (in milliseconds).
     * @returns {Promise<void>} - A Promise that resolves when the element is found or the maximum attempts are reached. 
     */
    async swipe(element: string | WebdriverIO.Element, maxScrollAttempts: number = 5, timeout?: number): Promise<void> {
        const actualTimeout: number = timeout ?? 30000;
        let elementFound: boolean = false;

        try {
            if (typeof element === 'string') {
                element = await $(element);
            }

            for (let attempt = 0; attempt < maxScrollAttempts; attempt++) {
                console.log(`Attempt ${attempt} of ${maxScrollAttempts}`);
                if (await element.isDisplayed()) {
                    elementFound = true;
                    break;
                }

                const startX = 500;
                const startY = 800;
                const endY = 200;

                await driver.touchAction([
                    { action: 'press', x: startX, y: startY },
                    { action: 'wait', ms: 500 },
                    { action: 'moveTo', x: startX, y: endY },
                    { action: 'release' }
                ]);
            }

            if (!elementFound) {
                console.warn(`Element not found after ${maxScrollAttempts} swipe attempts.`);
            }
        } catch (err) {
            console.error(`Error performing swipe: \n${err.message}`);
            throw err;
        }
    }
}