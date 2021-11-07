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

export const get_axios = () => {
  return axios.get('http://localhost:4000/api/posts', {
    withCredentials: true,
  });
};
