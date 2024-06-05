import { useCallback } from 'react';

export type ValueGenerator<T> = (key: T) => number;

/**
 * Custom hook for various data manipulations on arrays and objects.
 * 
 * @param data - The array or object to operate on.
 * @param shouldClone - Whether to deep clone the original data (default: true).
 * @returns - An object with utility functions.
 * @throws - Throws an error if the input data is not an array or an object.
 * 
 * @example
 * const data = [1, 2, 3, 4, 5];
 * const dataHandler = useData(data);
 * 
 * // Map the data
 * const mappedData = dataHandler.map(num => num * 2);
 * console.log(mappedData.data); // Output: [2, 4, 6, 8, 10]
 * 
 * // Filter the data
 * const filteredData = dataHandler.filter(num => num % 2 === 0);
 * console.log(filteredData.data); // Output: [2, 4]
 * 
 * // Aggregate the data
 * const sum = dataHandler.aggregate((acc, num) => acc + num, 0);
 * console.log(sum); // Output: 15
 */
export function useData<T>(
  originalData: T[] | Record<string, T> | Map<PropertyKey, T> | Set<T> | null | undefined,
  shouldClone = true
) {
  if (!originalData) {
    throw new Error('Input data cannot be null or undefined');
  }

  if (!Array.isArray(originalData) && !isPlainObject(originalData) && !(originalData instanceof Map) && !(originalData instanceof Set)) {
    throw new Error('Input data must be an array, an object, a Map, or a Set');
  }

  const data = shouldClone ? deepClone(originalData) : originalData;

  function isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && value.constructor === Object;
  }

  function isRecord(value: T[] | Record<string, T> | Map<PropertyKey, T> | Set<T>): value is Record<string, T> {
    return !Array.isArray(value) && !isPlainObject(value) && !(value instanceof Map) && !(value instanceof Set);
  }

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
        return value as T;
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
   * const randomNumberGenerator: ValueGenerator<string> = (key) => Math.floor(Math.random() * 28);
   * const randomMonthsData = dataHandler.processKeys(['Jan', 'Feb', 'Mar'], randomNumberGenerator);
   * console.log(randomMonthsData); // Outputs random numbers for each month
   * 
   * @example
   * const dataHandler = useData({ a: 'one', b: [1, 2, 3], c: () => console.log('three') });
   * const processedData = dataHandler.processKeys(['a', 'b', 'c'], key => key.length);
   * console.log(processedData); // Outputs: { a: 3, b: 1, c: 1 }
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
   * Maps each element in an array or object to a new structure defined by a callback function.
   *
   * @template U - The type of the elements after mapping.
   * @param {(item: T, key: string) => U} fn - The mapping function.
   * @returns {U[]} - An array of mapped elements.
   *
   * @example
   * const data = [1, 2, 3];
   * const { map } = useData(data);
   * const mapped = map(num => num * 2);
   * console.log(mapped); // Outputs: [2, 4, 6]
   *
   * @example
   * const data = { a: 1, b: 2, c: 3 };
   * const { map } = useData(data);
   * const mapped = map((value, key) => `${key}-${value}`);
   * console.log(mapped); // Outputs: ['a-1', 'b-2', 'c-3']
   */
  const map = useCallback(<U extends T>(fn: (item: T, key: string) => U): U[] => {
    if (Array.isArray(data)) {
      return (data as unknown as U[]).map((item, index) => fn(item, index.toString()));
    } else if (typeof data === 'object' && data !== null) {
      return Object.entries(data).map(([key, value]) => fn(value as T, key));
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
    return values.sort(compareFn) as T[];
  }, [data]);

  /**
   * Groups an array of objects by a specified key.
   *
   * @template T - The type of objects in the array.
   * @template K - The type of the key used for grouping.
   * @param {T[]} data - The array of objects to group.
   * @param {(item: T) => K} keyGetter - A function that takes an object and returns the key to group by.
   * @returns {Map<K, T[]>} - A Map where the keys are the group keys, and the values are arrays of objects in that group.
   *
   * @example
   * const people = [
   *   { name: 'Alice', age: 25, city: 'New York' },
   *   { name: 'Bob', age: 30, city: 'London' },
   *   { name: 'Charlie', age: 35, city: 'New York' },
   *   { name: 'David', age: 40, city: 'London' },
   * ];
   * const { group } = useData(data);
   * const groupByCity = group(people, person => person.city);
   * console.log(groupByCity);
   * // Output: Map {
   * //   'New York' => [
   * //     { name: 'Alice', age: 25, city: 'New York' },
   * //     { name: 'Charlie', age: 35, city: 'New York' }
   * //   ],
   * //   'London' => [
   * //     { name: 'Bob', age: 30, city: 'London' },
   * //     { name: 'David', age: 40, city: 'London' }
   * //   ]
   * // }
   */
  const group = useCallback(<K extends PropertyKey>(
    keyGetter: (item: T) => K
  ): Map<K, T[]> => {
    const values = Array.isArray(data) ? data : Object.values(data);
    const result = new Map<K, T[]>();

    for (const item of values) {
      const key = keyGetter(item as T);
      const group = result.get(key) ?? [];
      group.push(item as T);
      result.set(key, group);
    }

    return result;
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
   * @param {(item: T) => boolean} predicate - The predicate function.
   * @returns {T[]} - An array of filtered data.
   * @example
   * const data = [1, 2, 3, 4];
   * const { filter } = useData(data);
   * const evenNumbers = filter(num => num % 2 === 0);
   * console.log(evenNumbers); // Outputs: [2, 4]
  */
  const filter = useCallback((predicate: (item: T) => boolean): T[] => {
    const values = Array.isArray(data) ? data : Object.values(data);
    return values.filter(predicate) as T[];
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
    if (isRecord(data)) {
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
  const aggregate = useCallback(<U>(reducer: (accumulator: U, currentValue: T) => U, initialValue: U): U => {
    const values = Array.isArray(data) ? data : Object.values(data);
    return values.reduce(reducer, initialValue) as U;
  }, [data]);

  /**
   * Converts the input data to a Set.
   * @returns {Set<T>} - A Set created from the input data.
   *
   * @example
   * const data = [1, 2, 3, 2, 1];
   * const { toSet } = useData(data);
   * const dataSet = toSet();
   * console.log(dataSet); // Output: Set { 1, 2, 3 }
   */
  const toSet = useCallback(() => {
    const values = Array.isArray(data) ? data : Object.values(data);
    return new Set(values);
  }, [data]);

  /**
   * Converts the input data to a Map.
   * @returns {Map<string, T>} - A Map created from the input data.
   *
   * @example
   * const data = { a: 1, b: 2, c: 3 };
   * const { toMap } = useData(data);
   * const dataMap = toMap();
   * console.log(dataMap); // Output: Map { 'a' => 1, 'b' => 2, 'c' => 3 }
   */
  const toMap = useCallback(() => {
    if (Array.isArray(data)) {
      return new Map(data.map((value, index) => [index.toString(), value]));
    } else if (typeof data === 'object' && data !== null) {
      return new Map(Object.entries(data));
    }
    return new Map();
  }, [data]);
  
  const chain = {
    data: data,
    deepClone: () => deepClone(data),
    firstValid: () => firstValid(),
    map: (fn: (item: T) => T) => useData(map(fn), true),
    sort: (compareFn?: (a: T, b: T) => number) => useData(sort(compareFn), true),
    keys: () => useData(keys(), true),
    filter: (predicate: (item: T) => boolean) => useData(filter(predicate), true),
    pluckKeys: (keysToPluck: string[]) => useData(pluckKeys(keysToPluck), true),
    aggregate: <U>(reducer: (accumulator: U, currentValue: T) => U, initialValue: U) => aggregate(reducer, initialValue),
    processKeys: (keys: string[], operations: number[] | ValueGenerator<string>) => processKeys(keys, operations),
    group: <K extends PropertyKey>(keyGetter: (item: T) => K) => useData(group(keyGetter), true),
    toSet: () => useData(toSet(), true),
    toMap: () => useData(toMap(), true),
  };

  return chain;
}