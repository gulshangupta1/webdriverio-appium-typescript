import { LOGGER } from "./reporting/loggerHelper";

export namespace XpathUtil {
    export function getPlaceholderReplaced(xpath: string, replacement: string): string {
        let resultStr: string = '';

        try {
            resultStr = xpath.replace(/##PLACEHOLDER##/g, replacement);
            return resultStr;
        } catch (error) {
            LOGGER.error(`Failed to replace placeholder for ${replacement}\n${error.stack}`)
            throw error;
        }
    }
}