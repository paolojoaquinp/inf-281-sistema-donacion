import react, { useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import AuthContext from '@/app/context/auth';
import Link from 'next/link';
import { NavbarStyled } from './navbar-styled';
const Navbar = ({children}) => {
    const { auth, setAuth } = useContext(AuthContext);
    const router = useRouter();

    const handleLogout = async () => {
        console.log(auth.id);
        await axios.post('http://localhost:3001/api/usuarios/logout',{
            id: auth.id
        })
            .then(response => {
                console.log(response.data);
                setAuth({});
                router.push('/login');
            });
    }
    console.log(auth.id);
    return (
        <NavbarStyled >
            <h1>Sistema Donacion</h1>
            <div className="container__links">
                {auth.id ?
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
        </NavbarStyled >
    );
};

export default Navbar;