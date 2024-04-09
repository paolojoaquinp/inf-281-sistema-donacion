'use client'
import react, {useContext} from 'react';
import Navbar from "../navbar";
import { Providers } from '@/app/context';
import Link from "next/link";
import useAuth from '@/app/hooks/auth';
import AuthContext from '@/app/context/auth';

const Layout = ({ children }) => {
    const {auth, setAuth} = useContext(AuthContext);
    return (
        <div>
            <Providers>
                <Navbar>
                    <div className='navbar-actions__container'>
                        {0==0 ? 
                            <div className='group__links'>
                                <h3>Añadir Posts</h3>
                                <Link href="/dashboard/eventos">Evento</Link>
                                <Link href="/dashboard/educacion">Educacion</Link>
                                <Link href="/dashboard/norma">Norma</Link> 
                                <Link href="/dashboard/voluntarios">Voluntarios</Link> 
                                <Link href="/dashboard/beneficiarios">Beneficiarios</Link> 
                                <Link href="/dashboard/donantes">Donantes</Link> 
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
                {children}
            </Providers>
        </div>
    );
}

export default Layout;