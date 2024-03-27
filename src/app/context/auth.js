'use client'

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(false);

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(false);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;