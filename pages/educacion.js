import React, { useState, useEffect } from 'react';
import { EventsContainer } from '@/app/styles/eventos-styles';
import Modal from '@/app/components/modal';
import axios from 'axios';

const _api = 'http://127.0.0.1:3001';

const Educacion = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenEditableModal, setIsOpenEditableModal] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [educacion, setEducacion] = useState([]);

    // metodo fetch para obtener los post de educacion con axios
    const [educacionModal, setEducacionModal] = useState({
        id: 0,
        id_admin: 0,
        titulo: '',
        descripcion: '',
        imagen: ''
    });

    const fetchEducacion = async () => {
        try {
            const response = await axios.get(`${_api}/api/educacion/getAll`);
            console.log(response.data);
            setEducacion(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    //useEffect para obtener los posts al cargar la pagina
    useEffect(() => {
        fetchEducacion();
    }, []);

    // useEffect para verificar cambios en la base de datos
    useEffect(() => {
        fetchEducacion();
    }, [isOpen, isOpenEditableModal, isOpenDeleteModal]);

    const handleEdit = async (post) => {
        setIsOpenEditableModal(!isOpenEditableModal);
        setEducacionModal(post);
    };

    const handleFormEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${_api}/api/educacion/update`, {
                id: educacionModal.id,
                idAdministrador: 1,
                titulo: e.target[0].value,
                descripcion: e.target[1].value,
                imagen: e.target[2].value
            }).then(response => {
                console.log(response.data);
                fetchEducacion();
                setIsOpenEditableModal(false);
            });
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = (post) => {
        setIsOpenDeleteModal(!isOpenDeleteModal);
        setEducacionModal(post);
    };

    const handleInputChange = (event) => {
        setEducacionModal({
            ...educacionModal,
            [event.target.name]: event.target.value
        });
      };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${_api}/api/educacion/create`, {
                idAdministrador: 1,
                titulo: e.target[0].value,
                descripcion: e.target[1].value,
                imagen: e.target[2].value
            }).then(response => {
                console.log(response.data);
                fetchEducacion();
                setIsOpen(false);
            });
        } catch (error) {
            console.error(error);
        }
    }

    const cleanState = () => {
        setEducacionModal({
            id: 0,
            id_admin: 0,
            titulo: '',
            descripcion: '',
            imagen: ''
        });
    }
    return (
        <>
            <EventsContainer>
                <div className="events__header">
                    <h2>Educacion</h2>
                <button onClick={() => setIsOpen(!isOpen)}>Agregar post educacion</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Administrador</th>
                            <th>Titulo</th>
                            <th>Descripcion</th>
                            <th>Imagen</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {educacion.map(post => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.id_admin}</td>
                                <td>{post.titulo}</td>
                                <td>{post.descripcion}</td>
                                <td>{post.imagen}</td>
                                <td>
                                    <button onClick={() => handleEdit(post)}>Editar</button>
                                    <button onClick={() => handleDelete(post)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </EventsContainer>
            <Modal isOpen={isOpen}>
                <div className="header__modal">
                    <h2>Agregar nuevo post educacion</h2>
                    <button onClick={() => setIsOpen(!isOpen)}>Cerrar</button>
                </div>
                <form onSubmit={handleFormSubmit}>
                    <div className="group__input">
                        <label>Nombre</label>
                        <input type="text" placeholder="Nombre del post" />
                    </div>
                    <div className="group__input">
                        <label>Descripcion</label>
                        <input type="text" placeholder="Descripcion del post" />
                    </div>
                    <div className="group__input">
                        <label>Imagen URL</label>
                        <input type="text" placeholder="Descripcion del post" />
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
                            name="titulo"
                            value={educacionModal.titulo}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="group__input">
                        <label>Descripcion</label>
                        <input 
                            type="text" 
                            name="descripcion" 
                            placeholder="Descripcion del post" 
                            value={educacionModal.descripcion} 
                            onChange={handleInputChange}/>
                    </div>
                    <div  className="group__input">
                    <label>Imagen URL</label>
                    <input 
                        type="text" 
                        name="imagen" 
                        placeholder="Imagen ej: http://example.com/image.png" 
                        value={educacionModal.imagen} 
                        onChange={handleInputChange}/>
                    </div>
                    <button type="submit">Actualizar</button>
                </form>
            </Modal>
            <Modal isOpen={isOpenDeleteModal}>
                <div>Borrar Educacion</div>
                <p>Desea borrar el post de educación?</p>
                <div>
                    <button onClick={async () => {
                        try {
                            console.log(educacion);
                            await axios.delete(`${_api}/api/educacion/remove/${educacionModal.id}`).then(response => {
                                console.log(response.data);
                                fetchEducacion();
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

export default Educacion;