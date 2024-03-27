import styled, { keyframes } from 'styled-components';

// Animación para resaltar el evento
const hoverAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.009); }
  100% { transform: scale(1); }
`;

export const EventSection = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 5rem;
  display: grid;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #f0f0f0;
    animation: ${hoverAnimation} 1s infinite;
  }
`;

export const EventDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2% 0;
`;

export const EventImage = styled.img`
  width: 60%;
  border-radius: 8px;
  margin-right: 20px;
`;