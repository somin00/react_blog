import axios from 'axios';

export const posts_axios = ({ title, body, tags }) => {
  return axios.post(
    'http://localhost:4000/api/posts',
    { title, body, tags },
    { withCredentials: true },
  );
};

export const read_axios = (id) => {
  return axios.get(`http://localhost:4000/api/posts${id}`, {
    withCredentials: true,
  });
};

export const get_axios = (page = 1) => {
  return axios.get(`http://localhost:4000/api/posts?page=${page}`, {
    withCredentials: true,
  });
};

export const update_axios = ({ id, title, body, tags }) => {
  return axios.patch(
    `http://localhost:4000/api/posts/${id}`,
    { title, body, tags },
    { withCredentials: true },
  );
};

// delete api/posts/:id -> remove
export const remove_axios = (id) => {
  return axios.delete(`http://localhost:4000/api/posts${id}`, {
    withCredentials: true,
  });
};
