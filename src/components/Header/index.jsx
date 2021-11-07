import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Container } from './styles';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { isLogin, resetUser } from '../../store/modules/users';
import { withRouter } from 'react-router';

const Header = ({ history }) => {
  const user = useSelector((state) => state.users.isLogin);
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    axios
      .post('http://localhost:4000/api/auth/logout', null, {
        withCredentials: true,
      })
      .then(() => {
        localStorage.removeItem('user');
        dispatch(resetUser());
      })
      .catch((e) => console.log(e));
  }, [dispatch]);

  const onLogin = useCallback(() => {
    history.push('/login');
  }, [history]);

  const onMoveMain = () => {
    history.push('/');
  };
  return (
    <div>
      <Container>
        <h1 onClick={onMoveMain}>소민 블로그</h1>
        {user ? (
          <button onClick={onLogout}>로그아웃</button>
        ) : (
          <button onClick={onLogin}>로그인</button>
        )}
      </Container>
    </div>
  );
};
export default withRouter(Header);
