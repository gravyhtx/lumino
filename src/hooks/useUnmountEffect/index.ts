import { useEffect } from 'react';
import { useSyncedRef } from '../useSyncedRef';

/**
 * A custom hook that runs a cleanup effect only when the component unmounts.
 * This is useful for performing cleanup tasks such as removing event listeners,
 * canceling network requests, or invalidating timers that should only be disposed
 * of right before the component lifecycle ends.
 *
 * @param effect - A function that contains cleanup logic to be executed upon component unmount.
 * 
 * @example
 * function TimerComponent() {
 *   useUnmountEffect(() => {
 *     const timerId = setTimeout(() => console.log("Timer done!"), 1000);
 *
 *     // This will clear the timeout when the component unmounts, preventing the log
 *     // if the component unmounts before 1000ms.
 *     return () => clearTimeout(timerId);
 *   });
 *
 *   return <div>Check console after component is removed!</div>;
 * }
 * 
 * function App() {
 *  const [showTimer, setShowTimer] = useState(true);
 * 
 *   return (
 *     <div>
 *       {showTimer ? <TimerComponent /> : null}
 *       <button onClick={() => setShowTimer(!showTimer)}>Toggle Timer</button>
 *     </div>
 *   );
 * }
 */
export function useUnmountEffect(callback: () => void): void {
    const effectRef = useSyncedRef(callback);

    useEffect(() => () => {
        effectRef.current();
    }, []);
}
