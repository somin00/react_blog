import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import { getAll, post } from '../../store/modules/posts';
import { Container } from './styles';

const Post = ({ history }) => {
  const posts = useSelector((state) => state.posts.posts);

  const dispatch = useDispatch();

  const onPushPost = (id) => {
    history.push(`/${id}`);
  };
  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);
  return (
    <Container>
      {posts &&
        posts.map((post) => (
          <div>
            <h3 onClick={() => onPushPost(post._id)}>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
    </Container>
  );
};
export default withRouter(Post);
