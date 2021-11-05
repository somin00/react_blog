import createRequestSaga, {
  createRequestType,
} from '../../lib/middleware/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import * as authApi from '../../lib/api/auth';

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestType('LOGIN');
const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =
  createRequestType('REGISTER');

const ISLOGIN = 'users/ISLOGIN';

const RESETUSER = 'users/RESETUSER';

export const login = (data) => {
  return {
    type: LOGIN,
    payload: data,
  };
};

export const register = (data) => {
  return {
    type: REGISTER,
    payload: data,
  };
};

export const isLogin = (user) => {
  return {
    type: ISLOGIN,
    payload: user,
  };
};

export const resetUser = () => {
  return {
    type: RESETUSER,
  };
};
const loginSaga = createRequestSaga(LOGIN, authApi.login_axios);
const registerSaga = createRequestSaga(REGISTER, authApi.register_axios);

export function* usersSaga() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(REGISTER, registerSaga);
}

const initialState = {
  user: null,
  userError: null,
  isLogin: null,
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        userError: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        userError: action.payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        userError: null,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        user: null,
        userError: action.payload,
      };
    case ISLOGIN:
      return {
        ...state,
        isLogin: action.payload,
      };
    case RESETUSER:
      return {
        ...state,
        user: null,
        isLogin: null,
      };
    default:
      return state;
  }
}
