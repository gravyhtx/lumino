/**
 * Based on `shallowEqual` function by Facebook, Inc.
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * @providesModule shallowEqual
 * @typechecks
 */

import { hasOwn, is } from "./polyfills";

/* eslint-disable no-self-compare */

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