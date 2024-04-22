'use client'
import react, {useContext, useEffect, useState} from 'react';
import Navbar from "../navbar";
import { Providers } from '@/app/context';
import Link from "next/link";
import useAuth from '@/app/hooks/auth';
import AuthContext from '@/app/context/auth';
import { LayoutStyled } from './layout-styled';

const Layout = ({ children }) => {

    const [auth, setAuth] = useState({});

    useEffect(() => {
        const storedAuth = JSON.parse(localStorage.getItem('auth'));

        // rol: localStorage.getItem('auth'))
        if (storedAuth && storedAuth.token) {
            setAuth({
                id: storedAuth.id,
                token: storedAuth.token
            });
        }
    }, []);


    return (
        <LayoutStyled>
            <Providers>
                <Navbar>
                    <div className='navbar-actions__container'>
                        {auth?.id ? 
                            <div className='group__links'>
                                <h3>Añadir Posts</h3>
                                {/* rol == 'administador' || 'donante' */}
                                <Link href="/dashboard/eventos">Evento</Link>
                                <Link href="/dashboard/educacion">Educacion</Link>
                                <Link href="/dashboard/norma">Norma</Link> 
                                <Link href="/dashboard/donacion">Donacion</Link> 
                                <Link href="/dashboard/usuarios">Usuarios</Link> 
                            </div>
                            :
                            <></>
                        }
                        <div className='group__links'>
                            <h3>Portales: </h3>
                            <Link href="/portal/normas">Normas</Link>
                            <Link href="/portal/eventos">Eventos</Link>
                            <Link href="/portal/educacion">Educación</Link>
                        </div>
                        <div className='group__links'>
                            <h3>Reportes</h3>
                            <Link href="/dashboard/reportes/voluntarios">Voluntario</Link>
                        </div>
                    </div>
                </Navbar>
                <div className='layout-body__wrapper'>
                    {children}
                </div>
            </Providers>
        </LayoutStyled>
    );
}

export default Layout;