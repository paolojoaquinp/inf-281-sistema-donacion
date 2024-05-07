import styled from "styled-components";

export const CustomInputStyled = styled.div`
    display: flex;
    flex-direction: "row";
    align-items: center;
    margin-bottom: 10px;
    flex-wrap:wrap;
    label{
        width: 20%;
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 5px;
        display: block;
        font-size: 2rem;
    }
    input {
        width: 80%;
        padding: 10px 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
        font-weight: 600;
        transition: all 0.3s ease;
        border-radius: 5px;
        &:focus {
            border-color: #0070f3;
        }
    }

    select {
        font-size: 2rem;
        padding: 10px 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-weight: 600;
        transition: all 0.3s ease;
        width: 80%;
        &:focus {
            border-color: #0070f3;
        }
    }
    
`;