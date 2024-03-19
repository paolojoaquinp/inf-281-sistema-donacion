import React, { useState, useEffect } from 'react';
import { EventsContainer } from '@/app/styles/eventos-styles';
import Modal from '@/app/components/modal';
import axios from 'axios';

const _api = 'http://192.168.1.6:3000';

const Eventos = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenEditableModal, setIsOpenEditableModal] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [eventos, setEventos] = useState([]);

    // metodo fetch para obtener los eventos con axios
    const [eventoModal, setEventoModal] = useState({
        id: 0,
        id_admin: 0,
        titulo: '',
        descripcion: '',
        fecha: ''
    });

    const fetchEventos = async () => {
        try {
            const response = await axios.get(`${_api}/api/evento/getAll`);
            console.log(response.data);
            setEventos(response.data);
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
    }, [isOpen, isOpenEditableModal, isOpenDeleteModal]);

    const handleEdit = async (evento) => {
        setIsOpenEditableModal(!isOpenEditableModal);
        setEventoModal(evento);
    };

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

    const handleDelete = (evento) => {
        setIsOpenDeleteModal(!isOpenDeleteModal);
        setEventoModal(evento);
    };

    // Código para agregar un nuevo evento a la lista, desde una api usando axios
    const handleAdd = () => {
      
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
            await axios.post(`${_api}/api/evento/create`, {
                idAdministrador: 1,
                titulo: e.target[0].value,
                descripcion: e.target[1].value
            }).then(response => {
                console.log(response.data);
                fetchEventos();
                setIsOpen(false);
            });
        } catch (error) {
            console.error(error);
        }
    }

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
                    <h2>Eventos</h2>
                <button onClick={() => setIsOpen(!isOpen)}>Agregar nuevo evento</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Administrador</th>
                            <th>Titulo</th>
                            <th>Descripcion</th>
                            <th>Fecha</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventos.map(evento => (
                            <tr key={evento.id}>
                                <td>{evento.id}</td>
                                <td>{evento.id_admin}</td>
                                <td>{evento.titulo}</td>
                                <td>{evento.descripcion}</td>
                                <td>{evento.fecha}</td>
                                <td>
                                    <button onClick={() => handleEdit(evento)}>Editar</button>
                                    <button onClick={() => handleDelete(evento)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </EventsContainer>
            <Modal isOpen={isOpen}>
                <div className="header__modal">
                    <h2>Agregar nuevo evento</h2>
                    <button onClick={() => setIsOpen(!isOpen)}>Cerrar</button>
                </div>
                <form onSubmit={handleFormSubmit}>
                    <div className="group__input">
                        <label>Nombre</label>
                        <input type="text" placeholder="Nombre del evento" />
                    </div>
                    <div className="group__input">
                        <label>Descripcion</label>
                        <input type="text" placeholder="Descripcion del evento" />
                    </div>
                    <button type="submit">Agregar</button>
                </form>
            </Modal>
            <Modal isOpen={isOpenEditableModal}>
                <div className="header__modal">
                    <h2>Editar evento</h2>
                    <button onClick={() => setIsOpenEditableModal(!isOpenEditableModal)}>Cerrar</button>
                </div>
                <form onSubmit={handleFormEditSubmit}>
                    <div className="group__input">
                        <label>Nombre</label>
                        <input 
                            type="text"
                            name="titulo" // Add the name attribute
                            value={eventoModal.titulo}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="group__input">
                        <label>Descripcion</label>
                        <input 
                            type="text" 
                            name="descripcion" // Add the name attribute
                            placeholder="Descripcion del evento" 
                            value={eventoModal.descripcion} 
                            onChange={handleInputChange}/>
                    </div>
                    <div  className="group__input">
                    <label>Fecha</label>
                    <input 
                        type="date" 
                        name="fecha" // Add the name attribute
                        value={eventoModal.fecha} 
                        onChange={handleInputChange}/>
                    </div>
                    <button type="submit">Actualizar</button>
                </form>
            </Modal>
            <Modal isOpen={isOpenDeleteModal}>
                <div>Borrar Evento</div>
                <p>Desea borrar el evento?</p>
                <div>
                    <button onClick={async () => {
                        try {
                            console.log(eventoModal);
                            await axios.delete(`${_api}/api/evento/remove/${eventoModal.id}`).then(response => {
                                console.log(response.data);
                                fetchEventos();
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

export default Eventos;