

import styled, { keyframes } from 'styled-components';

export const EventsContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: Arial, Helvetica, sans-serif;
    padding: 3% 20%;
    table {
      font-size: 6rem;
    }
    .events__header{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        h2{
           font-size: 4rem;
        }
        button {
          font-size: 1.2rem;
          padding: 10px;
          height: 50px;
          border-radius: 5px;
          background-color: #4CAF50;
          color: white;
          border: none;
            cursor: pointer;
        }
    }

    table {
        width: 100%;
        border-collapse: collapse;
        
    }
    

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
    }

    tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #4CAF50;
        color: white;
    }

    button {
        margin-right: 5px;
    }
`;


// Animación para resaltar el evento
const hoverAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.009); }
  100% { transform: scale(1); }
`;

export const EventosContainer = styled.div`
  background-color: #fafafa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #333;
  margin: 20px auto;
  max-width: 1000px;
`;

export const EventSection = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #f0f0f0;
    animation: ${hoverAnimation} 1s infinite;
  }
`;

export const EventImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 8px;
  margin-right: 20px;
`;

export const EventDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const EventTitle = styled.h2`
  font-size: 20px; /* Modifica el tamaño del título h2 */
  margin-bottom: 10px;
`;

export const EventDescription = styled.p`
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
`;

export const EventDate = styled.p`
  font-size: 12px;
  color: #777;
`;
