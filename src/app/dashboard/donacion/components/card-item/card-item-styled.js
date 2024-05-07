import styled from "styled-components";

export const CardItemStyles = styled.div` 
        max-width: 200px;
        margin: auto;
        border: 1px solid #666;
        border-radius: 10px;
        padding: 20px;
        transition: .3s;
        &:hover{
            box-shadow: 0 0 10px #666;
            scale: 1.05;
        }
        .img-item{
            width: 100%;
        }
        .titulo-item{
            display: block;
            font-weight: bold;
            text-align: center;
            text-transform: uppercase;
            font-size: 1.6rem;
        }
        .precio-item{
            display: block;
            text-align: center;
            font-weight: bold;
            font-size: 1.8rem;
        }
        
        .boton-item{
            display: block;
            margin: 10px auto;
            border: none;
            background-color: rgb(142, 204, 129);
            color: #0a0707;
            padding: 5px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1.4rem;
        }
`;