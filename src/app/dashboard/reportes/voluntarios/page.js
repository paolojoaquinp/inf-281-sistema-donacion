'use client'
import React, { useState, useEffect, useContext } from 'react';
import { EventsContainer } from '@/app/styles/eventos-styles';
import Modal from '@/app/components/modal';
import axios from 'axios';
import AuthContext from '@/app/context/auth';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';


const _api = 'http://127.0.0.1:3001';

const ReporteVoluntariosPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [eventos, setEventos] = useState([]);
    const {auth} = useContext(AuthContext);

    // metodo fetch para obtener los eventos con axios
    const [eventoModal, setEventoModal] = useState({
        id: 0,
        id_admin: 0,
        titulo: '',
        descripcion: '',
        fecha: ''
    });

    const getPayload = (token) => {
        if (token) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(window.atob(base64));

            return payload;
        }
        return null;
    }


    const fetchEventos = async () => {
        try {
            const auth = JSON.parse(localStorage.getItem('auth'));
            const token = auth && auth.token;
            const payload = getPayload(token);
            if(payload) {
                console.log("fetching eventos: ", auth);
                const response = await axios.get(`${_api}/api/donante/findById/${payload.id}`);
                console.log(response.data);
                setEventos(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    //useEffect para obtener los eventos al cargar la pagina
    useEffect(() => {
        fetchEventos();
    }, []);

    // useEffect para verificar cambios en la base de datos
    useEffect(() => {
        fetchEventos();
    }, [isOpen]);

    const handleFormEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${_api}/api/evento/update`, {
                id: eventoModal.id,
                idAdministrador: 1,
                titulo: e.target[0].value,
                descripcion: e.target[1].value,
                fecha: e.target[2].value
            }).then(response => {
                console.log(response.data);
                fetchEventos();
                setIsOpenEditableModal(false);
            });
        } catch (error) {
            console.error(error);
        }
    }


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${_api}/api/evento/create`, {
                idAdministrador: 1,
                titulo: e.target[0].value,
                descripcion: e.target[1].value,
                fecha: e.target[2].value
            }).then(response => {
                console.log(response.data);
                fetchEventos();
                setIsOpen(false);
            });
        } catch (error) {
            console.error(error);
        }
    }

    const handleReport = () => {
        const doc = new jsPDF();
         // Add title
        doc.setFontSize(18);
        doc.text('Mis donaciones', 11, 8);

        autoTable(doc, { html: '#tabla' });
        doc.save('reporte.pdf');
    };

    const cleanState = () => {
        setEventoModal({
            id: 0,
            id_admin: 0,
            titulo: '',
            descripcion: '',
            fecha: ''
        });
    }
    return (
        <>
            <EventsContainer>
                <div className="events__header">
                    <h2>Mis donaciones</h2>
                <button onClick={handleReport}>Reporte</button>
                </div>
                <br />
                <br />
                <table id="tabla">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>idUser</th>
                            <th>Ubicacion</th>
                            <th>Tipo</th>
                            <th>Fecha de creacion</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventos.map(evento => (
                            <tr key={evento.id}>
                                <td>{evento.id}</td>
                                <td>{evento.iduser}</td>
                                <td>{evento.ubicacion}</td>
                                <td>{evento.tipo}</td>
                                <td>{evento.createdat}</td>
                                <td>
                                    <button onClick={() => console.log("prueba")}>boton prueba</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </EventsContainer>
            <Modal isOpen={isOpen}>
              
            </Modal>
        </>
    );
};

export default ReporteVoluntariosPage;