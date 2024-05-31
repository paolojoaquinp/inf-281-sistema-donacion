'use client'
import react, {useState, useEffect} from 'react';
import PrimaryButton from '../../components/primary-button';
import { DonacionAdminWrapper } from './donacion-admin-styled';
import Link from 'next/link';
import Modal from '@/app/components/modal';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { messagesNotification } from '@/app/utils/constants';

const DonacionesAdmin = () => {
    const [isOpen, setIsOpen] = useState(false);    
    const [donacionesVoluntario, setDonacionesVoluntario] = useState([]);
    const router = useRouter();

    const fetchDonaciones = async () => {
        try {
            const auth = JSON.parse(localStorage.getItem('auth'));
            const donacionesResponse = await axios.get(`http://localhost:3001/api/voluntarioSolicitud/findById/${auth.id}`);
            if(donacionesResponse.data.length > 0 || donacionesResponse.data !== null) {
                setDonacionesVoluntario(donacionesResponse.data);
                console.log(donaciones);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // useeffect if we come here form an Link using routing
    useEffect(() => {
        fetchDonaciones();
        console.log('fetching donaciones...');

    }, []);

    const handleAccept = async (id, idDonacion, idDonante) => {
        try {
            const auth = JSON.parse(localStorage.getItem('auth'));
            const response = await axios.put(`http://localhost:3001/api/voluntarioSolicitud/update`, {
                id:id,
                idSolicitud: idDonacion,
                idVoluntario: auth.id,
                estado: 'aceptado'
            });
            
            const notification = await setNotification(auth.id, idDonante, 'aceptado')
                .then(() => {
                    router.push('/dashboard');
                });
        } catch (error) {
            console.error(error);
        }
    }

    const handleReject = async (id,idDonacion,idDonante) => {
        try {
            const auth = JSON.parse(localStorage.getItem('auth'));
            const response = await axios.put(`http://localhost:3001/api/voluntarioSolicitud/update`, {
                id: id,
                idSolicitud: idDonacion,
                idVoluntario: auth.id,
                estado: 'rechazado'
            });
            
            const notificacion = await setNotification(auth.id, idDonante, 'rechazado')
                .then(() => {
                    router.push('/dashboard');
                });
        } catch (error) {
            console.error(error);
        }
    }

    const setNotification = async (idVoluntario, idDonante, estado) => {
        try {
            await axios.post('http://localhost:3001/api/notificacion/create', {
                sender_id: idVoluntario,
                receiver_id: idDonante,
                message: estado,
                tipo: messagesNotification.RESPUESTA_SOLICITUD_VOLUNTARIO
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <DonacionAdminWrapper>
            <div className='Head-usuarios__container'>
                <h1>Mis Asignaciones de Solicitudes</h1>
                <p>asignaciones de solicitudes.</p>
                
                <div className='Head-usuarios-actions__container'>
                    <div className='Head-usuarios-filters'>
                        Filtrar por:
                    </div>
                </div>
                <br></br>
                <div className='donations__section'>
                   <div className='donations__header'></div>
                     <div className='donations__body'>
                        <div className='donation__card--head'>
                            <p>idSolicitud</p>
                            <p>Autor</p>
                            <p>Estado</p>
                            <p>Fecha Recoger</p>
                            <p>Acciones</p>
                        </div>
                        {donacionesVoluntario.map((donacion, index) => (
                             <div key={index} className='donation__card'>
                                <p>{donacion.idsolicitud}</p>
                                <p>{donacion.autor_name+' '+
                                    donacion.autor_paterno+' '+
                                    donacion.autor_materno}
                                </p>
                                <p>{donacion.estado}</p>
                                <p>{donacion.fecharecoger}</p>
        
                                <div className='donation__actions'>
                                    <PrimaryButton onClick={() => handleAccept(donacion.id, donacion.idsolicitud, donacion.donante_user_id)}>
                                        Aceptar
                                    </PrimaryButton>&nbsp;&nbsp;
                                    <PrimaryButton onClick={() => handleReject(donacion.id, donacion.idsolicitud, donacion.donante_user_id)}>
                                        Rechazar
                                    </PrimaryButton>
                                                    
                                </div>
                            </div>
                        ))}
                     </div>
                </div>
            </div>

            <div className='Tab-menu-usuarios__container'></div>
            <div className='Usuarios__container'></div>
            <Modal isOpen={isOpen}>
                <h1>Que tipo de usuario, quieres crear?</h1>
                <div className='wrapper__options'>
                        <Link href="/">Administrador</Link>
                        <Link href="/dashboard/voluntarios">Voluntarios</Link> 
                        <Link href="/dashboard/beneficiarios">Beneficiarios</Link> 
                        <Link href="/dashboard/donantes">Donantes</Link> 
                </div>
                <button onClick={() => setIsOpen(false)} >x</button>
            </Modal>
        </DonacionAdminWrapper>
    );
};


export default DonacionesAdmin;

