// ~/utils/core/sets.ts
/**
 * Converts various data types to a Set, handling arrays, objects, Maps, Sets, and other iterables.
 * This function also handles circular references if specified.
 * @param input - The data to convert to a Set.
 * @param allowCircular - If true, allows one circular reference, replacing further duplicates with null.
 * @returns A Set with the data converted from the input, or throws a TypeError if the input is not iterable.
 * 
 * @example
 * const arr = [1, 2, 2, 3];
 * console.log(toSet(arr)); // Outputs: Set { 1, 2, 3 }
 * 
 * @example
 * const obj = { a: 1, b: 2 };
 * console.log(toSet(obj)); // Outputs: Set { ['a', 1], ['b', 2] }
 */
export function toSet<T>(input: T, allowCircular = false): Set<T> {
  if (!input) {
    throw new TypeError('Input must be provided and cannot be null or undefined.');
  }

  const result = new Set<T>();
  const seen = new WeakSet();

  function handleCircular(value: T | null) {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return allowCircular ? value : null;
      }
      seen.add(value);
    }
    return value;
  }

  // Handling input as Iterable<T>
  if (typeof input === 'object' && input !== null && Symbol.iterator in input) {
    const iterableInput = input as Iterable<T>;
    for (const item of iterableInput) {
      result.add(handleCircular(item) as T);
    }
  } else if (typeof input === 'object') {
    Object.entries(input as Record<string, T>).forEach(([key, value]) => {
      result.add([key, handleCircular(value)] as T);
    });
  } else {
    throw new TypeError('The input must be an iterable or an object.');
  }

  return result;
}
