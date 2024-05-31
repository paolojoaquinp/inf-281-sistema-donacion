/*

    const handleSubmit = async (values) => {
        try {
            console.log("PRESSED")
            const userResponse = await axios.post('http://localhost:3001/api/usuarios/create', {
                nombre: values.usuario.nombre,
                paterno: values.usuario.paterno,
                materno: values.usuario.materno,
                direccion: values.usuario.direccion,
                telefono: values.usuario.telefono,
                email: values.usuario.email,
                password: values.usuario.password
            });

            console.log('exito donante: ', userResponse.data);
        
        } catch (error) {
            console.error(error);
        }
    }

    const validationSchema = Yup.object({
        "usuario.email": Yup.string().email('Invalid email format').required('Required'),
        "usuario.password": Yup.string().required('Required'),
    });


 */


'use client'
import React, { useState, useContext } from 'react';
import { CustomInputGroup, CustomInput, CustomSelect } from '@/app/components/custom-form-components';
import { DonantesWrapper } from './donantes-styles';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FaRegEye, FaEyeSlash } from "react-icons/fa";

import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import AuthContext from '@/app/context/auth';
import AlertContext from '@/app/context/alert';
import ModalContext from '@/app/context/modal';
import Link from 'next/link';
import PrimaryButton from '@/app/components/primary-button';
const Donante = () => {
    const router = useRouter();
    const { setAuth } = useContext(AuthContext);
    const { setAlert } = useContext(AlertContext);
    const { setIsOpen } = useContext(ModalContext);

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const initialValues = {
        nombre: '',
        paterno: '',
        materno: '',
        direccion: '',
        telefono: '',
        email: '',
        password: '',
        direccionDonante: '',
        tipoDonante:''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string()
        .required('La contraseña es requerida')
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .matches(/\d/, 'La contraseña debe contener al menos un número')
        .matches(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
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
                validate={
                    (values) => {
                        let errors = {};
                        return validationSchema.validateAt('password', values, { abortEarly: false })
                          .catch(e => {
                            e.inner.forEach((error) => {
                              if (!errors[error.path]) {
                                errors[error.path] = [];
                              }
                              errors[error.path].push(error.message);
                            });
                            return errors;
                          });
                      }
                }
                >
                <Form>
                    <h1>Nuevo Donante</h1>
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
                        <h6>2. Donante</h6>
                        <p>Complete los campos con la información indicada</p>
                        <CustomInputGroup>
                            <label htmlFor="direccionDonante">Direccion</label>
                            <Field type="text" name="direccionDonante" id="direccionDonante" />
                            <ErrorMessage name="direccionDonante" component="span" />
                        </CustomInputGroup>
                        <CustomInputGroup>
                            <label htmlFor='tipoDonante'>Tipo Donante</label>
                            <Field as="select" name="tipoDonante" id="tipoDonante">
                                <option value="">Selecciona...</option>
                                <option value="persona">Persona</option>
                                <option value="organizacion">Organizacion</option>
                            </Field>
                        </CustomInputGroup>
                    </section>
                    <section className='form-section__container'>
                        <h6>3. Contraseña</h6>
                        <p>Complete los campos con la información indicada</p>
                        <CustomInputGroup>
                            <label htmlFor="password">Password</label>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'left',
                                    alignItems: 'center'
                                }}
                            >
                                <Field 
                                    type={showPassword ? 'text' : 'password'} name="password" id="password" />
                                <button type="button" onClick={handleShowPassword}>
                                    {showPassword ? <FaRegEye size={15} /> : <FaEyeSlash size={15}/>}
                                </button>
                            </div>
                            <ErrorMessage name="password">
                                {msg => (
                                    <div>
                                    {msg.map((error, index) => (
                                        <span style={{display:'block'}} key={index}>* {error}</span>
                                    ))}
                                    </div>
                                )}
                            </ErrorMessage>
                        </CustomInputGroup>
                    </section>
                    <PrimaryButton color="red" onClick={() => router.back()}>Cancelar</PrimaryButton>
                    <PrimaryButton type="submit">Guardar</PrimaryButton>
                </Form>
            </Formik>
        </DonantesWrapper>
    );
}

export default Donante; 

