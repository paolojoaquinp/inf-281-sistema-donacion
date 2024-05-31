'use client'
import React, { useContext, useState, useEffect } from 'react';
import { CustomInputGroup } from '@/app/components/custom-form-components';
import { DonantesWrapper } from '@/app/dashboard/donantes/donantes-styles';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import AuthContext from '@/app/context/auth';
import AlertContext from '@/app/context/alert';
import ModalContext from '@/app/context/modal';
import CartContext from '@/app/context/cart';
import PrimaryButton from '@/app/components/primary-button';
import Card from '@/app/components/card-food';
import { AlimentosWrapper } from '../donacion-styled';
import CardMyOrder from '@/app/components/card-my-order';
import { messagesNotification } from '@/app/utils/constants';

const Checkout = () => {
    const router = useRouter();
    const { auth, setAuth } = useContext(AuthContext);
    const { setAlert } = useContext(AlertContext);
    const { setIsOpen } = useContext(ModalContext);
    const [voluntarios, setVoluntarios] = useState([]);
    const [role, setRole] = useState('');

    const { state: {cart} } = useContext(CartContext);

    const initialValues = {
        descripcion: '',
        fechaEntregar: '',
        productos: []
    };



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
        initialValues.productos = cart;
        const storedAuth = JSON.parse(localStorage.getItem('auth'));
        setAuth({
            id: storedAuth.id,
        });
        setRole(localStorage.getItem('rol'));
    }, []);

    const setNotification = async () => {
        try {
            await axios.post('http://localhost:3001/api/notificacion/create', {
                sender_id: auth.id,
                receiver_id: 1,
                message: 'Nueva solicitud',
                tipo: messagesNotification.NUEVA_SOLICITUD
            });

        } catch (error) {
            console.error(error);

        }
    }

    const onSubmit = async (values) => {
        try {
            const donacionResponse = await axios.post('http://localhost:3001/api/solicitud/create', {
                idBeneficiario: auth.id,
                estado: "inicial",
                descripcion: values.descripcion,
                fechaRecoger: values.fechaRecoger
            });
            console.log("beneficiario", donacionResponse.data.data.id);

/*             const inventarioResponse = await axios.get(`http://localhost:3001/api/inventario/findById/${donacionResponse.data.data.id}`);
 */
            console.log("cart", cart);
            for (let item of cart) {
                await axios.post('http://localhost:3001/api/solicitudProducto/create', {
                    idSolicitud: donacionResponse.data.data.id,
                    nombre: item.title,
                    cantidad: item.total
                });
            }
            

            await setNotification();
            router.push('/dashboard');
        }
        catch (error) {
            console.error(error);
            setAlert({ message: 'Invalid data', type: 'error' });
        }
    }

    return (
        <DonantesWrapper>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                >
                <Form>
                    <h1>Nueva Solicitud(Checkout)</h1>
                    <section className='form-section__container'>
                        <h6>1. Datos de solicitud</h6>
                        <p>Complete los campos con la información requerida</p>
                        <CustomInputGroup>
                            <label htmlFor="fechaEntregar">Fecha recoger<br/><p>Indica la fecha en la que pasaras a recoger la donacion</p></label>
                            <Field type="datetime-local" name="fechaEntregar" id="fechaEntregar" />
                            <ErrorMessage name="fechaEntregar" component="span" />
                        </CustomInputGroup>
                        <CustomInputGroup>
                            <label htmlFor="descripcion">Descripcion</label>
                            <Field type="text" name="descripcion" id="descripcion" />
                            <ErrorMessage name="descripcion" component="span" />
                        </CustomInputGroup>
                        <CustomInputGroup >
                            <label htmlFor='productos'>Productos Donacion</label>
                            <AlimentosWrapper>
                                {cart.map((elem, index) => (
                                    <CardMyOrder key={index}  item={elem}/>
                                ))}
                            </AlimentosWrapper>
                            <ErrorMessage name="alimentos" component="span" />
                        </CustomInputGroup>
                      {/*   <div className='input__subgroup'>
                            <h2>Ubicacion</h2>
                            <p>
                                #Ubicacion dada por el administrador
                            </p>
                        </div> */}
                    
                    </section>
                    {role == 'administrador' 
                        ?   <section className='form-section__container block-data'>
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
                        : <></>
                    }
                    <PrimaryButton color="red" onClick={() => router.back()}>Cancelar</PrimaryButton>
                    <PrimaryButton type="submit">Crear</PrimaryButton>
                </Form>
            </Formik>
        </DonantesWrapper>
    );
}
    
export default Checkout;  
    
    