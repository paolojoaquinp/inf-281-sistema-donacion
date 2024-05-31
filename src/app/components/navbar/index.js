import react, { use, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import AuthContext from '@/app/context/auth';
import Link from 'next/link';
import { NavbarStyled } from './navbar-styled';
import { MdOutlineNotifications } from "react-icons/md";

const Navbar = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const [isNotification, setIsNotification] = useState(false);
    const [role, setRole] = useState('');
    const router = useRouter();

    useEffect(() => {
        const storedAuth = JSON.parse(localStorage.getItem('auth'));
        if (storedAuth && storedAuth.token) {
            setAuth({
                id: storedAuth.id,
                token: storedAuth.token
            });
        }
    }, []);
    useEffect(() => {
        
        if(auth.id) {
            fetchNotifications();
            setRole(localStorage.getItem('rol'));
        }
    }
    , [auth]);

    useEffect(() => {
        setRole(localStorage.getItem('rol'));
    }, [role]);
    
    const fetchNotifications = async () => {
        const rol = localStorage.getItem('rol');
        if(rol === 'administrador') {
            await axios.get(`http://localhost:3001/api/notificacion/getAll`)
            .then((response) => {
                if(response.data.length > 0) {
                    setIsNotification(true);
                }
            });
        }
        if(rol === "donante") {
            await axios.get(`http://localhost:3001/api/notificacion/findById/${auth.id}`)
            .then((response) => {
                if(response.data.length > 0) {
                    setIsNotification(true);
                }
            });
        }


/*         await axios.get(`http://localhost:3001/api/notificacion/findById/${auth.id}`)
        .then((response) => {
            if(response.data.length > 0) {
                setIsNotification(true);
            }
        }); */
    };
    

    const handleLogout = async () => {
        await axios.post('http://localhost:3001/api/usuarios/logout',{
            id: auth.id
        })
            .then(response => {
                console.log(response.data);
                setAuth({});
                router.push('/login');
                localStorage.setItem('rol','');
                setRole(localStorage.getItem('rol'));
            });
    }
    return (
        <NavbarStyled >
            <Link href="/dashboard">
                <h1>Sistema Donacion</h1>
                <p className='role_text'>Rol: {role}</p>
            </Link>
            <div className="container__links">
                {auth.id !== undefined ?
                    <>
                        <button onClick={handleLogout}>Cerrar Sesion</button> 
                        <br />
                        <br />
                    </>
                    : <div>
                        <Link href="/login">Iniciar Sesion</Link>
                    </div>
                }
                {/* Auth Roles "prev children" */}
                    <div className='navbar-actions__container'>
                        {auth.id
                             ? 
                            <>
                                {/* Enlaces para Admin */}
                                {role === 'administrador' && (
                                    <div className='group__links'>
                                        <h3>Admin Links</h3>
                                        <Link href="/dashboard/eventos">Evento</Link>
                                        <Link href="/dashboard/educacion">Educación</Link>
                                        <Link href="/dashboard/norma">Norma</Link>
                                        <Link href="/dashboard/donacion">Donación</Link>
                                        <Link href="/dashboard/usuarios">Usuarios</Link>
                                        <Link href="/dashboard/reportes/voluntarios">Reportes</Link>
                                    </div>
                                )}

                                {/* Enlaces para Voluntario */}
                                {role === 'voluntario' && (
                                    <div className='group__links'>
                                        <h3>Voluntario Links</h3>
                                        <Link href="/portal/normas">Normas</Link>
                                        <Link href="/portal/eventos">Eventos</Link>
                                        <Link href="/portal/educacion">Educación</Link>
                                        <Link href="/dashboard/reportes/voluntarios">Reportes</Link>
                                    </div>
                                )}

                                {/* Enlaces para Donante */}
                                {role === 'donante' && (
                                    <div className='group__links'>
                                        <h3>Donante Links</h3>
                                        <Link href="/portal/normas">Normas</Link>
                                        <Link href="/portal/eventos">Eventos</Link>
                                        <Link href="/portal/educacion">Educación</Link>
                                        <Link href="/dashboard/donacion">Donación</Link>
                                    </div>
                                )}

                                {/* Enlaces para Beneficiario */}
                                {role === 'beneficiario' && (
                                    <div className='group__links'>
                                        <h3>Beneficiario Links</h3>
                                        <Link href="/portal/normas">Normas</Link>
                                        <Link href="/portal/eventos">Eventos</Link>
                                        <Link href="/portal/educacion">Educación</Link>
                                        <Link href="/dashboard/beneficiarios/solicitud">Solicitud</Link>  
                                    </div>
                                )}
                                {role === '' && (
                                    <div className='group__links'>
                                        <h3>Bienvenido</h3>
                                        <Link href="/portal/normas">Normas</Link>
                                        <Link href="/portal/eventos">Eventos</Link>
                                        <Link href="/portal/educacion">Educación</Link>
                                        
                                    </div>
                                )}
                            </>
                            :
                            <p>No user is logged in.</p>
                        }
                    </div>
                {/* end */}
            </div>
            <div className='notifications__wrapper'>
                <Link href="/dashboard/notificaciones">
                    {isNotification ?
                        <div className="red-ball"></div>
                        : <></>
                    }
                    <MdOutlineNotifications size={30} color='white'/>
                </Link>
            </div>
        </NavbarStyled >
    );
};

export default Navbar;