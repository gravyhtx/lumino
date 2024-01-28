/**
 * Creates a new object by omitting specified keys from the input object.
 * @template T - The type of the input object.
 * @param {T} obj - The input object.
 * @param {string[]} keys - The keys to omit from the object.
 * @returns {Omit<T, keyof T>} - A new object without the omitted keys.
 **         (https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)
 * @example
 * const user = {
 *   id: 1,
 *   name: "John",
 *   age: 30,
 *   email: "john@example.com"
 * };
 *
 * const omittedUser = omitKeys(user, ["age", "email"]);
 * console.log(omittedUser);
 * * // Output: { id: 1, name: "John" }
 */
 export const omitKeys = <T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const { ...rest } = obj;
  for (const key of keys) {
    if (rest.hasOwnProperty(key)) {
      delete rest[key];
    }
  }
  return rest;
};