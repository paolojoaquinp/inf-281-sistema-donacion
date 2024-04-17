'use client'
import React, { useState, useEffect } from 'react';
import { EventsContainer } from '@/app/styles/eventos-styles';
import Modal from '@/app/components/modal';
import axios from 'axios';

const _api = 'http://127.0.0.1:3001';

const Beneficiarios = () => {
    const [isOpen, setIsOpen] = useState(false);    
    const [isOpenEditableModal, setIsOpenEditableModal] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [normas, setNormas] = useState([]);

    // metodo fetch para obtener los normas con axios
    const [eventoModal, setEventoModal] = useState({
        id: 0,
        idUser: 0,
    });

    const fetchNormas = async () => {
        try {
            const response = await axios.get(`${_api}/api/beneficiario/getAll`);
            console.log(response.data);
            setNormas(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    //useEffect para obtener las normas al cargar la pagina
    useEffect(() => {
        fetchNormas();
    }, []);

    // useEffect para verificar cambios en la base de datos
    useEffect(() => {
        fetchNormas();
    }, [isOpen, isOpenEditableModal, isOpenDeleteModal]);

    const handleEdit = async (evento) => {
        setIsOpenEditableModal(!isOpenEditableModal);
        setEventoModal(evento);
    };

    const handleFormEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${_api}/api/beneficiario/update`, {
                id: eventoModal.id,
                idUser: e.target[0].value,
            }).then(response => {
                console.log(response.data);
                fetchNormas();
                setIsOpenEditableModal(false);
            });
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = (evento) => {
        setIsOpenDeleteModal(!isOpenDeleteModal);
        setEventoModal(evento);
    };

    const handleInputChange = (event) => {
        setEventoModal({
            ...eventoModal,
            [event.target.name]: event.target.value
        });
      };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${_api}/api/beneficiario/create`, {
                idUser: e.target[0].value,
            }).then(response => {
                console.log(response.data);
                fetchNormas();
                setIsOpen(false);
            });
        } catch (error) {
            console.error(error);
        }
    }

    const cleanState = () => {
        setEventoModal({
            id: 0,
            idUser: 0,
        });
    }
    return (
        <>
            <EventsContainer>
                <div className="events__header">
                    <h2>Beneficiarios</h2>
                <button onClick={() => setIsOpen(!isOpen)}>Agregar nuevo beneficiario</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>idUser</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {normas.length>0 && normas?.map(evento => (
                            <tr key={evento.id}>
                                <td>{evento.id}</td>
                                <td>{evento.iduser}</td>
                                <td>
                                    <button onClick={() => handleEdit(evento)}>Editar</button>
                                    <button onClick={() => handleDelete(evento)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </EventsContainer>
            {/* crear */}
            <Modal isOpen={isOpen}>
                <div className="header__modal">
                    <h2>Agregar nuevo evento</h2>
                    <button onClick={() => setIsOpen(!isOpen)}>Cerrar</button>
                </div>
                <form onSubmit={handleFormSubmit}>
                    <div className="group__input">
                        <label>idUser</label>
                        <input type="number" placeholder="id de Usuario" />
                    </div>
                    <button type="submit">Agregar</button>
                </form>
            </Modal>

            <Modal isOpen={isOpenEditableModal}>
                <div className="header__modal">
                    <h2>Editar beneficiario</h2>
                    <button onClick={() => setIsOpenEditableModal(!isOpenEditableModal)}>Cerrar</button>
                </div>
                <form onSubmit={handleFormEditSubmit}>
                    <div className="group__input">
                        <label>id usuario</label>
                        <input 
                            type="number"
                            name="id user" // Add the name attribute
                            value={eventoModal.idUser}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit">Actualizar</button>
                </form>
            </Modal>
            
            <Modal isOpen={isOpenDeleteModal}>
                <div>Borrar beneficiario</div>
                <p>Desea borrar al beneficiario?</p>
                <div>
                    <button onClick={async () => {
                        try {
                            console.log(eventoModal);
                            await axios.delete(`${_api}/api/beneficiario/remove/${eventoModal.id}`).then(response => {
                                console.log(response.data);
                                fetchNormas();
                                setIsOpenDeleteModal(false);
                                cleanState();
                            });
                        } catch (error) {
                            console.error(error);
                        }
                    }}>Si</button>
                    <button onClick={function () {
                        setIsOpenDeleteModal(false);
                        cleanState();
                    }
                    }>No</button>
                </div>
            </Modal>
        </>
    );
};

export default Beneficiarios;