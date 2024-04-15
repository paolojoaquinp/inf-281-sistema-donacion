import React from 'react';
import { PrimaryButtonStyled } from './primary-button-styled';

const PrimaryButton = ({ children, ...props }) => {
    return (
        <PrimaryButtonStyled {...props}>
            {children}
        </PrimaryButtonStyled>
    );
}

export default PrimaryButton;