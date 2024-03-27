import styled from 'styled-components';

export const WelcomeContainer = styled.div`
  background-color: #fafafa;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 25px; // Tamaño de fuente aumentado para todo el contenedor principal
  color: #333;
  margin: 20px auto;
  max-width: 1000px;
`;

export const ImageContainer = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;
  
  img {
    border-radius: 20px;
    max-width: 100%;
    height: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
`;

export const Section = styled.div`
  margin-top: 20px;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1.5rem; // Tamaño de fuente aumentado para toda la sección

  h3 {
    font-size: 1.8rem; // Tamaño de fuente aumentado para h3 dentro de la sección
    margin-bottom: 10px; // Espaciado inferior entre h3 y p
  }

  p {
    font-size: 1.2rem; // Tamaño de fuente aumentado para p dentro de la sección
    line-height: 1.6; // Espaciado entre líneas para mejorar la legibilidad
  }
`;

export const Icon = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 15px;
`;

export const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const Subtitle = styled.h3`
  font-size: 1.8rem;
  margin-top: 20px;
`;

export const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.6;
`;
