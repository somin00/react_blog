import { call, put } from 'redux-saga/effects';
import { finishLoading, startLoading } from '../../store/modules/loading';

export const createRequestType = (type) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    yield put(startLoading(type));
    try {
      const res = yield call(request, action.payload);
      yield put({
        type: SUCCESS,
        payload: res.data,
        meta: res,
      });
    } catch (e) {
      console.log(e);
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(type));
  };
}
