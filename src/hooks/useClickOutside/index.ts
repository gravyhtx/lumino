import { useEffect, type RefObject } from 'react';

/**
 * A React hook that triggers a callback when a click or touch event is detected outside of the specified element.
 * This is particularly useful for closing modal windows, dropdown menus, or resetting certain UI elements
 * when the user interacts outside of specific areas.
 *
 * @template T The HTMLElement type that the ref corresponds to.
 * @param {RefObject<T>} ref - React ref object linked to the target element to monitor.
 * @param {(event: MouseEvent | TouchEvent) => void} callback - Callback function to execute when an outside click is detected.
 *
 * @example
 * const MyComponent = () => {
 *   const ref = useRef<HTMLDivElement>(null);
 *   useClickOutside(ref, () => {
 *     console.log('Clicked outside the component');
 *   });
 *
 *   return <div ref={ref}>Click outside me!</div>;
 * };
 */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  callback: (event: MouseEvent | TouchEvent) => void
): void {
  useEffect(() => {
    // Event handler to call the callback if the click is outside the referenced element
    const handleClickOutside = (event: MouseEvent | TouchEvent): void => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      callback(event);
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    // Clean up the event listeners on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, callback]); // Ensures effect re-binds if ref or callback changes
}
