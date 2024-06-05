import { useEffect, type MutableRefObject } from "react";

/**
 * Custom React hook that sets up a MutationObserver to listen for changes to the DOM element specified by the ref.
 * This hook abstracts the setup and teardown process of the MutationObserver and invokes a callback
 * function in response to DOM mutations specified in the options parameter.
 *
 * @param ref - React ref object pointing to the target DOM element to observe.
 * @param callback - Function that executes in response to observed mutations. It receives a list of MutationRecords.
 * @param options - Configuration object for the MutationObserver specifying which DOM mutations to observe.
 *
 * @example
 * const FormInputObserver: React.FC = () => {
 *   const inputRef = useRef<HTMLInputElement>(null);
 * 
 *   useMutationObserver(inputRef, (mutations) => {
 *     mutations.forEach((mutation) => {
 *       if (mutation.type === 'attributes' && mutation.attributeName === 'value') {
 *         console.log('Input value changed:', inputRef.current?.value);
 *       }
 *     });
 *   }, { attributes: true });
 * 
 *   return (
 *     <div>
 *       <label htmlFor="name">Name:</label>
 *       <input ref={inputRef} type="text" id="name" />
 *     </div>
 *   );
 * };
 */
export const useMutationObserver = (
  ref: MutableRefObject<HTMLElement | null>,
  callback: MutationCallback,
  options: MutationObserverInit = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  }
): void => {
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new MutationObserver(callback);
    observer.observe(ref.current, options);

    return () => observer.disconnect();
  }, [ref, callback, options]);
}
