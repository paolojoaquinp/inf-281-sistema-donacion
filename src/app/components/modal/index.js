import React from 'react';
import { ModalContainer } from './modal-styles';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <ModalContainer onClick={onClose}>
      <div onClick={handleContentClick} className="content">
        {children}
      </div>
    </ModalContainer>
  );
};

export default Modal;