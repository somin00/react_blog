import React, { useEffect } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import AuthForm from './pages/Auth/AuthForm';
import { Route, Switch } from 'react-router';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Main from './pages/Main';
import Writing from './pages/Writing';
import { useDispatch } from 'react-redux';
import { isLogin } from './store/modules/users';
import PostView from './pages/PostView';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch(isLogin(user));
    }
  }, [dispatch]);
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/writing" component={Writing} />
        <Route path="/:postId" component={PostView} />
      </Switch>
    </div>
  );
}

export default App;
