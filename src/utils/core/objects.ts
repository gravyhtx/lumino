/**
 * Check if an object is empty
 * @param obj - The object to check
 * @returns True if the object is empty, false otherwise
 * 
 * @example
 * isEmpty({}); // Returns true
 */
export const isEmpty = (obj: object) => Reflect.ownKeys(obj).length === 0;