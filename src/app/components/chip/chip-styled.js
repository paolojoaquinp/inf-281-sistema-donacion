import styled from "styled-components";
// estados: inicial | inactivo | aceptado | finalizado

export const ChipWrapper = styled.div`
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    font-size: 1.2rem;
    font-weight: 600;
    background-color: ${props => {
        switch (props.status) {
            case 'inicial':
                return '#f1c40f';
            case 'inactivo':
                return '#e74c3c';
            case 'aceptado':
                return '#2ecc71';
            case 'finalizado':
                return '#3498db';
            default:
                return '#f1c40f';
        }
    }};
    color: white;
    margin-right: 1rem;
    margin-bottom: 1rem;
`;