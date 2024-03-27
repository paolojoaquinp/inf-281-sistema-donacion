'use client'

import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext(false);

export function ModalProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <ModalContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </ModalContext.Provider>
    );
}
export default ModalContext;