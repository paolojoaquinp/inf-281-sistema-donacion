import styled from "styled-components";

export const EventsContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: Arial, Helvetica, sans-serif;
    padding: 3% 20%;
    .events__header{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        h2{
           font-size: 2rem;
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