import createRequestSaga, {
  createRequestType,
} from '../../lib/middleware/createRequestSaga';
import * as postApi from '../../lib/api/post';
import * as getApi from '../../lib/api/post';
import * as updataApi from '../../lib/api/post';
import * as removeApi from '../../lib/api/post';
import { takeLatest } from '@redux-saga/core/effects';
//const POSTS = 'posts/POSTS';

const [POSTS, POSTS_SUCCESS, POSTS_FAILURE] = createRequestType('POSTS');
const [GET_ALL, GET_ALL_SUCCESS, GET_ALL_FAILURE] =
  createRequestType('GET_ALL');
const [UPDATE, UPDATE_SUCCESS, UPDATE_FAILURE] = createRequestType('UPDATE');
const [REMOVE, REMOVE_SUCCESS, REMOVE_FAILURE] = createRequestType('REMOVE');

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

export const update = (data) => {
  return {
    type: UPDATE,
    payload: data,
  };
};

export const remove = (id) => {
  return {
    type: REMOVE,
    payload: id,
  };
};
const postSaga = createRequestSaga(POSTS, postApi.posts_axios);
const getAllPost = createRequestSaga(GET_ALL, getApi.get_axios);
const updatePost = createRequestSaga(UPDATE, updataApi.update_axios);
const removePost = createRequestSaga(REMOVE, removeApi.remove_axios);

export function* postsSaga() {
  yield takeLatest(POSTS, postSaga);
}

export function* getSaga() {
  yield takeLatest(GET_ALL, getAllPost);
}

export function* updateSaga() {
  yield takeLatest(UPDATE, updatePost);
}

export function* removeSaga() {
  yield takeLatest(REMOVE, removePost);
}

const initialState = {
  post: null,
  postError: null,
  posts: null,
  postsError: null,
  updatePost: null,
  updatePostError: null,
  remove: null,
  removeError: null,
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
    case UPDATE_SUCCESS:
      return {
        ...state,
        updatePost: action.payload,
      };
    case UPDATE_FAILURE:
      return {
        ...state,
        updatePost: null,
        updatePostError: action.payload,
      };
    case REMOVE_SUCCESS:
      return {
        ...state,
        remove: action.payload,
      };
    case REMOVE_FAILURE:
      return {
        ...state,
        removeError: action.payload,
      };
    default:
      return state;
  }
}
