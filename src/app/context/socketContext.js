import React, { useContext, createContext, useEffect } from "react";

import { useSocket } from '../hooks/useSocket';
import { NotificationContext } from "./chat/NotificationContext";
import { types } from './chat/notificationReducer';
import { AuthContext } from './auth';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const {socket, online, conectarSocket, desconectarSocket} = useSocket('http://localhost:3001');

    const { dispatch } =  useContext(NotificationContext);

    useEffect(() => {
        conectarSocket();
    }, [conectarSocket]);

    useEffect(() => {
        if(1!==1) {
            desconectarSocket();
        }
    }, [desconectarSocket]);


    useEffect(() => {
        socket?.on('lista-notificaciones', (notificaciones) => {
            dispatch({
                type: types.cargarNotificaciones,
                payload: notificaciones
            });
        })

    },[socket, dispatch]);

    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}