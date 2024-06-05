import { useEffect, useState } from 'react';

/**
 * A React hook that tracks the currently selected text in the document.
 * @returns The currently selected text.
 *
 * @example
 * const selectedText = useSelectedText();
 * console.log(selectedText); // Logs the current text selection whenever it changes.
 * 
 * @example
 * const text = useSelectedText(() => {
 *  console.log('Text:', text);
 * });
 */
export function useSelectedText(): string {
  const [selectedText, setSelectedText] = useState<string>('');

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection()?.toString();
      setSelectedText(selection ?? '');
    };

    document.addEventListener('selectionchange', handleSelectionChange);

    // Cleanup function to remove the event listener when the component unmounts.
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  return selectedText;
}