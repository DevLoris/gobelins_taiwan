/**
 * Set number of decimals to 1 in number values of given object
 * @param object
 * @param decimals
 */
export function objectNumberValuesToFixed(object, decimals) {
    Object.entries(object).forEach(([key, value]) => {
        if(typeof value === "number") {
            object[key] = value.toFixed(1);
        }
    });
}
