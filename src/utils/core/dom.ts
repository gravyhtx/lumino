// ~/utils/core/dom.ts
import type { MutableRefObject, Ref, RefCallback } from "react";

/**
 * Combines multiple class names into a single string and filters out any undefined values.
 *
 * @param {...(string | undefined)[]} classes - An array of class names, which can include undefined values.
 * @returns {string} A single string containing all provided class names, separated by spaces.
 * @example
 * const className = classnames('btn', isActive ? 'active' : undefined); // 'btn active' if isActive is true, otherwise 'btn'
*/
export const classnames = (...classes: (string | undefined)[]): string => classes.filter(Boolean).join(" ");

/**
 * Merge multiple refs into a single ref callback function.
 *
 * This function accepts multiple refs (either React ref callbacks or ref objects)
 * and returns a single callback function that updates all provided refs when called.
 *
 * @template T - The type of the element to which the refs refer.
 * @param {...Array<MutableRefObject<T>|RefCallback<T>>} refs - The refs to merge.
 * @returns {RefCallback<T>} A callback function that updates all provided refs.
 *
 * @example
 * const Component = () => {
 *   const ref1 = useRef<HTMLDivElement>(null);
 *   const ref2 = useRef<HTMLDivElement>(null);
 *   const callbackRef = useCallback((node: HTMLDivElement) => {
 *     // Do something with the node
 *   }, []);
 *
 *   return <div ref={mergeRefs(ref1, ref2, callbackRef)}>...</div>;
 * };
 */
export function mergeRefs<T extends HTMLElement>(...refs: Array<MutableRefObject<T> | RefCallback<T>>): RefCallback<T> {
  return (node: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref && node !== null) {
        ref.current = node;
      }
    });
  };
}

/**
 * Sets the value of a ref.
 * @param ref - The ref object.
 * @param value - The value to set for the ref.
 * @example
 * const ref = useRef(null);
 * setRef(ref, element);
 */
export function setRef<T>(ref: Ref<T> | undefined, value: T): void {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref != null && 'current' in ref) {
    (ref as MutableRefObject<T | null>).current = value;
  }
}