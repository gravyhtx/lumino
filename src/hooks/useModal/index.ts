import { useState, useRef } from 'react';
import { useClickOutside } from '../useClickOutside';

/**
 * A custom hook that manages the open/close state of a modal and handles closing the modal
 * when a click is detected outside of the modal content. It provides a ref to attach to the modal
 * element to facilitate this functionality.
 * 
 * @returns An object containing the modal's open state, functions to open and close the modal,
 * and a ref object to be attached to the modal component for detecting clicks outside.
 * 
 * @example
 * const { isOpen, openModal, closeModal, modalRef } = useModal();
 * return (
 *   <div>
 *     <button onClick={openModal}>Open Modal</button>
 *     {isOpen && (
 *       <div ref={modalRef} className="modal">
 *         <div className="modal-content">Modal Content</div>
 *         <button onClick={closeModal}>Close</button>
 *       </div>
 *     )}
 *   </div>
 * );
 */
export const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLElement>(null);

  const openModal = (): void => setIsOpen(true);
  const closeModal = (): void => setIsOpen(false);

  useClickOutside(modalRef, () => {
    if (isOpen) {
      closeModal();
    }
  });

  return { isOpen, openModal, closeModal, modalRef };
};