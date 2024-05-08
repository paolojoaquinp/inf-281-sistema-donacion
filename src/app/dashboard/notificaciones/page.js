'use client'
import React, { useState, useEffect, useContext, use } from "react";
import axios from "axios";
import { NotificacionesWrapper } from './notificaciones-styled';
import AuthContext from "@/app/context/auth";
import { messagesNotification, Roles } from "@/app/utils/constants";
import Link from "next/link";
import PrimaryButton from "@/app/components/primary-button";
import { useRouter } from "next/navigation";

const Notificaciones = () => {
    const [notifications, setNotifications] = useState([]);
    const { auth , setAuth } = useContext(AuthContext);
    const [rol, setRol] = useState('');
    const router = useRouter();

    const fetchNotifications = async (message) => {
        try {
            const rol = localStorage.getItem('rol');
            if(rol === 'administrador') {
                const notifiactionResponse = await axios.get(`http://localhost:3001/api/notificacion/findByType/${message}`);
                if(notifiactionResponse.data.length > 0 || notifiactionResponse.data !== null) {
                    setNotifications(notifiactionResponse.data);
                }
            }
            if(rol === Roles.VOLUNTARIO) {
                const notifiactionResponse = await axios.get(`http://localhost:3001/api/notificacion/findById/${auth.id}`);
                if(notifiactionResponse.data.length > 0 || notifiactionResponse.data !== null) {
                    setNotifications(notifiactionResponse.data);
                }
            }
            if(rol === Roles.DONANTE) {
                const notifiactionResponse = await axios.get(`http://localhost:3001/api/notificacion/findById/${auth.id}`);
                if(notifiactionResponse.data.length > 0 || notifiactionResponse.data !== null) {
                    setNotifications(notifiactionResponse.data);
                }
            }
            // leer notificaciones
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
        if(rol === Roles.ADMINISTRADOR) {
            fetchNotifications(messagesNotification.NUEVA_DONACION);
            console.log("reading notifications...");
        } else if(rol == Roles.VOLUNTARIO) {
            fetchNotifications(messagesNotification.NUEVA_ASIGNACION);
        } else if(rol == Roles.DONANTE) {
            fetchNotifications(messagesNotification.NUEVA_ASIGNACION);
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
                                    {rol === Roles.ADMINISTRADOR 
                                        ?
                                            <Link
                                                href="/dashboard/donacion-admin"
                                            >Ir a donaciones</Link>
                                        : (rol=== Roles.VOLUNTARIO)
                                            ? <Link href="/dashboard/donacion-voluntario">
                                                  Ir a mis asignaciones
                                              </Link>
                                            : <Link href="/dashboard/donacion-donante">
                                                Ir a mis donaciones
                                              </Link>
                                    }
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