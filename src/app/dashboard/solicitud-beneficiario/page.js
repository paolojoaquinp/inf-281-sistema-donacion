'use client'
import react, {useState, useEffect} from 'react';
import PrimaryButton from '../../components/primary-button';
import { DonacionAdminWrapper } from './donacion-admin-styled';
import Link from 'next/link';
import Modal from '@/app/components/modal';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { messagesNotification, Roles } from '@/app/utils/constants';
import Chip from '@/app/components/chip';

const DonacionesAdmin = () => {
    const [isOpen, setIsOpen] = useState(false);    
    const [donacionesVoluntario, setDonacionesVoluntario] = useState([]);
    const router = useRouter();
    const [rol, setRol] = useState('');

    const fetchDonaciones = async () => {
        try {
            const auth = JSON.parse(localStorage.getItem('auth'));
            const donacionesResponse = await axios.get(`http://localhost:3001/api/solicitud/findByUserId/${auth.id}`);
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
        setRol(localStorage.getItem('rol'));
        fetchDonaciones();
        console.log('fetching donaciones...');

    }, []);




    const setNotification = async (idVoluntario, idDonante, estado) => {
        try {
            await axios.post('http://localhost:3001/api/notificacion/create', {
                sender_id: idVoluntario,
                receiver_id: idDonante,
                message: estado,
                tipo: messagesNotification.RESPUESTA_SOLICITUD
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <DonacionAdminWrapper>
            <div className='Head-usuarios__container'>
                <h1>Mis Solicitudes</h1>
                <p>Listado de mis solicitudes.</p>
                
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
                            <p>idDonacion</p>
                            <p>Estado</p>
                            <p>Fecha Recoger</p>
                            <p>Acciones</p>
                        </div>
                        {donacionesVoluntario.map((donacion, index) => (
                             <div key={index} className='donation__card'>
                                <p>{donacion.id}</p>
                                <p>
                                    <Chip label={donacion.estado} />
                                </p>
                                <p>{donacion.fecharecoger}</p>
        
                                <div className='donation__actions'>
                                    {rol ===  Roles.VOLUNTARIO ? <>
                                        <PrimaryButton onClick={() => handleAccept(donacion.id, donacion.idsolicitud, donacion.donante_user_id)}>
                                            Aceptar
                                        </PrimaryButton>&nbsp;&nbsp;
                                        <PrimaryButton onClick={() => handleReject(donacion.id, donacion.idsolicitud, donacion.donante_user_id)}>
                                            Rechazar
                                        </PrimaryButton>
                                    </>
                                    :  rol === Roles.BENEFICIARIO   
                                        ? <Link href={`/dashboard/solicitud-beneficiario/form/${encodeURIComponent(donacion.id)}`}>
                                                <p>Ver Detalle</p>
                                            </Link>
                                        : <></>
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

