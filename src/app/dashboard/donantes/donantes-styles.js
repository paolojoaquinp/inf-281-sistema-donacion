import styled from "styled-components";

export const DonantesWrapper = styled.div`
    h1 {
        font-size: 2.5rem;
        font-weight: 600;
        margin-bottom: 2%;
    }
    .block-data {
        opacity: 0.6;
        /* cursor: not-allowed; */
        pointer-events: none;
    }
    .form-section__container {
        background: #f3f3f3;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 3%;
        margin-bottom: 2%;
        h6 {
            font-size: 2rem;
            font-weight: 600;
            margin-bottom: 2%;
        }
        p {
            font-size: 1.5rem;
            margin-bottom: 2%;
        }
        .section__checkbox {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 2%;
            div {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
            }
            input[type="checkbox"] {
                width: 20px;
                height: 20px;
            }
            label {
                width: 100%;
                font-size: 1.5rem;
                margin-left: 1%;
            }
        
        }
    }
    span {
        color: red;
        display: inline-block;
        font-size: 2.5rem;
        width: 100%;
    }
    .input__subgroup {
        display: flex;
        justify-content: space-between;
        h2 {
            font-size: 2rem;
            font-weight: 600;
            margin-bottom: 2%;
        }
    }
`;