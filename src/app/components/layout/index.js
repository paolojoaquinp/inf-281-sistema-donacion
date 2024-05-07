'use client'
import React, { useContext, useEffect, useState } from 'react';
import Navbar from "../navbar";
import { Providers } from '@/app/context';
import Link from "next/link";
import { LayoutStyled } from './layout-styled';
import AuthContext from '@/app/context/auth'; 

const Layout = ({ children }) => {

    return (
        <LayoutStyled>
            <Providers>
                <Navbar>
                    
                </Navbar>
                <div className='layout-body__wrapper'>
                    {children}
                </div>
            </Providers>
        </LayoutStyled>
    );
}

export default Layout;