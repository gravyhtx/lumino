import React from 'react';
import { useModalManager } from './';

const ModalComponent = ({ title, onClose }: {title: string, onClose: () => void}) => (
  <div>
    <h1>{title}</h1>
    <button onClick={onClose}>Close</button>
  </div>
);

function MyComponent() {
  const { openModal, closeModal, currentModal } = useModalManager();

  return (
    <div>
      <button onClick={() => openModal('loginModal')}>Open Login Modal</button>
      <button onClick={() => openModal('signupModal')}>Open Signup Modal</button>

      {currentModal === 'loginModal' && (
        <ModalComponent
          title="Login"
          onClose={() => closeModal()}
        />
      )}

      {currentModal === 'signupModal' && (
        <ModalComponent
          title="Sign Up"
          onClose={() => closeModal()}
        />
      )}
    </div>
  );
}

export default MyComponent;