import { useState } from 'react';

/**
 * Custom React Hook to manage multiple modals on a page, ensuring only one is open at a time.
 * 
 * @returns An object containing the current open modal's name, functions to open, close, and toggle modals.
 *
 * @example
 * //* In your component
 * const { openModal, closeModal, toggleModal, currentModal } = useModalManager();
 * 
 * //* To open a modal:
 * openModal('myModal');
 * 
 * //* To close the current modal:
 * closeModal();
 * 
 * //* To toggle a modal:
 * toggleModal('myModal');
 * 
 * //* Check the name of the currently open modal:
 * console.log(currentModal); // Outputs: 'myModal' or null
 */
export const useModalManager = () => {
  const [currentModal, setCurrentModal] = useState<string | null>(null);

  const openModal = (modalName: string) => {
    setCurrentModal(modalName);
  };

  const closeModal = () => {
    setCurrentModal(null);
  };

  const toggleModal = (modalName: string) => {
    if (currentModal === modalName) {
      closeModal();
    } else {
      openModal(modalName);
    }
  };

  return {
    openModal,
    closeModal,
    toggleModal,
    currentModal,
  };
};