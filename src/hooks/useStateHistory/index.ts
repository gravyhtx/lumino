import { useCallback, useState } from 'react';

// type UseStateHistoryProps<T> = {
//   items: T[] | number;
//   interval?: number;
//   reverse?: boolean;
//   transform?: (item: T) => T;
//   filter?: (item: T) => boolean;
// };

/**
 * Custom hook for managing state with history. This includes the ability to navigate to specific points in the history.
 *
 * @param initialState The initial state.
 * @param options Configuration options including `limit` for the maximum number of history entries.
 * @returns An object containing the current state, setState function, functions to navigate the history, and direct access functions to navigate to any index or move steps forward or back.
 *
 * @example
 * const { state, setState, next, previous, goToIndex, stepForward, stepBackward, history } = useStateHistory(0, { limit: 10 });
 * setState(1); // Update state to 1
 * setState(2); // Update state to 2
 * previous(); // Go back to 1
 * next(); // Go forward to 2
 * goToIndex(0); // Jump to the first state
 * stepForward(2); // Move two steps forward in history
 * stepBackward(1); // Move one step back in history
 */
function useStateHistory<T>(initialState: T, options?: { limit?: number }) {
  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState<T[]>([initialState]);

  const setState = useCallback((newState: T) => {
    setHistory((prevHistory) => {
      const updatedHistory = prevHistory.slice(0, index + 1).concat(newState);
      if (options?.limit && updatedHistory.length > options.limit) {
        return updatedHistory.slice(updatedHistory.length - options.limit);
      }
      return updatedHistory;
    });
    setIndex((prevIndex) => prevIndex + 1);
  }, [index, options?.limit]);

  const goToIndex = useCallback((targetIndex: number) => {
    if (targetIndex < 0 || targetIndex >= history.length) {
      console.warn('Index out of bounds');
      return;
    }
    setIndex(targetIndex);
  }, [history.length]);

  const stepForward = useCallback((steps = 1) => {
    setIndex((prevIndex) => Math.min(prevIndex + steps, history.length - 1));
  }, [history.length]);

  const stepBackward = useCallback((steps = 1) => {
    setIndex((prevIndex) => Math.max(prevIndex - steps, 0));
  }, []);

  return {
    state: history[index],
    setState,
    history,
    index,
    next: () => stepForward(),
    previous: () => stepBackward(),
    goToIndex,
    stepForward,
    stepBackward
  };
}

export default useStateHistory;
