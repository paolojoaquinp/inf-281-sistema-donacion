import styled from 'styled-components';

export const LoginStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #282c34;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    padding: 10% 0;
    form {
        display: flex;
        flex-direction: column;
        width: 30%;
        h1 {
            margin-bottom: 20px;
            font-size: 5rem;
            text-align: center;
        }
        span {
            color: red;
            font-size: 1.2rem;
        }
        .form-group {
            display: flex;
            flex-direction: column;
            margin: 10px 0;
            label {
                margin-bottom: 5px;
                font-size: 2rem;
            }
        }
        input {
            margin: 10px 0;
            padding: 10px;
            font-size: 1.2rem;
            border: none;
            border-radius: 5px;
        }
        button {
            margin: 10px 0;
            padding: 10px;
            font-size: 1.2rem;
            border: none;
            border-radius: 5px;
            background-color: #4CAF50;
            color: white;
            cursor: pointer;
        }
        .hint-text{
            font-size: 1.8rem;
            text-align: center;
            a {
                font-size: 1.8rem;
                color: #4CAF50;
                text-decoration: none;
            }
        }
    }
`;
