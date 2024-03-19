import styled from "styled-components";

export const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    .content {
        background-color: white;
        padding: 1em;   
        width: 500px;
        font-family: Arial, sans-serif;
    }
    .header__modal {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1em;
    }
    form {
        display: flex;
        flex-direction: column;
        input {
            margin-bottom: 1em;
            padding: 0.5em;
        }
        .group__input {
            display: flex;
            flex-direction: column;
            margin-bottom: 1em;
            label {
                margin-bottom: 0.5em;
            }
        }
        button {
            padding: 1em;
            background-color: #000;
            color: white;
            border: none;
            cursor: pointer;
        }
    }
`;