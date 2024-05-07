'use client'
import React, { useState, useEffect, useContext, use } from "react";
import axios from "axios";
import { NotificacionesWrapper } from './notificaciones-styled';
import AuthContext from "@/app/context/auth";
import { messagesNotification } from "@/app/utils/constants";
import Link from "next/link";
const Notificaciones = () => {
    const [notifications, setNotifications] = useState([]);
    const { auth , setAuth } = useContext(AuthContext);
    const [rol, setRol] = useState('');

    const fetchNotifications = async (message) => {
        try {
            const notifiactionResponse = await axios.get(`http://localhost:3001/api/notificacion/findByType/${message}`)
            if(notifiactionResponse.data.length > 0 || notifiactionResponse.data !== null) {
                setNotifications(notifiactionResponse.data);
            }
            for(let notification of notifiactionResponse.data) {
                if(!notification.read) {
                    await readNotification(notification.id);
                }
            }
            
        } catch (error) {
            console.error(error);
        }
        
    };

    const readNotification = async (id) => {
        try {
            await axios.put(`http://localhost:3001/api/notificacion/read/${id}`)
            .then((response) => {
                console.log(response.data);
            });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        setRol(localStorage.getItem('rol'));
        if(rol === 'administrador') {
            fetchNotifications(messagesNotification.NUEVA_DONACION);
            console.log("reading notifications...");
        }
    },[rol]);

    return (
        <NotificacionesWrapper>
            <h1>Mis notificaciones</h1>
            <div className="table">
                <div className="table__head">
                        <p>ID</p>
                        <p>received_id</p>
                        <p>sender_id</p>
                        <p>Mensaje</p>
                        <p>Leido</p>
                        <p>Acciones</p>
                </div>
                <div className="table__body">
                    {notifications.map(el => {
                        return <div className="table__row" key={el.id}>
                                <p>{el.id}</p>
                                <p>{el.sender_id}</p>
                                <p>{el.receiver_id}</p>
                                <p>{el.message}</p>
                                <p>{el.isread ? 'Leido' : 'No leido'}</p>
                                <p>
                                    <Link
                                        href="/dashboard/donacion-admin"
                                    >Ir a donaciones</Link>
                                </p>
                            </div>
                        })
                    }
                </div>
            </div>
        </NotificacionesWrapper>
    );
};

export default Notificaciones;