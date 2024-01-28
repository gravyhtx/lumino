
import { useState, useEffect } from 'react';

/**
 * Custom React Hook to check if the browser tab is currently in view.
 *
 * @returns {boolean} - True if the tab is in view, false otherwise.
 *
 * @example
 * const isTabInView = useTabInView();
 * console.log(isTabInView); // Outputs: true or false
 */
export const useTabInView = () => {
  const [isInView, setIsInView] = useState(!document.hidden);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsInView(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return isInView;
};