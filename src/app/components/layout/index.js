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
                    {0==0 ? 
                        <>
                            <h5>Añadir Posts</h5>
                            <Link href="/dashboard/eventos">Evento</Link>
                            <Link href="/dashboard/educacion">Educacion</Link>
                            <Link href="/dashboard/norma">Norma</Link> 
                            <Link href="/dashboard/voluntarios">Voluntarios</Link> 
                        </>
                        :
                        <></>
                    }
                    <h3>Portales: </h3>
                    <Link href="/portal/normas">Normas</Link>
                    <Link href="/portal/eventos">Eventos</Link>
                    <Link href="/portal/educacion">Educación</Link>
                    

                </Navbar>
                {children}
            </Providers>
        </div>
    );
}

export default Layout;