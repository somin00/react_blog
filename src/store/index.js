import { combineReducers } from 'redux';
import users, { usersSaga } from './modules/users';
import loading from './modules/loading';
import posts, { getSaga, postsSaga } from './modules/posts';
import { all } from 'redux-saga/effects';
import read, { readSaga } from './modules/read';

export function* rootSaga() {
  yield all([usersSaga(), postsSaga(), readSaga(), getSaga()]);
}

const rootReducer = combineReducers({
  users,
  loading,
  posts,
  read,
});

export default rootReducer;
