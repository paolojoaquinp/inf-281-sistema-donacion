'use client'
import React, { useState, useEffect } from 'react';
import { EventsContainer } from '@/app/styles/eventos-styles';
import Modal from '@/app/components/modal';
import axios from 'axios';

const _api = 'http://127.0.0.1:3001';

const Donantes = () => {
    const [isOpen, setIsOpen] = useState(false);    
    const [isOpenEditableModal, setIsOpenEditableModal] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [donantes, setDonantes] = useState([]);

    // metodo fetch para obtener los normas con axios
    const [donanteModal, setDonanteModal] = useState({
        id: 0,
        idUser: 0,
        ubicacion: '',
        tipo:'',
        //fecha:''
    });

    const fetchDonantes = async () => {
        try {
            const response = await axios.get(`${_api}/api/donante/getAll`);
            console.log(response.data);
            setDonantes(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    //useEffect para obtener las normas al cargar la pagina
    useEffect(() => {
        fetchDonantes();
    }, []);

    // useEffect para verificar cambios en la base de datos
    useEffect(() => {
        fetchDonantes();
    }, [isOpen, isOpenEditableModal, isOpenDeleteModal]);

    const handleEdit = async (evento) => {
        setIsOpenEditableModal(!isOpenEditableModal);
        setDonanteModal(evento);
    };

    const handleFormEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${_api}/api/donante/update`, {
                id: DonanteModal.id,
                idUser: e.target[0].value,
                ubicacion: e.target[1].value,
                tipo: e.target[2].value
                //fecha: e.target[3].value
            }).then(response => {
                console.log(response.data);
                fetchDonantes();
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
        setDonanteModal({
            ...eventoModal,
            [event.target.name]: event.target.value
        });
      };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${_api}/api/donante/create`, {
                idUser: e.target[0].value,
                ubicacion: e.target[1].value,
                tipo: e.target[2].value,
                //fecha: e.target[3].value
            }).then(response => {
                console.log(response.data);
                fetchDonantes();
                setIsOpen(false);
            });
        } catch (error) {
            console.error(error);
        }
    }

    const cleanState = () => {
        setDonanteModal({
            id: 0,
            idUser: 0,
            ubicacion: '',
            tipo:'',
            //fecha:''
        });
    }
    return (
        <>
            <EventsContainer>
                <div className="events__header">
                    <h2>Donantes</h2>
                <button onClick={() => setIsOpen(!isOpen)}>Agregar nuevo donante</button>
                </div>
                <br />
                <br />
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Ubicacion</th>
                            <th>Tipo</th>
                            <th>Fecha</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donantes.length>0 && donantes?.map(donante => (
                            <tr key={donante.id}>
                                <td>{donante.id}</td>
                                <td>{donante.nombre}</td>
                                <td>{donante.ubicacion}</td>
                                <td>{donante.tipo}</td>
                                <td>{donante.createdat}</td>
                                {/* <td>{evento.Fecha}</td> */}
                                <td>
                                    <button onClick={() => handleEdit(donante)}>Editar</button>
                                    <button onClick={() => handleDelete(donante)}>Eliminar</button>
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

                    <div className="group__input">
                        <label>Ubicacion</label>
                        <input type="text" placeholder="Ubicacion" />
                    </div>

                    <div className="group__input">
                        <label>Tipo</label>
                        <input type="text" placeholder="Tipo" />
                    </div>

                    <button type="submit">Agregar</button>
                </form>
            </Modal>

            <Modal isOpen={isOpenEditableModal}>
                <div className="header__modal">
                    <h2>Editar Donante</h2>
                    <button onClick={() => setIsOpenEditableModal(!isOpenEditableModal)}>Cerrar</button>
                </div>
                <form onSubmit={handleFormEditSubmit}>
                    <div className="group__input">
                        <label>id usuario</label>
                        <input 
                            type="number"
                            name="iduser" // Add the name attribute
                            value={donanteModal.iduser}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="group__input">
                        <label>Ubicacion</label>
                        <input 
                            type="text"
                            name="ubicacion" // Add the name attribute
                            value={donanteModal.ubicacion}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="group__input">
                        <label>tipo</label>
                        <input 
                            type="text"
                            name="tipo" // Add the name attribute
                            value={donanteModal.tipo}
                            onChange={handleInputChange}
                        />
                    </div>

                    <button type="submit">Actualizar</button>
                </form>
            </Modal>
            
            <Modal isOpen={isOpenDeleteModal}>
                <div>Borrar Donante</div>
                <p>Desea borrar al donante?</p>
                <div>
                    <button onClick={async () => {
                        try {
                            console.log(donanteModal);
                            await axios.delete(`${_api}/api/donante/remove/${donanteModal.id}`).then(response => {
                                console.log(response.data);
                                fetchDonantes();
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

export default Donantes;