import styled from '@emotion/styled';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 200px;
  row-gap: 100px;
  flex-direction: column;
  margin: 0 auto 0 15rem;
  margin-top: 1rem;
`;

export const Box = styled.div`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  padding: 10px;
`;
