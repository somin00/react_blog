import {combineReducers} from 'redux';
import users, { usersSaga } from './modules/users';
import loading from './modules/loading'; 
import {all} from 'redux-saga/effects'

export function* rootSaga() {
    yield all([usersSaga()])
}

const rootReducer = combineReducers({
    users, loading
})

export default rootReducer;