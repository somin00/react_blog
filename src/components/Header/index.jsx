import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Container } from './styles';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { isLogin } from '../../store/modules/users';
import { withRouter } from 'react-router';

const Header = ({ history }) => {
  const user = useSelector((state) => state.users.isLogin);
  const dispatch = useDispatch();
  console.log(user);

  const onLogout = useCallback(() => {
    axios
      .post('http://localhost:4000/api/auth/logout', null, {
        withCredentials: true,
      })
      .then(() => {
        localStorage.removeItem('user');
        dispatch(isLogin(null));
      })
      .catch((e) => console.log(e));
  }, [dispatch]);

  const onLogin = useCallback(() => {
    history.push('/login');
  }, [history]);
  return (
    <div>
      <Container>
        <h1>소민 블로그</h1>
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
