import styled from '@emotion/styled';

export const ButtonBox = styled.div`
  width: 800px;
  margin: 0 auto;
  margin-bottom: 1.5rem;

  button {
    border: none;
    border-radius: 13px;
    background-color: #f1f3f5;
    padding: 3px 7px;
    margin-right: 5px;
    color: #494949;
  }
  button:hover {
    cursor: pointer;
  }
`;
export const Post = styled.div`
  margin: 0 auto;
  width: 800px;

  h3 {
    font-weight: bolder;
    font-size: 1.5rem;
    color: #3a3a3a;
  }

  .detail-info {
    display: flex;

    .username {
      font-size: 1rem;
      color: #494949;
      margin-right: 1rem;
    }

    .date {
      font-size: 1rem;
      color: #888888;
    }
  }

  span {
    padding: 3px 7px;
    border-radius: 15px;
    background-color: #f1f3f5;
    color: gray;
    margin-right: 10px;
  }

  p {
    background-color: #f0f0f0;
    margin-top: 2rem;
  }
`;
