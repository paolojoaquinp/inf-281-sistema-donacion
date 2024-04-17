import styled from "styled-components";

export const NotificacionesWrapper = styled.div`
    h1 {
        font-size: 2rem;
        margin-bottom: 16px;
    }   
    .table {
        background-color: white;
        border-radius: 16px;
        padding:1%;
        .table__head {
            font-size: 3rem;
            display:flex;
            width: 100%;
            padding: 1%;
            p {
                width: calc(100%/4);
                text-align: center; 
            }
        }
        .table__body {
            font-size: 5rem;
            width:100%;
            .table__row {
                border: 1px solid black;
                border-radius: 16px;
                display: flex;
                width: 100%;
                p {
                    width: calc(100%/3);
                    display: inline-block;
                    text-align:center;
                }
            }
        }
    }
`;