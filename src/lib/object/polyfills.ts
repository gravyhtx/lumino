/**
 * Checks if an object has a property as its own (not inherited from the prototype chain).
 * This function provides a safe check for object properties, including those
 * that may conflict with properties of `Object.prototype`.
 * 
 * @param {object} obj - The object to check.
 * @param {PropertyKey} prop - The property key to check for. Can be a string, symbol, or number.
 * @returns {boolean} - `true` if the property is an own property of the object, `false` otherwise.
 * 
 * @example
 * //* Using hasOwn with an object
 * const myObj = { name: 'John' };
 * console.log(hasOwn(myObj, 'name')); // true
 * console.log(hasOwn(myObj, 'toString')); // false
 *
 * @example
 * //* Using hasOwn with an array
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
 * //* Similar example where Object.is with objects would return true
 * const obj1 = {};
 * const obj2 = obj1;
 * console.log(Object.is(obj1, obj2)); // true
 * at the bottom of this file.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
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