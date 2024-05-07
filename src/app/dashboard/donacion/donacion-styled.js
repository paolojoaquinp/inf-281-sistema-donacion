import styled from "styled-components";


export const AlimentosWrapper = styled.div`
    display: flex;
`;

export const DonacionStyles = styled.div`  
    max-width: 1200px;
    padding: 10px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    /* oculto lo que queda fuera del .contenedor */
    contain: paint;
/* SECCION CONTENEDOR DE ITEMS */
    .contenedor-items{
        margin-top: 30px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        grid-gap:30px;
        grid-row-gap: 30px;
        /* width: 60%; */
        width: ${props => props.isOpen ? "60%" : "100%"};
        transition: .3s;
    }
    /* seccion carrito */



/* SECCION RESPONSIVE */
@media screen and (max-width: 850px) {
    .contenedor {
      display: block;
    }
    .contenedor-items{
        width: 100% !important;
    }
    .carrito{
        width: 100%;
    }
  }
`;