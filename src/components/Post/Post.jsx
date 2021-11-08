import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import { getAll, post } from '../../store/modules/posts';
import { Box, Container } from './styles';

const Post = ({ history }) => {
  const posts = useSelector((state) => state.posts.posts);

  const dispatch = useDispatch();

  const onPushPost = (id) => {
    history.push(`/${id}`);
  };
  const convert = (contents) => {
    const rawData = EditorState.createWithContent(
      convertFromRaw(JSON.parse(contents)),
    );
    const result = draftToHtml(convertToRaw(rawData.getCurrentContent()));
    console.log(result);
    return result;
  };

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);
  return (
    <Container>
      {posts &&
        posts.map((post) => (
          <Box>
            <h3 onClick={() => onPushPost(post._id)}>{post.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: convert(post.body) }}></div>
          </Box>
        ))}
    </Container>
  );
};
export default withRouter(Post);
