import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

/**
 * Custom hook to measure the dimensions of a container.
 *
 * @returns a tuple where the first element is a ref to be attached to the element to be measured,
 *          and the second element is an object containing the width and height of the element.
 * 
 * @example
 * const [ref, dimensions] = useContainerDimensions();
 * 
 */

export const useContainerDimensions = (): [RefObject<HTMLElement>, { width: number; height: number }] => {
  const ref = useRef<HTMLElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      setDimensions({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      });
    }
  }, [ref.current]);

  return [ref, dimensions];
};