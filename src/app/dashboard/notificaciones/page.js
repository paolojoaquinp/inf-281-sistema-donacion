'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { NotificacionesWrapper } from './notificaciones-styled';
const Notificaciones = () => {
    const [notifications, setNotifications] = useState([]);

    const fetchNotifications = async () => {
        const auth = JSON.parse(localStorage.getItem('auth'));
        await axios.get(`http://localhost:3001/api/notificacion/findById/${auth.id}`)
        .then((response) => {
            if(response.data.length > 0) {
                setNotifications(response.data);
            }
        });
    };

    useEffect(() => {
       fetchNotifications();
/*        if(notifications.data.length) {
            await axios.post(`http://localhost:3001/api/notificacion/read/${auth.id}`)
                .then(response => {
                    console.log("readed");
                });
       } */
    }, []);

    return (
        <NotificacionesWrapper>
            <h1>Mis notificaciones</h1>
            <div className="table">
                <div className="table__head">
                        <p>ID</p>
                        <p>received_id</p>
                        <p>sender_id</p>
                        <p>Message</p>
                </div>
                <div className="table__body">
                    {notifications.map(el => {
                        return <div className="table__row" key={el.id}>
                                <p>{el.id}</p>
                                <p>{el.sender_id}</p>
                                <p>{el.receiver_id}</p>
                                <p>{el.message}</p>
                            </div>
                        })
                    }
                </div>
            </div>
        </NotificacionesWrapper>
    );
};

export default Notificaciones;