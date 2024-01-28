/**
 * Creates a new object by picking specified keys from the input object.
 * @template T - The type of the input object.
 * @param {T} obj - The input object.
 * @param {Array<keyof T>} keys - The keys to pick from the object.
 * @returns {Pick<T, keyof T>} - A new object with only the picked keys.
 *
 * @example
 * const user = {
 *   id: 1,
 *   name: "John",
 *   age: 30,
 *   email: "john@example.com"
 * };
 *
 * const pickedUser = pickKeys(user, ["name", "email"]);
 * console.log(pickedUser);
 * //* Output: { name: "John", email: "john@example.com" }
 */
export const pickKeys = <T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  const result: Pick<T, K> = {} as Pick<T, K>;
  for (const key of keys) {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    }
  }
  return result;
};