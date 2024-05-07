'use client'
import React, { useContext, useState, useEffect } from 'react';
import { CustomInputGroup } from '@/app/components/custom-form-components';
import { DonantesWrapper } from '../../../donantes/donantes-styles';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useRouter ,useSearchParams} from 'next/navigation';

import AuthContext from '@/app/context/auth';
import PrimaryButton from '@/app/components/primary-button';
import Card from '@/app/components/card-food';
import { AlimentosWrapper } from '../../../donacion/donacion-styled';

const DonacionAdminForm = () => {
    const searchParams = useSearchParams();
    const value = searchParams.get('id');
    const { setAuth } = useContext(AuthContext);
    const [voluntarios, setVoluntarios] = useState([]);

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

    const initialValues = {
        voluntarios: []
    };

    useEffect(() => {
        fetchVoluntarios();
    }, []);

    const onSubmit = async (values) => {
        try {

            
            for(let el in values.voluntarios) {
                console.log(
                    value,
                    el,
                    'pendiente'
                );
                await axios.post('http://localhost:3001/api/voluntarioDonacion/create', {
                    iddonacion: id,
                    idvoluntario: el.iduser,
                    estado: 'pendiente'
                });
            }
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
                onSubmit={onSubmit}
            >
                <Form>
                    <h1>Asignar Voluntarios</h1>
                    <section className='form-section__container donacion__info'>
                        <h6>1. Donacion</h6>
                        <p>Datos de la donación</p>
                        <div className='info__group'>
                            <p className='title'>Nombre:</p>
                            <p className='value'>Donador</p>
                        </div>
                        <div className='info__group'>
                            <p className='title'>Email:</p>
                            <p className='value'>
                                email
                            </p>
                        </div>
                        <div className='info__group'>
                            <p className='title'>Fecha Entrega:</p>
                            <p className='value'>fecha</p>
                        </div>
                        <div className='info__group'>
                            <p className='title'>Estado:</p>
                            <p className='value'>estado</p>
                        </div>
                    </section>
                    <section className='form-section__container'>
                        <h6>2. Voluntarios</h6>
                        <p>Asignar a los voluntarios para la donacion</p>
                        <CustomInputGroup
                        >
                            
                            <div className='section__checkbox'>
                                {voluntarios.map((voluntario, index) => (
                                    <div key={index}>
                                            <Field type="checkbox" name={`voluntarios[${index}]`} id={`voluntarios[${index}]`} value={voluntario.idVoluntario} />
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