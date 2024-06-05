import { type RefObject, createRef, useState } from "react";

/**
 * A custom hook for managing an array of refs dynamically in React.
 *
 * @template T - The type of the elements to be referenced.
 * @param {number} initialSize - The initial size of the refs array.
 * @returns {[React.RefObject<T>[], (index: number) => void]} An array containing the refs array and a function to update a ref at a specific index.
 *
 * @example
 * const MyComponent = () => {
 *   const [refs, setRef] = useRefs<HTMLDivElement>(3);
 *
 *   return (
 *     <div>
 *       {Array.from({ length: 3 }).map((_, index) => (
 *         <div key={index} ref={setRef(index)}>
 *           Element {index + 1}
 *         </div>
 *       ))}
 *     </div>
 *   );
 * };
 */
export const useRefs = <T>(initialSize: number): [RefObject<T>[], (index: number) => void] => {
  const [refs, setRefs] = useState<RefObject<T>[]>(
    Array.from({ length: initialSize }, () => createRef<T>())
  );

  const setRef = (index: number) => (ref: T | null) => {
    setRefs((prevRefs) => {
      const newRefs = [...prevRefs];
      newRefs[index] = { current: ref } as RefObject<T>;
      return newRefs;
    });
  };

  return [refs, setRef];
}