// Inspired by https://github.com/react-hookz/
import { useEffect } from 'react';
import { isBrowser, noop } from '~/utils/siteFunctions';

type VibratePattern = number | number[];

/**
 * A custom hook that provides vibration feedback using the Vibration API available in modern browsers.
 * It allows for simple vibration or pattern-based vibration, with an optional loop functionality.
 *
 * @param enabled - Controls whether the vibration is active.
 * @param pattern - Defines the vibration pattern as a single number or an array of numbers representing
 *                  the duration of the vibration and the interval between vibrations.
 * @param loop - If true, the vibration pattern will repeat continuously until disabled.
 * 
 * @example
 * const ExampleComponent = () => {
 *   const [vibrateEnabled, setVibrateEnabled] = useState(false);
 *   const toggleVibration = () => setVibrateEnabled(!vibrateEnabled);
 * 
 *   // Use the hook to vibrate for 500ms; no loop.
 *   useVibrate(vibrateEnabled, 500);
 * 
 *   // Use the hook with a pattern [500ms vibrate, 1000ms pause], with loop.
 *   useVibrate(vibrateEnabled, [500, 1000], true);
 * 
 *   return (
 *     <button onClick={toggleVibration}>
 *       {vibrateEnabled ? 'Stop Vibration' : 'Start Vibration'}
 *     </button>
 *   );
 * };
 */
export const useVibrate = 
  !isBrowser || typeof navigator.vibrate === 'undefined'
    ? noop
    : (enabled: boolean, pattern: VibratePattern, loop?: boolean): void => {
      useEffect(() => {
        let interval: NodeJS.Timeout | undefined;

        if (enabled) {
          navigator.vibrate(pattern);

          if (loop) {
            const intervalTime = Array.isArray(pattern)
              ? pattern.reduce((total, duration) => total + duration, 0)
              : pattern;

            interval = setInterval(() => navigator.vibrate(pattern), intervalTime);
          }

          return () => {
            navigator.vibrate(0);
            if (interval) clearInterval(interval);
          };
        }
    }, [enabled, pattern, loop]);
  };
