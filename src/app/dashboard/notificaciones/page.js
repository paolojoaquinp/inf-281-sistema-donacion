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
                    
                    const notifiactionResponse1 = await axios.get(`http://localhost:3001/api/notificacion/findByType/${messagesNotification.NUEVA_SOLICITUD}`);
                    if(notifiactionResponse1.data.length > 0 || notifiactionResponse1.data !== null) {
                        setNotifications([
                            ...notifiactionResponse.data,
                            ...notifiactionResponse1.data
                        ]);
                        // read notification
                        notifiactionResponse1.data.map(async (el) => {
                            if(!el.read) {
                                await readNotification(el.id);
                            }
                        });
                        
                        notifiactionResponse.data.map(async (el) => {
                            if(!el.read) {
                                await readNotification(el.id);
                            }
                        });
                    }
                }
                
            }
            if(rol === Roles.VOLUNTARIO) {
                const notifiactionResponse = await axios.get(`http://localhost:3001/api/notificacion/findById/${auth.id}`);
                if(notifiactionResponse.data.length > 0 || notifiactionResponse.data !== null) {
                    /* setNotifications(notifiactionResponse.data); */
                    const notifiactionResponse1 = await axios.get(`http://localhost:3001/api/notificacion/findByType/${messagesNotification.NUEVA_ASIGNACION_SOLICITUD}`);
                    if(notifiactionResponse1.data.length > 0 || notifiactionResponse1.data !== null) {
                        setNotifications([
                            ...notifiactionResponse.data,
                            ...notifiactionResponse1.data
                        ]);
                        // read notification
                        notifiactionResponse1.data.map(async (el) => {
                            if(!el.read) {
                                await readNotification(el.id);
                            }
                        });
                        notifiactionResponse.data.map(async (el) => {
                            if(!el.read) {
                                await readNotification(el.id);
                            }
                        });
                    }
                }
            }
            if(rol === Roles.DONANTE) {
                const notifiactionResponse = await axios.get(`http://localhost:3001/api/notificacion/findById/${auth.id}`);
                if(notifiactionResponse.data.length > 0 || notifiactionResponse.data !== null) {
                    setNotifications(notifiactionResponse.data);
                    // read notification
                    notifiactionResponse.data.map(async (el) => {
                        if(!el.read) {
                            await readNotification(el.id);
                        }
                    });
                }
            }

            if(rol == Roles.BENEFICIARIO) {
                const notifiactionResponse = await axios.get(`http://localhost:3001/api/notificacion/findById/${auth.id}`);
                if(notifiactionResponse.data.length > 0 || notifiactionResponse.data !== null) {
                    setNotifications(notifiactionResponse.data);
                    // read notification
                    notifiactionResponse.data.map(async (el) => {
                        if(!el.read) {
                            await readNotification(el.id);
                        }
                    });
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
        } else if(rol == Roles.BENEFICIARIO) {
            fetchNotifications(messagesNotification.RESPUESTA_SOLICITUD_VOLUNTARIO);
        }
    },[rol]);

    return (
        <NotificacionesWrapper>
            <h1>Mis notificaciones</h1>
            <div className="table">
                <div className="table__head">
                        <p>ID</p>
                        <p>Autor</p>
                        {/* <p>sender_id</p> */}
                        <p>Mensaje</p>
                        <p>Leido</p>
                        <p>Acciones</p>
                </div>
                {notifications.some(el => el.isread) ? <h1>
                    No hay notificaciones
                 </h1>: <></>
                }
                <div className="table__body">
                    {notifications.map(el => {
                        if (el.isread === true) return <></>;

                        return <div className="table__row" key={el.id}>
                                <p>{el.id}</p>
                                <p>{el.author_name} {el.author_paterno} {el.author_materno}
                                </p>
                                {/* <p>{el.receiver_id}</p> */}
                                <p>{el.message}</p>
                                <p>{el.isread ? 'Leido' : 'No leido'}</p>
                                <p>
                                    {rol === Roles.ADMINISTRADOR 
                                        ?
                                           ( (el.message === "Nueva donacion")
                                            ?    <Link
                                                    href="/dashboard/donacion-admin"
                                                >Ir a donaciones</Link>
                                            :
                                                 <Link
                                                     href="/dashboard/solicitud-admin"
                                                    >Ir a Solicitud</Link>
                                            )                                    
                                        : (rol=== Roles.VOLUNTARIO)
                                            ? 
                                              (
                                                (el.tipo === messagesNotification.NUEVA_ASIGNACION_SOLICITUD)
                                                ?
                                                    <Link href="/dashboard/solicitud-voluntario">
                                                        mis asignaciones solicitudes
                                                    </Link>
                                                :
                                                    <Link href="/dashboard/donacion-voluntario">
                                                        mis asignaciones donaciones
                                                    </Link>
                                              )
                                            : (rol === Roles.DONANTE)
                                              ?
                                                <Link href="/dashboard/donacion-donante">
                                                    mis donaciones
                                                </Link>
                                              : (rol === Roles.BENEFICIARIO)
                                                ?
                                                    <Link href="/dashboard/solicitud-beneficiario">
                                                        mis solicitudes
                                                    </Link>
                                                : null
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