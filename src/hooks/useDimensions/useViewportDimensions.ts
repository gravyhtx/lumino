import { useState, useEffect } from 'react';

/**
 * Custom hook to get the current viewport dimensions.
 *
 * @returns an object containing the width and height of the viewport.
 *
 * @example
 * const { width, height } = useViewportDimensions();
 */
export function useViewportDimensions() {
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    function handleResize() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return dimensions;
}