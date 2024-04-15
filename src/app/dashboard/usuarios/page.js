'use client'
import react, {useState} from 'react';
import PrimaryButton from '../../components/primary-button';
import { UsuariosWrapper } from './usuarios-styled';
import Link from 'next/link';
import Modal from '@/app/components/modal';


const Usuarios = () => {
    const [isOpen, setIsOpen] = useState(false);    
    return (
        <UsuariosWrapper>
            <div className='Head-usuarios__container'>
                <h1>Usuarios</h1>
                <p>Descripcion de usuarios</p>
                
                <div className='Head-usuarios-actions__container'>
                    <div className='Head-usuarios-filters'>
                        Filtrar por:
                    </div>
                    <div className='Head-usuarios-buttons__actions'>
                        <PrimaryButton onClick={() => setIsOpen(true)}>
                            Crear Usuario
                        </PrimaryButton>
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
        </UsuariosWrapper>
    );
};


export default Usuarios;

