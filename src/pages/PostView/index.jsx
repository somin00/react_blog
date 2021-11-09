import Header from '../../components/Header';
import React, { useEffect, useState } from 'react';
import { Container } from '../Auth/styles';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import read, { reading } from '../../store/modules/read';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { useLocation, withRouter } from 'react-router';
import { remove, reset } from '../../store/modules/posts';
import parsingHtmlTag from '../../lib/middleware/parsingHtmlTag';
import { ButtonBox, Post } from './styles';
import draftToHtml from 'draftjs-to-html';

const PostView = ({ history }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const postContent = useSelector((state) => state.read.read);
  const isLogin = useSelector((state) => state.users.isLogin);
  const removePost = useSelector((state) => state.posts.remove);
  const removeError = useSelector((state) => state.posts.removeError);

  const convert = (contents) => {
    const rawData = EditorState.createWithContent(
      convertFromRaw(JSON.parse(contents)),
    );
    const result = draftToHtml(convertToRaw(rawData.getCurrentContent()));
    console.log(result);
    return result;
  };

  const onPushUpdate = () => {
    history.push('/edit');
  };

  const onRemovePost = () => {
    dispatch(remove(pathname));

    if (!removeError) {
      history.push('/');
    }
  };

  useEffect(() => {
    dispatch(reading(pathname));
  }, [dispatch, pathname]);

  return (
    <div>
      <Header />
      {postContent?.user?.username === isLogin?.username && (
        <ButtonBox>
          <button onClick={onPushUpdate}>수정</button>
          <button onClick={onRemovePost}>삭제</button>
        </ButtonBox>
      )}

      {postContent && (
        <Post>
          <h3>{postContent.title}</h3>
          <div className="detail-info">
            <h3 className="username">{postContent.user.username}</h3>
            <h3 className="date">{postContent.publishedDate}</h3>
          </div>
          {postContent.tags.length !== 0 &&
            postContent.tags.map((tag) => <span>{tag}</span>)}
          {postContent && (
            <div
              dangerouslySetInnerHTML={{ __html: convert(postContent.body) }}
            ></div>
          )}
        </Post>
      )}
    </div>
  );
};

export default withRouter(PostView);
