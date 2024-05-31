'use client'
import React, { useState,useContext } from 'react';
import { LoginStyled } from '@/app/styles/login-styles';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import AuthContext from '@/app/context/auth';
import AlertContext from '@/app/context/alert';
import ModalContext from '@/app/context/modal';
import Link from 'next/link';
import { FaRegEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
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
        password: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string()
        .required('La contraseña es requerida')
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .matches(/\d/, 'La contraseña debe contener al menos un número')
        .matches(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula'),
    });

    const onSubmit = async (values) => {
        try {
            await axios.post('http://localhost:3001/api/usuarios/create', {
                nombre: values.nombre,
                paterno: values.paterno,
                materno: values.materno,
                direccion: values.direccion,
                telefono: values.telefono,
                email: values.email,
                password: values.password
            }).then(response => {
                console.log(response.data);
                router.push('/login');
            });
        }
        catch (error) {
            console.error(error);
            setAlert({ message: 'Invalid email or password', type: 'error' });
        }
    }

    return (
        <LoginStyled>
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
                    <h1>Registrarse</h1>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <Field type="text" name="nombre" id="nombre" />
                        <ErrorMessage name="nombre" component="span" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="paterno">Paterno</label>
                        <Field type="text" name="paterno" id="paterno" />
                        <ErrorMessage name="paterno" component="span" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="materno">Materno</label>
                        <Field type="text" name="materno" id="materno" />
                        <ErrorMessage name="materno" component="span" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="direccion">Direccion</label>
                        <Field type="text" name="direccion" id="direccion" />
                        <ErrorMessage name="direccion" component="span" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="telefono">Telefono</label>
                        <Field type="text" name="telefono" id="telefono" />
                        <ErrorMessage name="telefono" component="span" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Field type="email" name="email" id="email" />
                        <ErrorMessage name="email" component="span" />
                    </div>
                    <div className="form-group">
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
                    </div>
                    <button type="submit">Registrarse</button>
                    <p className='hint-text'>Ya tienes una cuenta, 
                        <Link href="/login">Iniciar sesion</Link>
                    </p>
                </Form>
            </Formik>
        </LoginStyled>
    );
}

export default Register; 

