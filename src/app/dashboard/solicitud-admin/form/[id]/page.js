'use client'
import React, { useContext, useState, useEffect } from 'react';
import { CustomInputGroup } from '@/app/components/custom-form-components';
import { DonantesWrapper } from '../../../donantes/donantes-styles';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import { useRouter, useParams } from 'next/navigation';
import { messagesNotification } from '@/app/utils/constants';
import { AlimentosWrapper } from '@/app/dashboard/beneficiarios/solicitud/donacion-styled';

import axios from 'axios';
import AuthContext from '@/app/context/auth';
import PrimaryButton from '@/app/components/primary-button';
import CartContext from '@/app/context/cart';
import CardMyOrder from '@/app/components/card-my-order';
const cart = [
    {
        id: 2,
        image: "/images/products/chamarrahombre.png",
        quantity: 1,
        size: "Talla L",
        title: "Chamarra para hombre",
        total: 4,
    },
    {
        id:1,
        image:"/images/products/chamarramujer.png",
        quantity:1,
        size:"Talla M",
        title:"Chamarra para mujer",
        total:2,
    }
]

const DonacionAdminForm = () => {
    const { id } = useParams();
    const { setAuth } = useContext(AuthContext);
    const [voluntarios, setVoluntarios] = useState([]);
    const [donacion, setDonacion] = useState({});
    const router = useRouter();

    const fetchDonacion = async () => {
        try {
            await axios.get(`http://localhost:3001/api/solicitud/findById/${id}`)
            .then((response) => {
                setDonacion(response.data);
            });
        } catch (error) {
            console.error(error);
        }
    }


    const fetchVoluntarios = async () => {
        try {
            await axios.get('http://localhost:3001/api/voluntario/getAll')
            .then((response) => {
                const data = response.data;
                const voluntarios = data.map(voluntario => ({ ...voluntario, isChecked: false }));
                setVoluntarios(voluntarios);
            });
        }
        catch (error) {
            console.error(error);
        }
    }

    const initialValues = {
        voluntarios: []
    };

    useEffect(() => {
        fetchDonacion();
        fetchVoluntarios();
    }, []);

    const onSubmit = async (values) => {
        try {
            console.log("id", id);
            // for each for selectedVoluntarios
            console.log("selectedVoluntarios", selectedVoluntarios[0]);
            for(let i = 0; i < selectedVoluntarios.length; i++) {
                await axios.post('http://localhost:3001/api/voluntarioSolicitud/create', {
                    idSolicitud: id,
                    idVoluntario: selectedVoluntarios[i].iduser,
                    estado: 'pendiente'
                });
                await setNotification(selectedVoluntarios[i].iduser);
            }
            
            
            router.push('/dashboard');
        }
        catch (error) {
            console.error(error);
            setAlert({ message: 'Invalid email or password', type: 'error' });
        }
    }


    const setNotification = async (idVoluntario) => {
        try {
            const localAuth = JSON.parse(localStorage.getItem('auth'));
            await axios.post('http://localhost:3001/api/notificacion/create', {
                sender_id: localAuth.id,
                receiver_id: idVoluntario,
                message: 'Nueva Asignacion Solicitud',
                tipo: messagesNotification.NUEVA_ASIGNACION_SOLICITUD
            });

        } catch (error) {
            console.error(error);

        }
    }



    const [selectedVoluntarios, setSelectedVoluntarios] = useState([]);

    const handleVoluntarioChange = (event, voluntario) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            setSelectedVoluntarios(prevState => [...prevState, {...voluntario, isChecked: true}]);
        } else {
            setSelectedVoluntarios(prevState => prevState.filter(el => el.idUser !== voluntario.idUser));
        }
    };

    return (
        <DonantesWrapper>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                <Form>
                    <h1>Asignar Voluntarios</h1>
                    <section className='form-section__container donacion__info'>
                        <h6>1. Donacion</h6>
                        <p>Datos de la donación</p>
                        <div className='info__group'>
                            <p className='title'>Nombre:</p>
                            <p className='value'>{donacion.nombre+ ' ' + donacion.paterno + ' ' + donacion.materno}</p>
                        </div>
                        <div className='info__group'>
                            <p className='title'>Email:</p>
                            <p className='value'>{donacion.email}</p>
                        </div>
                        <div className='info__group'>
                            <p className='title'>Fecha Entrega:</p>
                            <p className='value'>{donacion.fechaentregar}</p>
                        </div>
                        <div className='info__group'>
                            <p className='title'>Estado:</p>
                            <p className='value'>{donacion.estado}</p>
                        </div>
                    </section>
                    <section className='form-section__container'>
                        <h6>2. Voluntarios</h6>
                        <p>Asignar a los voluntarios para la donacion</p>
                        <CustomInputGroup>
                        <label htmlFor='productos'>Productos Donacion</label>
                            <AlimentosWrapper>
                                {cart.map((elem, index) => (
                                    <CardMyOrder key={index}  item={elem}/>
                                ))}
                            </AlimentosWrapper>
                        </CustomInputGroup>
                        <CustomInputGroup>
                            <div className='section__checkbox'>
                                {voluntarios.map((voluntario, index) => (
                                    <div key={index}>
                                        <Field 
                                            type="checkbox"
                                            name={`voluntarios[${index}]`}
                                            id={`voluntarios[${index}]`}
                                            checked={selectedVoluntarios.includes(voluntario.idUser).isChecked}
                                            onChange={event => handleVoluntarioChange(event, voluntario)}
                                        />
                                        <label htmlFor={`voluntarios[${index}]`}>{voluntario.nombre} {voluntario.paterno} {voluntario.materno}</label>
                                    </div>
                                ))}
                            </div>
                        </CustomInputGroup>
                    </section>
                    <PrimaryButton color="red" onClick={() => router.back()}>Cancelar</PrimaryButton>
                    <PrimaryButton type="submit">Asignar Voluntarios</PrimaryButton>
                </Form>
            </Formik>
        </DonantesWrapper>
    );
}
    
export default DonacionAdminForm;  