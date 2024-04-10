import react, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import AuthContext from '@/app/context/auth';
import Link from 'next/link';
import { NavbarStyled } from './navbar-styled';
import { MdOutlineNotifications } from "react-icons/md";
import { NotificationContext } from '@/app/context/chat/NotificationContext';

const Navbar = ({children}) => {
    const { auth, setAuth } = useContext(AuthContext);
    const router = useRouter();

    // state socket
    const { notificationState } = useContext(NotificationContext);
    console.log("notificationState: ", notificationState.notificaciones);

    useEffect(() => {
        const storedAuth = JSON.parse(localStorage.getItem('auth'));
        if (storedAuth && storedAuth.token) {
            setAuth(storedAuth);
            console.log("storedAuth: ", storedAuth);
        }
    }, []);

    const handleLogout = async () => {
        await axios.post('http://localhost:3001/api/usuarios/logout',{
            id: auth.id
        })
            .then(response => {
                console.log(response.data);
                setAuth({});
                router.push('/login');
            });
    }
    return (
        <NavbarStyled >
            <Link href="/dashboard">
                <h1>Sistema Donacion</h1>
            </Link>
            <div className="container__links">
                {auth ?
                    <>
                        <button onClick={handleLogout}>Cerrar Sesion</button> 
                        <br />
                        <br />
                    </>
                    : <div>
                        <Link href="/login">Iniciar Sesion</Link>
                    </div>
                }
                {children}
            </div>
            <div className='notifications__wrapper'>
                {notificationState.notificaciones.length > 0 ?
                    <div className="red-ball"></div>
                    : <></>
                }
                <MdOutlineNotifications size={30} color='white'/>
            </div>
        </NavbarStyled >
    );
};

export default Navbar;