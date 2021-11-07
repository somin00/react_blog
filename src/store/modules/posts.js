import createRequestSaga, {
  createRequestType,
} from '../../lib/middleware/createRequestSaga';
import * as postApi from '../../lib/api/post';
import * as getApi from '../../lib/api/post';
import { takeLatest } from '@redux-saga/core/effects';
//const POSTS = 'posts/POSTS';

const [POSTS, POSTS_SUCCESS, POSTS_FAILURE] = createRequestType('POSTS');
const [GET_ALL, GET_ALL_SUCCESS, GET_ALL_FAILURE] =
  createRequestType('GET_ALL');
const RESET = 'posts/RESET';

export const post = (data) => {
  return {
    type: POSTS,
    payload: data,
  };
};

export const reset = () => {
  return {
    type: RESET,
  };
};

export const getAll = (data) => {
  return {
    type: GET_ALL,
    payload: data,
  };
};
const postSaga = createRequestSaga(POSTS, postApi.posts_axios);
const getAllPost = createRequestSaga(GET_ALL, getApi.get_axios);

export function* postsSaga() {
  yield takeLatest(POSTS, postSaga);
}

export function* getSaga() {
  yield takeLatest(GET_ALL, getAllPost);
}

const initialState = {
  post: null,
  postError: null,
  posts: null,
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case POSTS_SUCCESS:
      return {
        ...state,
        post: action.payload,
        postError: null,
      };
    case POSTS_FAILURE:
      return {
        ...state,
        post: null,
        postError: action.payload,
      };
    case RESET:
      return {
        ...state,
        post: null,
      };
    case GET_ALL_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        postError: null,
      };
    case GET_ALL_FAILURE:
      return {
        ...state,
        posts: null,
        postError: action.payload,
      };
    default:
      return state;
  }
}
