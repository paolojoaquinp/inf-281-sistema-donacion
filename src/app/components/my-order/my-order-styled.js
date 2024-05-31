import styled from "styled-components";

// receive props to opacity prop
export const MyOrderWrapper = styled.aside`
        border: 1px solid #666;
        width: 35%;
        margin-top: 30px;
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: auto;
        position: sticky !important;
        top: 0;
        transition: .3s;
        /* Estilos para ocultar */
        margin-right: ${props => props.isCartOpen ? "0" : "-100%"};
        opacity: ${props => props.isCartOpen ? "1" : "0"};
        .header-carrito{
            background-color: #000;
            color: #fff;
            text-align: center;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            h2 {
                font-size: 1.8rem;
            }
        }

        .carrito-total{
            background-color: #f3f3f3;
            padding: 30px;
            .fila{
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 22px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .btn-pagar{
                display: block;
                width: 100%;
                border: none;
                background: #000;
                color: #fff;
                border-radius: 5px;
                font-size: 18px;
                padding: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: pointer;
                transition: .3s;
            }
            .btn-pagar:hover{
                scale: 1.05;
            }
        }
`;
