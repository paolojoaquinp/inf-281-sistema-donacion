import styled from "styled-components";


export const CardMyOrderWrapper = styled.div`
            display: flex;
            align-items: center;
            /* justify-content: space-between; */
            position: relative;
            border-bottom: 1px solid #666;
            padding: 20px;
            img{
               margin-right: 20px;
           }
            .carrito-item-titulo{
               display: block;
               font-weight: bold;
               margin-bottom: 10px;
               text-transform: uppercase;
               font-size: 1.4rem;
           }
            .selector-cantidad{
               display: inline-block;
               margin-right: 25px;
           }
            .carrito-item-cantidad{
               border: none;
               font-size: 18px;
               background-color: transparent;
               display: inline-block;
               width:30px;
               padding: 5px;
               text-align: center;
               &:disabled{
                 color: #000;
                }
           }
            .selector-cantidad i{
               font-size: 18px;
               width: 32px;
               height: 32px;
               line-height: 32px;
               text-align: center;
               border-radius: 50%;
               border: 1px solid #000;
               cursor: pointer;
           }
            .carrito-item-precio{
               font-weight: bold;
               display: inline-block;
               font-size: 18px;
               margin-bottom: 5px;
           }
            .btn-eliminar{
               position: absolute;
               right: 15px;
               top: 15px;
               color: #000;
               font-size: 20px;
               width: 40px;
               height: 40px;
               line-height: 40px;
               text-align: center;
               border-radius: 50%;
               border: 1px solid #000;
               cursor: pointer;
               display: block;
               background: transparent;
               z-index: 20;
           }
            .btn-eliminar i{
               pointer-events: none;
           }
`;