import React, { useState, useEffect } from 'react';
import { EventsContainer } from '@/app/styles/eventos-styles';
import Modal from '@/app/components/modal';
import axios from 'axios';

const _api = 'http://127.0.0.1:3001';

const Norma = () => {
    const [isOpen, setIsOpen] = useState(false);    
    const [isOpenEditableModal, setIsOpenEditableModal] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [normas, setNormas] = useState([]);

    // metodo fetch para obtener los normas con axios
    const [eventoModal, setEventoModal] = useState({
        id: 0,
        id_admin: 0,
        titulo: '',
        descripcion: ''
    });

    const fetchNormas = async () => {
        try {
            const response = await axios.get(`${_api}/api/norma/getAll`);
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
            await axios.put(`${_api}/api/norma/update`, {
                id: eventoModal.id,
                idAdministrador: 1,
                titulo: e.target[0].value,
                descripcion: e.target[1].value
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
            await axios.post(`${_api}/api/norma/create`, {
                idAdministrador: 1,
                titulo: e.target[0].value,
                descripcion: e.target[1].value
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
            id_admin: 0,
            titulo: '',
            descripcion: ''
        });
    }
    return (
        <>
            <EventsContainer>
                <div className="events__header">
                    <h2>Normas</h2>
                <button onClick={() => setIsOpen(!isOpen)}>Agregar nueva norma</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Administrador</th>
                            <th>Titulo</th>
                            <th>Descripcion</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {normas.map(evento => (
                            <tr key={evento.id}>
                                <td>{evento.id}</td>
                                <td>{evento.id_admin}</td>
                                <td>{evento.titulo}</td>
                                <td>{evento.descripcion}</td>
                                <td>
                                    <button onClick={() => handleEdit(evento)}>Editar</button>
                                    <button onClick={() => handleDelete(evento)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </EventsContainer>
            //crear
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
                    <h2>Editar Post educacion</h2>
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
                            placeholder="Descripcion de la norma" 
                            value={eventoModal.descripcion} 
                            onChange={handleInputChange}/>
                    </div>
                    <button type="submit">Actualizar</button>
                </form>
            </Modal>
            
            <Modal isOpen={isOpenDeleteModal}>
                <div>Borrar Norma</div>
                <p>Desea borrar la Norma?</p>
                <div>
                    <button onClick={async () => {
                        try {
                            console.log(eventoModal);
                            await axios.delete(`${_api}/api/norma/remove/${eventoModal.id}`).then(response => {
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

export default Norma;