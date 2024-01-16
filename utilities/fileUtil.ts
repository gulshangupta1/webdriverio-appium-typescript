export class FileUtil {

    /**
     * Convert a JSON object to a custom type.
     * @param json - The JSON object.
     * @returns - The custom type object.
     */
    static convertJsonToCustomType<T>(json: Record<string, unknown>): T {
        return json as T;
    }
}