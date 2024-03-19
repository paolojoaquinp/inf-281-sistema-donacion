import react from 'react';
import Link from 'next/link';
import { NavbarStyled } from './navbar-styled';
const Navbar = () => {
    return (
        <NavbarStyled>
            <h1>Sistema Donacion</h1>
            <div className="container__links">
                <Link href="/eventos">Evento</Link>
                <Link href="/about">Educacion</Link>
                <Link href="/contact">Norma</Link>
            </div>
        </NavbarStyled>
    );
};

export default Navbar;