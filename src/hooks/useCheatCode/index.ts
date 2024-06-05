import { useState, useEffect } from 'react';

interface CheatCodeProps {
  callback: () => void;
  sequence: string[] | 'KONAMI' | 'CAPCOM' | 'MORTAL_KOMBAT' | 'GTA_V';
  isListening?: boolean;
}

export const CHEAT_CODES: Record<string, (string | string[])[]> = {
  KONAMI: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'],
  GOLDENEYE: [['l','r', 'ArrowUp'], ['c','ArrowRight'], ['r','ArrowRight'], ['r','ArrowUp'], 'ArrowUp', ['r','ArrowRight'], 'ArrowUp', ['l','r','c','ArrowDown'], ['l','r','ArrowDown'], ['l','r','c','ArrowLeft']],
  MORTAL_KOMBAT: ['a', 'b', 'a', 'c', 'a', 'b'],
  GTA_V: ['ArrowRight', 'a', 'ArrowRight','ArrowLeft','ArrowLeft', 'ArrowRight', ['r','b'], 'ArrowRight', 'ArrowLeft', 'a', 'y'],
};

/**
 * Custom hook to listen for code sequences using key presses, including simultaneous key presses.
 * When the specified sequence is completed, a callback function is executed.
 *
 * @param {Object} props - The props object containing the callback, sequence, and isListening flag.
 * @param {Function} props.callback - The function to execute when the cheat code sequence is detected.
 * @param {Array<string|Array<string>>|string} props.sequence - The cheat code sequence to listen for. It can be an array of strings and arrays of strings representing the key presses, or a predefined cheat code name from the CHEAT_CODES object.
 * @param {boolean} [props.isListening=true] - Flag to control whether the hook actively listens for key presses. Default is true.
 *
 * @example <caption>Using a predefined cheat code sequence</caption>
 * useCheatCode({
 *   callback: () => {
 *     console.log('Konami code activated!');
 *   },
 *   sequence: 'KONAMI',
 * });
 *
 * @example <caption>Using a custom cheat code sequence with simultaneous key presses</caption>
 * useCheatCode({
 *   callback: () => {
 *     console.log('Custom cheat code activated!');
 *   },
 *   sequence: ['ArrowUp', ['a', 'b'], 'ArrowDown', 'ArrowLeft', 'ArrowRight'],
 * });
 *
 * @example <caption>Controlling the listening state</caption>
 * const [isListening, setIsListening] = useState(true);
 *
 * useCheatCode({
 *   callback: () => {
 *     console.log('Cheat code activated!');
 *     setIsListening(false); // Stop listening after the cheat code is activated
 *   },
 *   sequence: 'KONAMI',
 *   isListening: isListening,
 * });
 *
 * @returns {null} This hook does not return anything.
 */
export const useCheatCode = ({ callback, sequence, isListening = true }: CheatCodeProps) => {
  const [position, setPosition] = useState(0);
  const cheatCodeSequence = Array.isArray(sequence) ? sequence : CHEAT_CODES[sequence];

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // if (event.key === 'Enter') {
      //   // Ignore the "Enter" key press
      //   return;
      // }

      if (!isListening) {
        // If not actively listening, ignore the key press
        return;
      }

      const expectedKey = cheatCodeSequence[position];

      if (Array.isArray(expectedKey)) {
        if (expectedKey.includes(event.key)) {
          setPosition(position + 1);
          if (position + 1 === cheatCodeSequence.length) {
            callback();
            setPosition(0);
          }
        } else {
          setPosition(0);
        }
      } else {
        if (event.key === expectedKey) {
          setPosition(position + 1);
          if (position + 1 === cheatCodeSequence.length) {
            callback();
            setPosition(0);
          }
        } else {
          setPosition(0);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [position, callback, cheatCodeSequence, isListening]);

  return null;
};