import React, { createContext, useReducer } from 'react';
import { NotificactionReducer } from './notificationReducer';




export const NotificationContext = createContext({});
 const initialState = {
     uid: '',
     chatActivo: null,  
     userId: null,  
     notificaciones: [],
 }

export const NotificationProvider = ({ children }) => {

    const [ notificationState, dispatch ] = useReducer(NotificactionReducer, initialState);

    return (
        <NotificationContext.Provider value={{
            notificationState,
            dispatch
        }}>
            { children }
        </NotificationContext.Provider>
    )
}



