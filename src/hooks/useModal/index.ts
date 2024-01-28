import { useState, useEffect } from 'react';

/**
 * Custom hook for managing the open/close state of a modal.
 * Provides methods to open and close the modal.
 * Automatically handles closing the modal when clicking outside of its content.
 *
 * @returns An object containing the modal's open state, and functions to open and close the modal.
*/
export const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = (): void => setIsOpen(true);
  const closeModal = (): void => setIsOpen(false);

  // Close modal when clicking outside of modal content
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      // Casting event.target to HTMLElement for accessing the closest method
      const target = event.target as HTMLElement;

      if (target && target.closest('.modal-content') === null) {
        closeModal();
      }
    };

    // Add event listener if the modal is open
    if (isOpen) {
      window.addEventListener('click', handleClickOutside as EventListener);
    }

    // Cleanup event listener
    return () => {
      window.removeEventListener('click', handleClickOutside as EventListener);
    };
  }, [isOpen]);

  return { isOpen, openModal, closeModal };
};