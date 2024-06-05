/**
 * Check if an object is empty
 * @param obj - The object to check
 * @returns True if the object is empty, false otherwise
 * 
 * @example
 * isEmpty({}); // Returns true
 */
export const isEmpty = (obj: object): boolean => Reflect.ownKeys(obj).length === 0;

/**
 * Creates a new object by omitting specified keys from the input object.
 * @template T The type of the input object.
 * @param {T} obj The input object.
 * @param {string[]} keys The keys to omit from the object.
 * @returns {Omit<T, keyof T>} A new object without the omitted keys.
 * @example
 * const user = {
 *   id: 1,
 *   name: "John",
 *   age: 30,
 *   email: "john@example.com"
 * };
 *
 * const omittedUser = omitKeys(user, ["age", "email"]);
 * console.log(omittedUser); // Output: { id: 1, name: "John" }
 * 
 * @url https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys
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
 * console.log(pickedUser); // Output: { name: "John", email: "john@example.com" }
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

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 *
 * @param {object} objA The first object to compare.
 * @param {object} objB The second object to compare.
 * @returns {boolean} `true` if the objects are shallowly equal, `false` otherwise.
 *
 * @example
 * const obj1 = { name: 'John', age: 25 };
 * const obj2 = { name: 'John', age: 25 };
 * const obj3 = { name: 'John', age: 30 };
 *
 * shallowEqual(obj1, obj2); // true
 * shallowEqual(obj1, obj3); // false
 */
export function shallowEqual<T extends Record<string, unknown>>(objA: T, objB: T): boolean {
  if (is(objA, objB)) {
    return true;
  }

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (const key of keysA) {
    if (
      !hasOwn(objB, key) ||
      !is(objA[key], objB[key])
    ) {
      return false;
    }
  }

  return true;
}

/**
 * Check if an object is circular
 * @param obj - The object to check
 * @returns True if the object is circular, false otherwise
 * 
 * @example
 * isCircularReference({}); // Returns false
 */
export const isCircularReference = (obj: unknown): boolean => {
  const seen = new WeakSet();
  function detect(value: unknown): boolean {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return true;
      
      seen.add(value);
      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key) && detect((value as Record<string, unknown>)[key])) {
          return true;
        }
      }
      seen.delete(value);
    }
    return false;
  }
  return detect(obj);
}

/**
 * Remove circular references from an object
 * @param allowOne - Allow one circular reference
 * @returns A function that can be used as a JSON.stringify replacer
 * 
 * @example
 * JSON.stringify(obj, circularReplacer());
 */
export const circularReplacer = (allowOne = false) => {
  const seen = new WeakSet();
  let isFirstCircularRef = allowOne;
  
  return (key: unknown, value: unknown) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return isFirstCircularRef ? (isFirstCircularRef = false, value) : null;
      }
      seen.add(value);
    }
    return value;
  };
}

/**
 * Removes circular references from an object, optionally allowing one level of circular reference.
 * @param {object} obj - The object from which to remove circular references.
 * @param {boolean} [allowOne=false] - If true, allows one circular reference, replacing further duplicates with null.
 * @returns {object} A new object with circular references removed.
 *
 * @example
 * const obj = { name: "Alice", friend: {} };
 * obj.friend = obj; // Circular reference.
 * const safeObj = removeCircularReferences(obj);
 * console.log(safeObj); // Outputs the object without throwing errors due to circular references.
 */
export const removeCircularReferences = (obj: object, allowOne = false): object => {
  return JSON.parse(JSON.stringify(obj, circularReplacer(allowOne))) as object;
}

/**
 * Merges multiple objects or arrays of objects into a single object or an array of merged objects.
 * @param {...(object|object[])} objects - The objects or arrays of objects to merge.
 * @returns {object|object[]} The merged object or array of merged objects.
 * @example
 * mergeObjects({ a: 1, b: 2, }, { b: 3, c: 4 }, { c: 5, d: 6 });
 * // Returns: { a: 1, b: 3, c: 5, d: 6 }
 * @example
 * mergeObjects([{ a: 1, b: 2, d: 3 }, { c: 3 }, { c: 6, d: 7 }, { e: 8 }]);
 * // Returns: { a: 1, b: 2, c: 6, d: 7, e: 8 }
 * @example
 * mergeObjects([{ a: 1, b: 2, d: 3 }, { c: 3 }], [{ c: 6, d: 7 }, { e: 8 }]);
 * // Returns: [{ a: 1, b: 2, c: 3 }, { c: 6, d: 7, e: 8 }]
 */
export const mergeObjects = (...objects: (object | object[])[]): object | object[] => {
  // Check if the first argument is an array of objects
  const isArrayMode = objects.every(Array.isArray);

  if (isArrayMode) {
    // Map through each array and merge its objects
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return objects.map(array => array.reduce((acc, cur) => ({ ...acc, ...cur }), {})) as object;
  }

  // Merge all objects into a single object
  return objects.reduce((acc, cur) => ({ ...acc, ...cur }), {});
};

/**
 * Deeply freezes an object, making it immutable. This method recursively freezes all properties 
 * of the object, including nested objects and functions.
 * 
 * @template T
 * @param {T} obj - The object to freeze.
 * @returns {Readonly<T>} The deeply frozen object.
 * 
 * @example
 * const obj = { name: "Alice", friend: { name: "Bob" } };
 * const frozenObj = deepFreeze(obj);
 * frozenObj.name = "Alice"; // Throws a TypeError in strict mode
 * frozenObj.friend.name = "Bob"; // Throws a TypeError in strict mode
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
 */
export const deepFreeze = <T extends object>(obj: T): Readonly<T> => {
  // Retrieve the property names defined on object
  const propNames = Reflect.ownKeys(obj) as Array<keyof T>;

  // Freeze properties before freezing self
  for (const name of propNames) {
    const value = obj[name];

    // Recursively freeze if value is an object or function
    if ((value && typeof value === "object") || typeof value === "function") {
      deepFreeze(value as T);
    }
  }

  // Freeze and return the original object
  return Object.freeze(obj);
};

/**
 * Checks if an object has a property as its own (not inherited from the prototype chain).
 * This function provides a safe check for object properties, including those
 * that may conflict with properties of `Object.prototype`.
 * 
 * @param {object} obj The object to check.
 * @param {PropertyKey} prop The property key to check for. Can be a string, symbol, or number.
 * @returns {boolean} `true` if the property is an own property of the object, `false` otherwise.
 * 
 * @example <caption>Using `hasOwn` with an object</caption>
 * const myObj = { name: 'John' };
 * console.log(hasOwn(myObj, 'name')); // true
 * console.log(hasOwn(myObj, 'toString')); // false
 *
 * @example <caption>Using `hasOwn` with an array</caption>
 * const myArray = ['apple', 'banana', 'cherry'];
 * console.log(hasOwn(myArray, 1)); // true
 * console.log(hasOwn(myArray, 'length')); // false
 */
export function hasOwn(obj: object, prop: PropertyKey): boolean {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/**
 * Inlined Object.is polyfill to avoid requiring consumers ship their own. See notes on `is`
 * @note
 * The Object.is method in JavaScript determines whether two values are the same value. It has
 * similar behavior to the strict equality (===) operator, but with some differences.
 * 
 * When comparing objects using Object.is or ===, it checks whether the two operands refer to the
 * exact same object -- not just two objects with identical properties. In JavaScript, objects are
 * reference types. This means that each time you create an object, it's a completely new entity,
 * even if its contents are identical to another object.
 * 
 * @example
 * //* Example where Object.is with objects would return false
 * const obj = {};
 * console.log(Object.is(obj, {})) // false
 * 
 * When you write Object.is(obj, {}), it's comparing two different objects: one is obj, and the
 * other is a new object you just created ({}). Since they are not the same instance, Object.is
 * returns false.
 * 
 * @example
 * // Similar example where Object.is with objects would return true
 * const obj1 = {};
 * const obj2 = obj1;
 * console.log(Object.is(obj1, obj2)); // true
 * at the bottom of this file.
 * 
 * @url https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
export const is = typeof Object.is === 'function'
  ? Object.is
  : function (x: unknown, y: unknown) {
      // SameValue algorithm
      if (x === y) {
        // Steps 1-5, 7-10
        // Steps 6.b-6.e: +0 != -0
        // Added the nonzero y check to make Flow happy, but it is redundant
        return x !== 0 || y !== 0 || 1 / x === 1 / y;
      }
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    };

/**
 * Clones an object deeply, handling circular references, functions, built-in objects, and preserving the prototype chain.
 *
 * @template T - The type of the object to clone.
 * @param {T} obj - The object to clone.
 * @returns {T} A deep clone of the input object, with circular references preserved, and the prototype chain copied.
 *
 * @example
 * const obj = {
 *   name: 'Alice',
 *   age: 30,
 *   birthdate: new Date(1990, 0, 1),
 *   friends: [
 *     { name: 'Bob', age: 25 },
 *     { name: 'Charlie', age: 28 },
 *   ],
 *   circular: {}, // Creating a circular reference
 * };
 * obj.circular = obj; // Establishing a circular reference
 *
 * const clone = deepClone(obj);
 * console.log(clone);
 * // Output: {
 * //   name: 'Alice',
 * //   age: 30,
 * //   birthdate: 1990-01-01T00:00:00.000Z,
 * //   friends: [
 * //     { name: 'Bob', age: 25 },
 * //     { name: 'Charlie', age: 28 },
 * //   ],
 * //   circular: [Circular], // Circular reference is preserved
 * // }
 */
export function deepClone<T>(obj: T): T {
  // Handle non-object values
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Handle Date objects
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }

  // Handle RegExp objects
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags) as unknown as T;
  }

  // Handle Maps
  if (obj instanceof Map) {
    const map = new Map();
    for (const [key, value] of obj.entries()) {
      map.set(deepClone(key), deepClone(value));
    }
    return map as unknown as T;
  }

  // Handle Sets
  if (obj instanceof Set) {
    const set = new Set();
    for (const value of obj.values()) {
      set.add(deepClone(value));
    }
    return set as unknown as T;
  }

  // Handle Arrays
  if (Array.isArray(obj)) {
    return obj.map(deepClone) as unknown as T;
  }

  // Handle Objects
  const clone: Record<string, unknown> = {};
  const visited = new WeakSet();

  // Function to handle circular references
  const cloneObject = (obj: object) => {
    if (visited.has(obj)) {
      return obj; // Return the original object for circular references
    }
    visited.add(obj);

    // Clone each property
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = (obj as Record<string, unknown>)[key];
        clone[key] = deepClone(value);
      }
    }

    // Copy the prototype chain
    const proto = Object.getPrototypeOf(obj) as object | null;
    if (proto !== null && proto !== Object.prototype) {
      Object.setPrototypeOf(clone, proto);
    }

    return clone;
  };

  return cloneObject(obj) as unknown as T;
}

/**
 * Creates a deep clone of an object using JSON.parse and JSON.stringify, with an option to handle circular references.
 *
 * @param {object} obj - The object to clone.
 * @param {boolean} [allowOne=false] - If true, allows one circular reference, replacing further duplicates with null.
 * @returns {object} A deep clone of the input object, with circular references handled based on the `allowOne` option.
 *
 * @example
 * const obj = {
 *   name: 'Alice',
 *   age: 30,
 *   circular: {}, // Creating a circular reference
 * };
 * obj.circular = obj; // Establishing a circular reference
 *
 * const cloneWithoutCircular = jsonDeepClone(obj);
 * console.log(cloneWithoutCircular);
 * // Output: { name: 'Alice', age: 30, circular: null }
 *
 * const cloneWithCircular = jsonDeepClone(obj, true);
 * console.log(cloneWithCircular);
 * // Output: { name: 'Alice', age: 30, circular: [Circular] }
 */
export const jsonDeepClone = (obj: object, allowOne = false): object => {
  return JSON.parse(JSON.stringify(obj, circularReplacer(allowOne))) as object;
};