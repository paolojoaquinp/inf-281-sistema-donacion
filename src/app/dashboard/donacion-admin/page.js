'use client'
import react, {useState, useEffect} from 'react';
import PrimaryButton from '@/app/components/primary-button';
import { DonacionAdminWrapper } from './donacion-admin-styled';
import Chip from '@/app/components/chip';
import Link from 'next/link';
import Modal from '@/app/components/modal';
import axios from 'axios';

const DonacionesAdmin = () => {
    const [isOpen, setIsOpen] = useState(false);    
    const [donaciones, setDonaciones] = useState([]);
    const [indexDonacion, setIndexDonacion] = useState(0);

    const fetchDonaciones = async () => {
        try {
            const donacionesResponse = await axios.get('http://localhost:3001/api/donaciones/getAll');
            if(donacionesResponse.data.length > 0 || donacionesResponse.data !== null) {
                setDonaciones(donacionesResponse.data);
                console.log(donaciones);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDonation = async () => {
        try {
            const donacion = donaciones[indexDonacion];
            const response = await axios.put(`http://localhost:3001/api/donaciones/update`, {
                id: donacion.id,
                idDonante: donacion.iddonante,
                estado: 'finalizado',
                lat: donacion.lat,
                lng: donacion.lng,
                fechaRecoger: donacion.fecharecoger
            }).then(() => {
                setIsOpen(false);
                setIndexDonacion(0);
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }
    const handleDonationCancel = async () => {
        try {
            const donacion = donaciones[indexDonacion];
            const response = await axios.put(`http://localhost:3001/api/donaciones/update`, {
                id: donacion.id,
                idDonante: donacion.iddonante,
                estado: 'inactivo',
                lat: donacion.lat,
                lng: donacion.lng,
                fechaRecoger: donacion.fecharecoger
            }).then(() => {
                setIsOpen(false);
                setIndexDonacion(0);
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    


    // useeffect if we come here form an Link using routing
    useEffect(() => {
        fetchDonaciones();
        console.log('fetching donaciones...');

    }, []);

    return (
        <DonacionAdminWrapper>
            <div className='Head-usuarios__container'>
                <h1>Donaciones</h1>
                <p>Donaciones de todos los donadores</p>
                
                <div className='Head-usuarios-actions__container'>
                    <div className='Head-usuarios-filters'>
                        Filtrar por:
                    </div>
                    <div className='Head-usuarios-buttons__actions'>
                        <PrimaryButton onClick={() => setIsOpen(true)}>
                            Crear Donacion
                        </PrimaryButton>
                    </div>
                </div>
                <div className='donations__section'>
                   <div className='donations__header'></div>
                     <div className='donations__body'>
                        <div className='donation__card--head'>
                            <p>Nombre Donador</p>
                            <p>email</p>
                            <p>Fecha entrega</p>
                            <p>Estado</p>
                            <p>Acciones</p>
                        </div>
                        {donaciones.map((donacion, index) => (
                             <div key={index} className='donation__card'>
                                <p>{donacion.nombre}</p>
                                <p>{donacion.email}</p>
                                <p>{donacion.fechaentregar}</p>
                                <p>
                                    <Chip label={donacion.estado} />
                                </p>
        
                                <div className='donation__actions'>
                                    {donacion.estado === 'inicial'
                                        ?
                                            <Link href={`/dashboard/donacion-admin/form/${encodeURIComponent(donacion.id)}`}>
                                                <p>Asignar Voluntarios</p>
                                            </Link>
                                        :
                                            (donacion.estado==='aceptado' || donacion.estado === 'finalizado' || donacion.estado === 'inactivo')
                                            ? <PrimaryButton onClick={() => {
                                                setIsOpen(!isOpen);
                                                setIndexDonacion(index);
                                            }}
                                            >
                                                Check Donacion
                                            </PrimaryButton>
                                            : <p>
                                                Donacion Finalizada
                                            </p>
                                    }
                                                    
                                </div>
                            </div>
                        ))}
                     </div>
                </div>
            </div>

            <div className='Tab-menu-usuarios__container'></div>
            <div className='Usuarios__container'></div>
            <Modal isOpen={isOpen}>
                <h1>Check Donacion</h1>
                <p>La donacion se ha realizado con exito?</p>
                <button onClick={() =>{
                        setIsOpen(false);
                    setIndexDonacion(0);
                }} >x</button>
                <div className='wrapper__options'>
                    <PrimaryButton onClick={handleDonation}>
                        Si
                    </PrimaryButton>
                    <PrimaryButton onClick={handleDonationCancel}>
                        No
                    </PrimaryButton>
                </div>
            </Modal>
        </DonacionAdminWrapper>
    );
};


export default DonacionesAdmin;

