import { useState, useCallback, useEffect } from 'react';

/**
 * A custom React hook to cycle through an array of items or a range of numbers, 
 * with optional auto-cycling, transformation, and filtering capabilities.
 * 
 * @param items - An array of items to cycle through, or a number to generate an array of integers [0, ..., items-1].
 * @param interval - Optional. The auto-cycle interval in milliseconds.
 * @param reverse - Optional. If true, cycles in reverse order.
 * @param transform - Optional. A function to transform the current item.
 * @param filter - Optional. A function to filter items.
 * @returns An object containing the current item and functions to manually cycle to the next or previous item.
 * 
 * @example
 * // Basic cycling with interval
 * const { currentItem, next, prev } = useCycle({ items: ['a', 'b', 'c'], interval: 1000 });
 * // currentItem will auto-cycle through 'a', 'b', 'c' every 1000ms.
 * 
 * @example
 * // Cycling with filtering and transforming items
 * const { currentItem } = useCycle({
 *   items: [1, 2, 3, 4, 5],
 *   filter: num => num % 2 === 0, // filter even numbers
 *   transform: num => num * 10   // multiply each item by 10
 * });
 * // currentItem will cycle through 20, 40.
 * 
 * @example
 * // Cycling in reverse order
 * const { currentItem } = useCycle({
 *   items: ['first', 'second', 'third'],
 *   reverse: true
 * });
 * // Starts with 'third', moves to 'second', then 'first'.
 * 
 * @example
 * // Generate and cycle through a range of numbers
 * const { currentItem } = useCycle({ items: 5 }); // Generates an array [0, 1, 2, 3, 4] // currentItem will cycle through 0, 1, 2, 3, 4.
 * console.log(currentItem); // Output: 0
 */
export function useCycle<T>(
  items: T[] | number,
  opts: {
    interval?: number,
    reverse?: boolean,
    transform?: (item: T) => T,
    filter?: (item: T) => boolean,
  } = {}
) {
  const { interval, reverse, transform, filter } = opts;

  if (typeof items === 'number') {
    items = Array.from({ length: items }, (_, i) => i as unknown as T) // Normalize input to an array
  }
    
  const filteredItems = filter ? items.filter(filter) : items;
  const [index, setIndex] = useState(0);

  // Handler to move to the next item
  const next = useCallback(() => {
    setIndex((prevIndex) => {
      const nextIndex = reverse ? prevIndex - 1 : prevIndex + 1;
      return (nextIndex + filteredItems.length) % filteredItems.length;
    });
  }, [reverse, filteredItems.length]);

  // Handler to move to the previous item
  const prev = useCallback(() => {
    setIndex((prevIndex) => {
      const nextIndex = reverse ? prevIndex + 1 : prevIndex - 1;
      return (nextIndex + filteredItems.length) % filteredItems.length;
    });
  }, [reverse, filteredItems.length]);

  // Automatically cycle through items if an interval is provided
  useEffect(() => {
    if (interval) {
      const id = setInterval(next, interval);
      return () => clearInterval(id);
    }
  }, [interval, next]);

  // Get the current item and apply transformation if provided
  const currentItem = filteredItems[index];
  const transformedItem = transform ? transform(currentItem as T) : currentItem;

  return { currentItem: transformedItem, next, prev };
}