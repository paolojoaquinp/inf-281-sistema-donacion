import react, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import AuthContext from '@/app/context/auth';
import Link from 'next/link';
import { NavbarStyled } from './navbar-styled';
import { MdOutlineNotifications } from "react-icons/md";

const Navbar = ({children}) => {
    const { auth, setAuth } = useContext(AuthContext);
    const [isNotification, setIsNotification] = useState(false);
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
        }
    }
    , [auth]);
    
    const fetchNotifications = async () => {
        await axios.get(`http://localhost:3001/api/notificacion/findById/${auth.id}`)
        .then((response) => {
            if(response.data.length > 0) {
                setIsNotification(true);
            }
        });
    };
    

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
                {isNotification ?
                    <div className="red-ball"></div>
                    : <></>
                }
                <MdOutlineNotifications size={30} color='white'/>
            </div>
        </NavbarStyled >
    );
};

export default Navbar;