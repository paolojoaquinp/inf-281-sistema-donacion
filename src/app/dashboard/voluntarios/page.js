'use client'
import React, { useContext } from 'react';
import { CustomInputGroup, CustomInput, CustomSelect } from '@/app/components/custom-form-components';
import { VoluntariosWrapper } from './voluntarios-styles';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import AuthContext from '@/app/context/auth';
import AlertContext from '@/app/context/alert';
import ModalContext from '@/app/context/modal';
import Link from 'next/link';
import PrimaryButton from '@/app/components/primary-button';
const Voluntario = () => {
    const router = useRouter();
    const { setAuth } = useContext(AuthContext);
    const { setAlert } = useContext(AlertContext);
    const { setIsOpen } = useContext(ModalContext);

    const initialValues = {
        nombre: '',
        paterno: '',
        materno: '',
        direccion: '',
        telefono: '',
        email: '',
        password: ''
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().required('Required')
    });

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

            const voluntarioResponse = await axios.post('http://localhost:3001/api/voluntario/create', {
                idUser: userResponse.data.data
            });

            console.log(userResponse);
            console.log(voluntarioResponse.data);
            router.push('/dashboard');
        }
        catch (error) {
            console.error(error);
            setAlert({ message: 'Invalid email or password', type: 'error' });
        }
    }

    return (
        <VoluntariosWrapper>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                >
                <Form>
                    <h1>Nuevo Voluntario</h1>
                    <section className='form-section__container'>
                        <h6>1. Datos personales</h6>
                        <p>Complete los campos con la información indicada</p>
                        <CustomInputGroup>
                            <label htmlFor="nombre">Nombre</label>
                            <Field type="text" name="nombre" id="nombre" />
                            <ErrorMessage name="nombre" component="span" />
                        </CustomInputGroup>
                        <CustomInputGroup>
                            <label htmlFor="paterno">Paterno</label>
                            <Field type="text" name="paterno" id="paterno" />
                            <ErrorMessage name="paterno" component="span" />
                        </CustomInputGroup>
                        <CustomInputGroup>
                            <label htmlFor="materno">Materno</label>
                            <Field type="text" name="materno" id="materno" />
                            <ErrorMessage name="materno" component="span" />
                        </CustomInputGroup>
                        <CustomInputGroup>
                            <label htmlFor="direccion">Direccion</label>
                            <Field type="text" name="direccion" id="direccion" />
                            <ErrorMessage name="direccion" component="span" />
                        </CustomInputGroup>
                        <CustomInputGroup>
                            <label htmlFor="telefono">Telefono</label>
                            <Field type="text" name="telefono" id="telefono" />
                            <ErrorMessage name="telefono" component="span" />
                        </CustomInputGroup>
                        <CustomInputGroup>
                            <label htmlFor="email">Email</label>
                            <Field type="email" name="email" id="email" />
                            <ErrorMessage name="email" component="span" />
                        </CustomInputGroup>
                    </section>
                    <section className='form-section__container'>
                        <h6>2. Contraseña</h6>
                        <p>Complete los campos con la información indicada</p>
                        <CustomInputGroup>
                            <label htmlFor="password">Password</label>
                            <Field type="password" name="password" id="password" />
                            <ErrorMessage name="password" component="span" />
                        </CustomInputGroup>
                    </section>
                    <PrimaryButton color="red" onClick={() => router.back()}>Cancelar</PrimaryButton>
                    <PrimaryButton type="submit">Guardar</PrimaryButton>
                </Form>
            </Formik>
        </VoluntariosWrapper>
    );
}

export default Voluntario; 

