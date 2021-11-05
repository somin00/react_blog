import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Container, Form, LoginButton } from '../Auth/styles';
import { useDispatch } from 'react-redux';
import { isLogin, login, register } from '../../store/modules/users';
import { useSelector } from 'react-redux';

const AuthForm = ({ type, history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState(null);

  const { user, userError } = useSelector((state) => ({
    user: state.users.user,
    userError: state.users.userError,
    isLogin: state.users.isLogin,
  }));

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangeNickName = (e) => {
    setNickname(e.target.value);
  };

  const onChangePwd1 = (e) => {
    setPassword1(e.target.value);
  };

  const onChangePwd2 = (e) => {
    setPassword2(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = { username: email, password: password1 };

    if (type === 'signup') {
      dispatch(register(data));
    }

    if (type === 'login') {
      dispatch(login(data));
    }
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(isLogin(user));
      //수업듣고 돌아올게요잉 ㅇ잉
      history.push('/');
    }
    // 스토어에서 user와 isLogin을 초기화해주는 액션을 만들어서 활용하면 해결
    // 지금 문제가 로그아웃을하면 리덕스 스토아에서 user를 안 없애줘서 생기는 문제라
    // 초기화 액션 만들어주고 로그아웃할때 호출하면 쉽게 해결 가능
    if (userError) {
      setError(userError.message);
    }
  }, [dispatch, error, history, user, userError]);

  return (
    <Container>
      <h1>소민 블로그</h1>
      <Form>
        <input type="text" placeholder="Email" onChange={onChangeEmail}></input>
        {type === 'signup' && (
          <input
            type="text"
            placeholder="nickname"
            onChange={onChangeNickName}
          ></input>
        )}
        <input
          type="password"
          placeholder="PassWord"
          onChange={onChangePwd1}
        ></input>
        {type === 'signup' && (
          <input
            type="password"
            placeholder="PassWord Confirm"
            onChange={onChangePwd2}
          ></input>
        )}
        {userError && <p>{error}</p>}
        <LoginButton type="submit" onClick={onSubmit}>
          {type === 'login' ? '로그인' : '회원가입'}
        </LoginButton>
        {type === 'login' ? (
          <span>
            아직 회원이 아니십니까?
            <Link to="/signup">회원가입</Link>
          </span>
        ) : (
          <span>
            이미 회원이십니까?
            <Link to="/login">로그인</Link>
          </span>
        )}
      </Form>
    </Container>
  );
};

export default withRouter(AuthForm);
