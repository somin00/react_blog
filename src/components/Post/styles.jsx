import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  flex-direction: column;
  padding: 1rem 2rem;
`;

export const Box = styled.div`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  padding: 10px;
  min-width: 400px;
  height: 90px;
  text-overflow: ellipsis;
  h3:hover {
    cursor: pointer;
  }
`;

export const PageButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  /* margin-right: 4rem; */

  button {
    border: none;
    background-color: none;
    margin: 2px;
  }
`;
