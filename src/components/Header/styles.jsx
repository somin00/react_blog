import styled from '@emotion/styled';

export const Container = styled.div`
  margin-top: 2.5rem;
  display: flex;
  justify-content: center;
  margin-bottom: 4rem;
  border-bottom: 1px solid gray;
  padding-bottom: 3rem;
  h1 {
    margin: 0 18rem 0 22rem;
    color: gray;
  }
  h1,
  button:hover {
    cursor: pointer;
  }

  button {
    width: 5rem;
    height: 2rem;
    margin-top: 5px;
    border: none;
    border-radius: 15px;
    background-color: #f1f3f5;
    font-weight: bold;
    color: gray;
  }
`;
