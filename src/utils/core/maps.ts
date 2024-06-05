// ~/utils/core/maps.ts
/**
 * Converts a JavaScript object into a Map.
 * 
 * @param obj The object to convert.
 * @returns A new Map with the same key-value pairs as the object.
 * 
 * @example
 * const user = { id: 1, name: 'Alice', age: 25 };
 * const userMap = objectToMap(user);
 * console.log(userMap); // Output: Map { 'id' => 1, 'name' => 'Alice', 'age' => 25 }
 */
export function objectToMap(obj: Record<string, unknown>): Map<string, unknown> {
  const map = new Map<string, unknown>();
  Object.entries(obj).forEach(([key, value]) => map.set(key, value));
  return map;
}

/**
* Converts an array of objects into a Map using a specified field as the key.
* If the key field does not exist in an object, it defaults to 'index{i}' where {i} is the array index.
* 
* @param objects The array of objects to convert.
* @param keyField The field to use as the key.
* @returns A new Map with keys derived from the specified field or default index keys.
* 
* @example
* const products = [{ id: 'p1', name: 'Widget', price: 9.99 }, { id: 'p2', price: 22.99 }];
* const productMap = arrayToMap(products, 'name');
* console.log(productMap); // Output: Map { 'Widget' => { id: 'p1', name: 'Widget', price: 9.99 }, 'index1' => { id: 'p2', price: 22.99 } }
* 
* @example
* const numbers = [1, 2, 3, 4];
* const numberMap = arrayToMap(numbers, 'value');
* console.log(numberMap); // Output: Map { 'index0' => 1, 'index1' => 2, 'index2' => 3, 'index3' => 4 }
*/
export function arrayToMap(objects: Array<Record<string | symbol | number, unknown>>, keyField: string): Map<string | number, Record<string, unknown>> {
  const map = new Map<string | number, Record<string, unknown>>();
  objects.forEach((obj, index) => {
    const key = obj[keyField] ? String(obj[keyField]) : `index${index}`;
    map.set(key, obj);
  });
  return map;
}

/**
 * Converts various data types to a Map, handling objects, arrays, Sets, Maps, and other iterables.
 * 
 * This function also handles circular references if specified.
 * @param input - The data to convert to a Map.
 * @param allowCircular - If true, allows one circular reference, replacing further duplicates with null.
 * @returns A Map with the data converted from the input, or throws a TypeError if the input is not iterable.
 * 
 * @example
 * const obj = { a: 1, b: 2 };
 * console.log(toMap(obj)); // Outputs: Map { 'a' => 1, 'b' => 2 }
 * 
 * @example
 * const arr = [['key1', 'value1'], ['key2', 'value2']];
 * console.log(toMap(arr)); // Outputs: Map { 'key1' => 'value1', 'key2' => 'value2' }
 */
export function toMap<T>(input: T, allowCircular = false): Map<unknown, T> {
  if (!input) {
    throw new TypeError('Input must be provided and cannot be null or undefined.');
  }

  const result = new Map<unknown, T>();
  const seen = new WeakSet();

  function handleCircular(value: T) {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return allowCircular ? value : null;
      }
      seen.add(value);
    }
    return value;
  }

  // Handling input as Iterable<[any, T]>
  if (typeof input === 'object' && input !== null && Symbol.iterator in input) {
    const iterableInput = input as Iterable<T>;
    for (const item of iterableInput) {
      if (Array.isArray(item) && item.length === 2) { // Ensuring each item is a tuple
        result.set(item[0], handleCircular(item[1] as T) as T);
      }
    }
  } else if (typeof input === 'object') {
    Object.entries(input as Record<string, T>).forEach(([key, value]) => {
      result.set(key, handleCircular(value) as T);
    });
  } else {
    throw new TypeError('The input must be an iterable or an object.');
  }

  return result;
}
