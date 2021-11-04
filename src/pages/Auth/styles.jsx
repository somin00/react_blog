import styled from '@emotion/styled';

export const Container=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100vh;
    h1{
        color: gray;
        text-align: center;
        margin-top: 9rem;
    }
`;

export const Form=styled.form`
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 4rem;
    input{
        margin: 1rem 0;
        width: 350px;
        height: 40px;
    }
    
    span{
        display:flex;
        margin: 1rem 0 0 auto;

        a{
            margin-left: 0.5rem;
            text-decoration: none;
            color: gray;
            font-weight: bold;
        }
    }
`;

export const LoginButton=styled.button`
    width: 350px;
    height: 40px;
    background-color: gray;
    color: #fff;
    border:none;
    margin-top: 1rem;
`;