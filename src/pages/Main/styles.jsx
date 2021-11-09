import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button`
  margin: 0 0 4rem 48rem;
  padding: 5px 10px;
  border: none;
  border-radius: 15px;
  background-color: #f1f3f5;
  color: gray;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;
