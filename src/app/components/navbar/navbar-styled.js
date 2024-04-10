import styled from "styled-components";

export const NavbarStyled = styled.div`
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
        width: 70%;
        a {
            padding-right: 5%;
        }
        .navbar-actions__container {
            font-size: 3rem;
            display: flex;
            justify-content: space-between;
            .group__links {
                h3 {
                    font-size:1.5rem;
                    font-style: bold;
                }
            }
        }
    }

    .notifications__wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        .red-ball {
            position: absolute;
            width: 10px;
            height: 10px;
            background-color: red;
            border-radius: 50%;
            top: 0;
            right: 0;
        }
    }
`;