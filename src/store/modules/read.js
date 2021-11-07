import createRequestSaga, {
  createRequestType,
} from '../../lib/middleware/createRequestSaga';
import * as readApi from '../../lib/api/post';
import { takeLatest } from '@redux-saga/core/effects';

const [READ, READ_SUCCESS, READ_FAILURE] = createRequestType('READ');

export const reading = (id) => {
  return {
    type: READ,
    payload: id,
  };
};

const getRead = createRequestSaga(READ, readApi.read_axios);

export function* readSaga() {
  yield takeLatest(READ, getRead);
}

const initialState = {
  read: null,
  readError: null,
};

export default function read(state = initialState, action) {
  switch (action.type) {
    case READ_SUCCESS:
      return {
        ...state,
        read: action.payload,
        readError: null,
      };
    case READ_FAILURE:
      return {
        ...state,
        read: null,
        readError: action.payload,
      };
    default:
      return state;
  }
}
