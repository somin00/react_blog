import styled from '@emotion/styled';

export const Title = styled.input`
  border: none;
  border-bottom: 1px solid gray;
  width: 100%;
  padding: 1.5rem 0 1.5rem 1rem;
  font-size: 1.2rem;
  font-weight: bold;
`;

export const Form = styled.form`
  width: 70%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 4rem;

  .wrapper-class {
    margin-top: 1rem;
  }

  .editor {
    border: 1px solid #f1f1f1;
    height: 300px;
  }

  .hashtag {
    margin-top: 1rem;

    input {
      border: 1px solid #f1f1f1;
    }

    button {
      border: none;
      background-color: gray;
      color: white;
      width: 50px;
      height: 26px;
    }
  }
`;

export const Container = styled.div`
  width: 100%;
`;

export const Button = styled.button`
  border: 1px solid gray;
  background-color: gray;
  color: white;
  width: 100px;
  margin-top: 1rem;
`;
