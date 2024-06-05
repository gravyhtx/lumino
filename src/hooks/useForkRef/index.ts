import { useCallback } from 'react';

/**
 * A hook that merges multiple refs into a single ref.
 *
 * @template T - The type of the element that the refs point to.
 * @param {React.Ref<T>} refA - The first ref.
 * @param {React.Ref<T>} refB - The second ref.
 * @returns {React.RefCallback<T>} - A callback ref that updates both refs.
 * @example <caption>Using useForkRef to combine multiple refs</caption>
 * const MyComponent = React.forwardRef((props, ref) => {
 *   const localRef = React.useRef(null);
 *   const forkedRef = useForkRef(ref, localRef);
 *   return <div ref={forkedRef}>Hello</div>;
 * });
 */
export function useForkRef<T>(
  refA: React.Ref<T>,
  refB: React.Ref<T>
): React.RefCallback<T> {
  return useCallback(
    (refValue: T | null) => {
      if (typeof refA === 'function') {
        refA(refValue);
      } else if (refA) {
        (refA as React.MutableRefObject<T | null>).current = refValue;
      }

      if (typeof refB === 'function') {
        refB(refValue);
      } else if (refB) {
        (refB as React.MutableRefObject<T | null>).current = refValue;
      }
    },
    [refA, refB]
  );
}