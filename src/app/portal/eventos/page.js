'use client'
import React, { useState, useEffect } from 'react';
import { EventsContainer } from '@/app/styles/portal/eventos-styled';
import CardPortal from '../components/card';
import axios from 'axios';
import Link from 'next/link';
import MotionPage from '@/app/styles/motion-page';

const _api = 'http://127.0.0.1:3001';

const Eventos = () => {
    const [eventos, setEventos] = useState([]);

    // Método fetch para obtener los eventos con axios
    const fetchEventos = async () => {
        try {
            const response = await axios.get(`${_api}/api/evento/getAll`);
            setEventos(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    // useEffect para obtener los eventos al cargar la página
    useEffect(() => {
        fetchEventos();
    }, []);

    return (
        <MotionPage>
            <EventsContainer>
                <h2>Eventos</h2>
                <p>Portal de eventos</p>
                {eventos.map(evento => (
                    <CardPortal key={evento.id} {...evento} />
                ))}
            </EventsContainer>
        </MotionPage>
    );
};

export default Eventos;
