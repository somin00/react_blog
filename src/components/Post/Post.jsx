/** @jsxImportSource @emotion/react */
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLocation, withRouter } from 'react-router';
import { getAll } from '../../store/modules/posts';
import { Box, Container, PageButton } from './styles';
import qs from 'qs';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';

const setLink = ({ page }) => {
  const query = qs.stringify({ page });
  return `?${query}`;
};

const Post = ({ history, location }) => {
  const posts = useSelector((state) => state.posts.posts);
  const [isDisable, setIsDisable] = useState(true);
  const lastPage = useSelector((state) => state.posts.postsPage);
  const dispatch = useDispatch();

  const { page = 1 } = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (location) {
    console.log('====================================');
    console.log(location.search);
    console.log('====================================');
  }

  const onPushPost = (id) => {
    history.push(`/${id}`);
  };
  const convert = (contents) => {
    const rawData = EditorState.createWithContent(
      convertFromRaw(JSON.parse(contents)),
    );
    const result = draftToHtml(convertToRaw(rawData.getCurrentContent()));
    return result;
  };

  // const onPrevPage = () => {
  //   setPage(page - 1);
  //   dispatch(getAll(page));
  // };

  useEffect(() => {
    dispatch(getAll(page));
  }, [dispatch, page]);
  return (
    <>
      <Container>
        {posts &&
          posts.map((post) => (
            <Box>
              <h3 onClick={() => onPushPost(post._id)}>{post.title}</h3>
              <div
                dangerouslySetInnerHTML={{ __html: convert(post.body) }}
              ></div>
            </Box>
          ))}
      </Container>
      <div>
        {page > 1 && <Link to={setLink({ page: page - 1 })}>이전</Link>}
        {parseInt(page, 10)}
        {page < lastPage && (
          <Link to={setLink({ page: parseInt(page) + 1 })}>다음</Link>
        )}
      </div>
    </>
  );
};
export default withRouter(Post);
