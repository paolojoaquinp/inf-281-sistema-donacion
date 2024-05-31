import styled from "styled-components"

export const DonacionAdminWrapper = styled.div`
    font-size: 5.5rem;
    padding: 2% 5%;
    a {
        color: #0070f3;
        margin-right: 5px;
    }
    .Head-usuarios__container {
        display: flex;
        flex-direction: column;
        .Head-usuarios-actions__container {
            display: flex;
            justify-content: space-between;
            margin-top: 2rem;
        }
        margin-bottom: 2rem;
    }
    .donation__card--head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #f3f3f3;
        border-radius: 10px;
        padding: 2%;
        border: 1px solid #ccc;
        margin-bottom: 2%;

        p {
            font-size: 1.6rem;
            font-weight: 600;
            margin-bottom: 2%;
            text-align: center;
            width: 20%;
        }
        .donation__data--description {
            font-size: 1.5rem;
            margin-bottom: 2%;

        }
    }
    .donation__card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #f3f3f3;
        border-radius: 10px;
        padding: 2%;
        border: 1px solid #ccc;
        margin-bottom: 2%;

        p {
            display: flex;
            width: 20%;
            font-size: 1.4rem;
            text-align: center;
            font-weight: 600;
            margin-bottom: 2%;
        }
        .donation__data--description {
            font-size: 1.5rem;
            margin-bottom: 2%;
        }
        .donation__actions {
            p {
                font-size: 1.2rem;
                text-align: start;
                display: inline;
            }
        }
    }
`;