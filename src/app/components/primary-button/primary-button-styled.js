import styled from "styled-components";

export const PrimaryButtonStyled = styled.button`
    background-color: ${(props) => props.color || "#0070f3"};
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    transition: all 0.3s ease;
`;