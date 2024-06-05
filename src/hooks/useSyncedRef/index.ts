// Inspired by https://github.com/react-hookz/
import { useMemo, useRef } from 'react';

/**
 * Custom hook that creates a synchronized and immutable reference object for a given value.
 * Unlike `useRef`, which may have a stale closure issue in some scenarios, `useSyncedRef` always
 * provides the most current value via a `current` property, similar to how `ref` works in class components.
 * The returned object is immutable to ensure that consumers of the hook do not modify it.
 *
 * @template T - The type of the value to be stored in the ref.
 * @param {T} value - The value to be stored and kept in sync within the ref.
 * @returns {{ readonly current: T }} An object with a single `current` property that
 *         provides read-only access to the latest value.
 *
 * @example
 * function Component() {
 *   const [count, setCount] = useState(0);
 *   const countRef = useSyncedRef(count);
 *
 *   useEffect(() => {
*      setTimeout(() => {
*        // This will always log the current count, even if it has updated since the timeout was set.
*        console.log(countRef.current);
*      }, 1000);
 *   }, []);
 *
 *   return (
*      <div>
*        {count}
*        <button onClick={() => setCount(c => c + 1)}>Increment</button>
*      </div>
 *   );
 * }
 */
export function useSyncedRef<T>(value: T): { readonly current: T } {
  const ref = useRef(value);

  // Update the current ref value on each render
  ref.current = value;

  // useMemo to create a stable reference to an object with a getter for the current value
  return useMemo(() => Object.freeze({
    get current() {
      return ref.current;
    },
  }), []);
}