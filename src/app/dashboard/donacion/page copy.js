'use client'
import React, { useContext, useState, useEffect } from 'react';
import { CustomInputGroup } from '@/app/components/custom-form-components';
import { DonantesWrapper } from '../donantes/donantes-styles';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import AuthContext from '@/app/context/auth';
import AlertContext from '@/app/context/alert';
import ModalContext from '@/app/context/modal';
import PrimaryButton from '@/app/components/primary-button';
import Card from '@/app/components/card-food';
import { AlimentosWrapper } from './donacion-styled';
const alimentos = [
    {
      idInventario: 1,
      nombre: 'Apple',
      descripcion: 'Fresh red apples',
      image: '/images/apple.jpeg',
      fechaVencimiento: new Date('2023-12-31T00:00:00'),
      cantidad: 100,
      createdAt: new Date('2022-01-01T00:00:00')
    },
    {
        idInventario: 2,
        nombre: 'Banana',
        image: '/images/banana.png',
        descripcion: 'Fresh yellow bananas',
        fechaVencimiento: new Date('2023-12-31T00:00:00'),
        cantidad: 200,
        createdAt: new Date('2022-01-01T00:00:00')
    },
    {
        idInventario: 3,
        image: '/images/orange.png',
        nombre: 'Orange',
        descripcion: 'Fresh orange oranges',
        fechaVencimiento: new Date('2023-12-31T00:00:00'),
        cantidad: 150,
        createdAt: new Date('2022-01-01T00:00:00')
    }
  ];

const Donacion = () => {
    const router = useRouter();
    const { setAuth } = useContext(AuthContext);
    const { setAlert } = useContext(AlertContext);
    const { setIsOpen } = useContext(ModalContext);
    const [voluntarios, setVoluntarios] = useState([]);
    const initialValues = {
        fecha: '',
        alimentos: [], 

    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().required('Required')
    });


    const fetchVoluntarios = async () => {
        try {
            await axios.get('http://localhost:3001/api/voluntario/getAll')
            .then((response) => {
                console.log(response.data);
                setVoluntarios(response.data);
            });
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchVoluntarios();
    }, []);

    const onSubmit = async (values) => {
        try {
            const userResponse = await axios.post('http://localhost:3001/api/usuarios/create', {
                nombre: values.nombre,
                paterno: values.paterno,
                materno: values.materno,
                direccion: values.direccion,
                telefono: values.telefono,
                email: values.email,
                password: values.password
            })

            const donanteResponse = await axios.post('http://localhost:3001/api/donante/create', {
                idUser: userResponse.data.data,
                ubicacion: values.direccionDonante,
                tipo: values.tipoDonante,
            });

            console.log(userResponse);
            console.log(donanteResponse.data);
            router.push('/dashboard');
        }
        catch (error) {
            console.error(error);
            setAlert({ message: 'Invalid email or password', type: 'error' });
        }
    }

    return (
        <DonantesWrapper>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                >
                <Form>
                    <h1>Nueva Donacion</h1>
                    <section className='form-section__container'>
                        <h6>1. Datos de donacion</h6>
                        <p>Complete los campos con la información requerida</p>
                        <CustomInputGroup>
                            <label htmlFor="fecha">Fecha de entrega<br/><p>Indica la fecha en entregaras la donacion</p></label>
                            <Field type="datetime-local" name="fecha" id="fecha" />
                            <ErrorMessage name="fecha" component="span" />
                        </CustomInputGroup>
                        <CustomInputGroup>
                            <label htmlFor='alimentos'>Alimentos donacion</label>
                            <AlimentosWrapper>
                                {alimentos.map((alimento, index) => (
                                    <Card key={index} product={alimento} /* onClick={() => setFieldValue('tipoDonante', alimento.nombre)}  *//>
                                ))}
                            </AlimentosWrapper>
                            <ErrorMessage name="alimentos" component="span" />
                        </CustomInputGroup>
                        <div className='input__subgroup'>
                            <h2>Ubicacion</h2>
                            <CustomInputGroup>
                                <label htmlFor="fecha">Lat</label>
                                <Field type="number" name="lat" id="lat" />
                                <ErrorMessage name="lat" component="span" />
                            </CustomInputGroup>
                            <CustomInputGroup>
                                <label htmlFor="fecha">Lng</label>
                                <Field type="number" name="lng" id="lng" />
                                <ErrorMessage name="lng" component="span" />
                            </CustomInputGroup>
                        </div>
                    
                    </section>
                    <section className='form-section__container block-data'>
                        <h6>2. Voluntarios</h6>
                        <p>Asignar a los voluntarios para la donacion</p>
                        <CustomInputGroup>
                            <label htmlFor='tipoDonante'>Voluntarios</label>
                            <Field as="select" name="voluntarios" id="voluntarios">
                                <option value="">Selecciona un voluntario</option>
                                {voluntarios.map((voluntario, index) => (
                                    <option key={index} value={voluntario.idVoluntario}>{voluntario.nombre} {voluntario.paterno} {voluntario.materno}</option>
                                ))}
                            </Field>
                        </CustomInputGroup>
                    </section>
                    <PrimaryButton color="red" onClick={() => router.back()}>Cancelar</PrimaryButton>
                    <PrimaryButton type="submit">Crear</PrimaryButton>
                </Form>
            </Formik>
        </DonantesWrapper>
    );
}
    
export default Donacion;  
    
    