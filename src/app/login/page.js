'use client'
import React, { useContext } from 'react';
import { LoginStyled } from '@/app/styles/login-styles';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthContext from '@/app/context/auth';
import AlertContext from '@/app/context/alert';
import ModalContext from '@/app/context/modal';

const Login = () => {
    const router = useRouter();
    const { auth,setAuth } = useContext(AuthContext);
    const { setAlert } = useContext(AlertContext);
    const { setIsOpen } = useContext(ModalContext);

    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().required('Required')
    });

    const onSubmit = async (values) => {
        try {
            await axios.post('http://localhost:3001/api/usuarios/login', {
                email: values.email,
                password: values.password
            }).then(response => {
                setAuth({id:response.data.id, token:response.data.token});
                localStorage.setItem('auth', JSON.stringify({token:response.data.token, id:response.data.id}));
                console.log("mi data: ",response.data);
                router.push('/dashboard');
            });
        }
        catch (error) {
            console.error(error);
            setAlert({ message: 'Invalid email or password', type: 'error' });
        }
    }

    const onSubmitTest = async (values) => {
        try {
            
            await axios.post('http://localhost:3001/api/usuarios/login', {
                email: values.email,
                password: values.password
            }).then(response => {
                setAuth({id:response.data.id, token:response.data.token});
                localStorage.setItem('auth', JSON.stringify({token:response.data.token, id:response.data.id}));
                console.log("mi data: ",response.data);
            }).then(async (_) => {
                const roles = ['beneficiario', 'voluntario', 'donante'];
                for (let role of roles) {
                    const roleResponse = await axios.get(`http://localhost:3001/api/${role}/findById/${auth.id}`);
                    console.log('datos length: ', roleResponse);
                    if (roleResponse.data != null) {
                        // If there's a match, set the role in localStorage and stop checking
                        localStorage.setItem('rol', role);
                        break;
                    }
                    localStorage.setItem('rol', 'administrador');
                }
                router.push('/dashboard');
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
                onSubmit={onSubmitTest}
            >
                <Form>
                    <h1>Login</h1>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Field type="email" name="email" id="email" />
                        <ErrorMessage name="email" component="span" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Field type="password" name="password" id="password" />
                        <ErrorMessage name="password" component="span" />
                    </div>
                    <button type="submit">Login</button>
                    <p className='hint-text'>No tienes ninguna cuenta? 
                        <Link href="/register"> Registrarte aqui</Link>
                    </p>
                </Form>
            </Formik>
        </LoginStyled>
    );
}

export default Login; 

