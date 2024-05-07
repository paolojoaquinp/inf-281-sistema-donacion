'use client'

import React, { createContext, useContext, useState } from 'react';
import useInitialState from '../hooks/useInitialState';

const CartContext = createContext({});

export function CartProvider({ children }) {
    const initialState = useInitialState();
    
    return (
        <CartContext.Provider value={initialState}>
        {children}
        </CartContext.Provider>
    );
}

export default CartContext;