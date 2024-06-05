import { useCallback, useState } from 'react';
import { stateChanger } from './utils';

/**
 * Custom React hook that provides a callback function to force a component to re-render.
 * This can be useful in scenarios where a component needs to update its view due to changes
 * outside of the usual data flow, such as during certain animations or after receiving messages
 * from non-React event sources.
 *
 * @returns {() => void} A callback function that when called, will trigger a re-render of the component.
 *
 * @example
 * const App = () => {
 *   const rerender = useRerender();
 *
 *   const handleOutsideEvent = () => {
 *     // Suppose this is triggered by a non-React event source,
 *     // and you need to update the UI.
 *     rerender();
 *   };
 *
 *   useEffect(() => {
 *     someExternalModule.on('event', handleOutsideEvent);
 *     return () => {
 *       someExternalModule.off('event', handleOutsideEvent);
 *     };
 *   }, []);
 *
 *   return (
 *     <div>
 *       Time: {new Date().toLocaleTimeString()}
 *       <button onClick={rerender}>Refresh</button>
 *     </div>
 *   );
 * };
 */
export function useRerender(): () => void {
    const [, setState] = useState<number>(0);

    return useCallback(() => {
        setState(stateChanger);
    }, []);
}
