import { useCallback } from 'react';

type ValueGenerator<T> = (key: T) => number;

/**
 * Custom hook for various data manipulations on arrays and objects.
 * 
 * @param data - The array or object to operate on.
 * @returns - An object with utility functions.
 */
function useData<T>(originalData: T[] | Record<string, T>, shouldClone = false) {
  const data = shouldClone ? deepClone(originalData) : originalData;

  /**
   * Creates a deep clone of the given data.
   * 
   * @param {T} data - The data to clone.
   * @returns {T} - A deep clone of the data.
  */
  function deepClone<T>(data: T): T {
    // Type assertion is used here to inform TypeScript about the expected return type.
    return JSON.parse(JSON.stringify(data)) as T;
  }
  
  /**
   * Finds the first valid (truthy) item in an array or object.
   * 
   * @returns {T | undefined} - The first truthy item or undefined if none found.
   * @example
   * const data = [null, undefined, 0, 'Hello'];
   * const { firstValid } = useData(data);
   * console.log(firstValid()); // Outputs: 0
  */
  const firstValid = useCallback((): T | undefined => {
    const values = Array.isArray(data) ? data : Object.values(data);
    for (const value of values) {
      if (value || value === 0 || value === false) {
        return value;
      }
    }
    return undefined;
  }, [data]);

  /**
   * Custom hook for various data manipulations on arrays and objects.
   * 
   * @param {T[] | Record<string, T>} originalData - The array or object to operate on.
   * @param {boolean} [shouldClone=true] - Whether to deep clone the original data.
   * @returns An object with utility functions for data manipulation.
   * 
   * @example
   * const dataHandler = useData(['Jan', 'Feb', 'Mar']);
   * const monthsData = dataHandler.processKeys(['Jan', 'Feb', 'Mar'], [10, 20, 30]);
   * console.log(monthsData); // Outputs: { Jan: 10, Feb: 20, Mar: 30 }
   * 
   * @example
   * const randomNumberGenerator: ValueGenerator<string> = (key) => Math.floor(Math.random() * 100);
   * const randomMonthsData = dataHandler.processKeys(['Jan', 'Feb', 'Mar'], randomNumberGenerator);
   * console.log(randomMonthsData); // Outputs random numbers for each month
  */
  const processKeys = useCallback(<K extends string>(
    keys: K[],
    operations: number[] | ValueGenerator<K>
  ): Record<K, number> => {
    const result: Record<K, number> = {} as Record<K, number>;
  
    keys.forEach((key, index) => {
      let operationValue: number;
  
      if (Array.isArray(operations)) {
        // Ensuring operationValue is a number, providing a fallback if necessary.
        operationValue = operations[index % operations.length] ?? 0;
      } else {
        // Here we know operations is a function, so we directly assign its return value.
        operationValue = operations(key);
      }
  
      result[key] = operationValue;
    });
  
    return result;
  }, []);
  /**
   * Maps each element in an array to a new structure defined by a callback function.
   * 
   * @template U - The type of the elements after mapping.
   * @param {(item: T, index: number) => U} fn - The mapping function.
   * @returns {U[]} - An array of mapped elements.
   * @example
   * const data = [1, 2, 3];
   * const { map } = useData(data);
   * const doubled = map(num => num * 2);
   * console.log(doubled); // Outputs: [2, 4, 6]
  */
  const map = useCallback(<U>(fn: (item: T, index: number) => U): U[] => {
    if (Array.isArray(data)) {
      return data.map(fn);
    }
    return [];
  }, [data]);

  /**
   * Sorts an array or object values based on a comparison function.
   * @returns {T[]} - The sorted array or object values.
   * @example
   * const data = [3, 1, 2];
   * const { sort } = useData(data);
   * const sorted = sort((a, b) => a - b);
   * console.log(sorted); // Outputs: [1, 2, 3]
   * @example
   * const data = { a: 3, b: 1, c: 2 };
   * const { sort } = useData(data);
   * const sortedValues = sort((a, b) => a - b);
   * console.log(sortedValues); // Outputs: [1, 2, 3]
  */
  const sort = useCallback((compareFn?: (a: T, b: T) => number): T[] => {
    const values = Array.isArray(data) ? data : Object.values(data);
    return values.sort(compareFn);
  }, [data]);

  /**
   * Retrieves the keys or indices of an array or object.
   * @returns {string[]} - An array of keys or indices.
   * @example
   * const data = { a: 1, b: 2, c: 3 };
   * const { keys } = useData(data);
   * console.log(keys()); // Outputs: ['a', 'b', 'c']
   */
  const keys = useCallback((): string[] => {
    return Array.isArray(data) ? data.map((_, index) => index.toString()) : Object.keys(data);
  }, [data]);

  /**
   * Filters data based on a provided predicate function.
   * @example
   * const data = [1, 2, 3, 4];
   * const { filter } = useData(data);
   * const evenNumbers = filter(num => num % 2 === 0);
   * console.log(evenNumbers); // Outputs: [2, 4]
  */
  const filter = useCallback((predicate: (item: T) => boolean): T[] => {
    const values = Array.isArray(data) ? data : Object.values(data);
    return values.filter(predicate);
  }, [data]);

  /**
   * Extracts specific keys from an object. Does not apply to arrays.
   * @param {string[]} keysToPluck - The keys to extract.
   * @returns {Partial<Record<string, T>>} - An object with the extracted keys.
   * @example
   * const data = { name: 'Alice', age: 30, job: 'Developer' };
   * const { pluckKeys } = useData(data);
   * const nameAndJob = pluckKeys(['name', 'job']);
   * console.log(nameAndJob); // Outputs: { name: 'Alice', job: 'Developer' }
  */
  const pluckKeys = useCallback((keysToPluck: string[]): Partial<Record<string, T>> => {
    if (!Array.isArray(data) && typeof data === 'object') {
      const pluckedData: Partial<Record<string, T>> = {};
      keysToPluck.forEach(key => {
        if (key in data) {
          pluckedData[key] = data[key];
        }
      });
      return pluckedData;
    }
    return {};
  }, [data]);


  /**
   * Aggregates values using a reducer function.
   * @param {(accumulator: T, currentValue: T) => T} reducer - The reducer function.
   * @param {T} initialValue - The initial value of the accumulator.
   * @returns {T} - The aggregated value.
   * @example
   * const data = [1, 2, 3, 4];
   * const { aggregate } = useData(data);
   * const sum = aggregate((total, num) => total + num, 0);
   * console.log(sum); // Outputs: 10
  */
  const aggregate = useCallback((reducer: (accumulator: T, currentValue: T) => T, initialValue: T): T => {
    const values = Array.isArray(data) ? data : Object.values(data);
    return values.reduce(reducer, initialValue);
  }, [data]);

  const chain = {
    data: data,
    deepClone: () => deepClone(data),
    firstValid: () => firstValid(),
    map: (fn: (item: T) => unknown) => useData(map(fn)),
    sort: (compareFn?: (a: T, b: T) => number) => useData(sort(compareFn)),
    keys: () => useData(keys()),
    filter: (predicate: (item: T) => boolean) => useData(filter(predicate)),
    pluckKeys: (keysToPluck: string[]) => useData(pluckKeys(keysToPluck)),
    aggregate: (reducer: (accumulator: T, currentValue: T) => T, initialValue: T) => aggregate(reducer, initialValue),
    processKeys: (keys: string[], operations: number[] | ValueGenerator<string>) => processKeys(keys, operations),
  };

  return chain;
}

export default useData;