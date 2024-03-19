import styled from "styled-components";

export const NavbarStyled = styled.nav`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 2% 10%;
    margin: 0;
    background-color: #282c34;
    justify-content: space-between;
    align-items: center;
    h1 {
        color: white;
        font-size: 2rem;
    }
    > .container__links {
        font-size: 2rem;
        color: white;
        a {
            padding-right: 5%;
        }
    }
`;