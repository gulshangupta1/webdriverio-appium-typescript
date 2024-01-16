import { LOGGER } from "../reporting/loggerHelper";

export class SwipeActionsUtil {
    /**
     * Perform a swipe (scroll) action to find an element within a specified number of attempts.
     * 
     * @param {string | WebdriverIO.Element} element - The element to find, either as a selector string or a WebdriverIO element. 
     * @param {number} maxScrollAttempts - The maximum number of scroll attempts. 
     * @param {number} [timeout=30000] - The timeout for waiting for the element to be displayed (in milliseconds).
     * @returns {Promise<boolean>} - A Promise that resolves to `true` if the element is found or `false` if the maximum attempts are reached.
     */
    async swipe(element: string | WebdriverIO.Element, maxScrollAttempts: number = 5): Promise<boolean> {
        let elementFound: boolean = false;

        try {
            if (typeof element === 'string') {
                element = await $(element);
            }

            for (let attempt = 0; attempt < maxScrollAttempts; attempt++) {
                LOGGER.info(`Attempt ${attempt} of ${maxScrollAttempts}`);
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
                LOGGER.warn(`Element not found after ${maxScrollAttempts} swipe attempts.`);
            }

            return elementFound;
        } catch (err) {
            LOGGER.error(`Error performing swipe: \n${err.stack}`);
            throw err;
        }
    }

    /**
     * Perform a horizontal swipe action to find an element within a specified number of attempts.
     * 
     * @param {string | WebdriverIO.Element} element - The element to find, either as a selector string or a WebdriverIO element. 
     * @param {number} maxScrollAttempts - The maximum number of scroll attempts. 
     * @param {number} [timeout=30000] - The timeout for waiting for the element to be displayed (in milliseconds).
     * @returns {Promise<boolean>} - A Promise that resolves to `true` if the element is found or `false` if the maximum attempts are reached.
     */
    async horizontalSwipe(element: string | WebdriverIO.Element, maxScrollAttempts: number = 5): Promise<boolean> {
        let elementFound: boolean = false;

        try {
            if (typeof element === 'string') {
                element = await $(element);
            }

            for (let attempt = 0; attempt < maxScrollAttempts; attempt++) {
                if (await element.isDisplayed()) {
                    elementFound = true;
                    break;
                }

                const startX = 200;
                const endX = 800;
                const startY = 500;

                await driver.touchAction([
                    { action: 'press', x: endX, y: startY },
                    { action: 'wait', ms: 500 },
                    { action: 'moveTo', x: startX, y: startY },
                    { action: 'release' }
                ]);
            }
            if (!elementFound) {
                LOGGER.warn(`Element not found after ${maxScrollAttempts} horizontal swipes.`);
            }

            return elementFound;
        } catch (err) {
            LOGGER.error(`Error performing horizontal swipe: \n${err.stack}`);
            throw err;
        }
    }

    /**
     * Perform a swipe (scroll) action based on percentages to find an element within a specified number of attempts.
     * The method scrolls vertically from a starting Y-coordinate to an ending Y-coordinate, with the X-coordinate fixed based on a percentage of the screen width.
     * 
     * @param {string | WebdriverIO.Element} element - The element to find, either as a selector string or a WebdriverIO element. 
     * @param {number} startPercentage - The percentage of the screen width to set the starting X-coordinate. 
     * @param {number} endPercentage - The percentage of the screen height to set the ending Y-coordinate. 
     * @param {number} [maxScrollAttempts=5] - The maximum number of scroll attempts.
     * @returns {Promise<boolean>} - A Promise that resolves to `true` if the element is found or `false` if the maximum attempts are reached. 
     */
    async swipeByPercentage(element: string | WebdriverIO.Element, startPercentage: number = 50, endPercentage: number = 20, maxScrollAttempts: number = 5): Promise<boolean> {
        let elementFound: boolean = false;

        try {
            if (typeof element === 'string') {
                element = await $(element);
            }

            for (let attempt = 0; attempt < maxScrollAttempts; attempt++) {
                if (await element.isDisplayed()) {
                    elementFound = true;
                    break;
                }

                const screenSize = await driver.getWindowRect();

                const startX = screenSize.width * (startPercentage / 100);
                const startY = screenSize.height * (80 / 100);
                const endY = screenSize.height * (endPercentage / 100);

                await driver.touchAction([
                    { action: 'press', x: startX, y: startY },
                    { action: 'wait', ms: 500 },
                    { action: 'moveTo', x: startX, y: endY },
                    { action: 'release' }
                ]);
            }

            if (!elementFound) {
                LOGGER.warn(`Element not found after ${maxScrollAttempts} swipe attempts.`);
            }

            return elementFound;
        } catch (err) {
            LOGGER.error(`Error during swipeByPercentage: ${err.stack}`);
            throw err;
        }
    }

    /**
     * Perform a horizontal swipe action on the specified element based on percentage coordinates.
     * 
     * @param {string | WebdriverIO.Element} element - The element to interact with, either as a selector string or a WebdriverIO element.
     * @param {number} [startPercentage=0] - The starting percentage of the screen width for the swipe (default: 0, leftmost).
     * @param {number} [endPercentage=100] - The ending percentage of the screen width for the swipe (default: 100, rightmost).
     * @param {number} [maxScrollAttempts=5] - The maximum number of scroll attempts (default: 5).
     * @returns {Promise<boolean>} - A Promise that resolves to `true` if the element is found, `false` otherwise.
     */
    async horizontalSwipeByPercentage(element: string | WebdriverIO.Element, startPercentage: number = 0, endPercentage: number = 100, maxScrollAttempts: number = 5): Promise<boolean> {
        let elementFound: boolean = false;

        try {
            if (typeof element === 'string') {
                element = await $(element);
            }

            for (let attempt = 0; attempt < maxScrollAttempts; attempt++) {
                if (await element.isDisplayed()) {
                    elementFound = true;
                    break;
                }

                const screenSize = await driver.getWindowRect();

                const startY = screenSize.width * (50 / 100);
                const startX = screenSize.height * (startPercentage / 100);
                const endX = screenSize.height * (endPercentage / 100);

                await driver.touchAction([
                    { action: 'press', x: startX, y: startY },
                    { action: 'wait', ms: 500 },
                    { action: 'moveTo', x: endX, y: startY },
                    { action: 'release' }
                ]);
            }

            if (!elementFound) {
                LOGGER.warn(`Element not found after ${maxScrollAttempts} swipe attempts.`)
            }

            return elementFound;
        } catch (err) {
            LOGGER.error(`Error performing horizontal swipe: \n${err.stack}`);
            throw err;
        }
    }
}