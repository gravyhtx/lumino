import { useEffect, useState } from "react";

/**
 * Custom hook that optionally executes a callback function when the component mounts and
 * provides a flag indicating whether the component has mounted.
 * This is useful for deferring actions until after the component is fully mounted to the DOM,
 * such as operations that depend on measurements or third-party library integrations.
 *
 * @param callback - Optional callback function to execute once upon component mount.
 * @returns {boolean} A boolean value indicating whether the component is mounted.
 *
 * @example
 * function MyComponent() {
 *   const { isMounted } = useMountEffect(() => {
 *     console.log('Component has mounted and this runs only once.');
 *   });
 *
 *   return <div>{isMounted ? 'I am mounted and ready!' : 'Mounting...'}</div>;
 * }
 */
export function useMountEffect(callback: () => void): boolean {
  const [isMounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    // Call the optional callback if it exists
    callback();
    setMounted(true);

    // No cleanup function is required here as this runs only once on mount
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  return isMounted;
}
