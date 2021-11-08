import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import Post from '../../components/Post/Post';
import Home from '../../layouts/home';
import { Button, Container } from '../Main/styles';

const Main = ({ history }) => {
  const isLogin = useSelector((state) => state.users.isLogin);
  const onClick = () => {
    history.push('/writing');
  };

  return (
    <Home>
      <Container>
        <div style={{ height: '30px' }}>
          {isLogin && <Button onClick={onClick}>글 작성하기</Button>}
        </div>
        <Post />
      </Container>
    </Home>
  );
};

export default withRouter(Main);
