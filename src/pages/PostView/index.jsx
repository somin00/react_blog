import Header from '../../components/Header';
import React, { useEffect, useState } from 'react';
import { Container } from '../Auth/styles';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import read, { reading } from '../../store/modules/read';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { useLocation } from 'react-router';
import { reset } from '../../store/modules/posts';
import parsingHtmlTag from '../../lib/middleware/parsingHtmlTag';
import { Post } from './styles';
import draftToHtml from 'draftjs-to-html';

const PostView = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const postContent = useSelector((state) => state.read.read);
  const isLogin = useSelector((state) => state.users.isLogin);

  const convert = (contents) => {
    const rawData = EditorState.createWithContent(
      convertFromRaw(JSON.parse(contents)),
    );
    const result = draftToHtml(convertToRaw(rawData.getCurrentContent()));
    console.log(result);
    return result;
  };

  useEffect(() => {
    dispatch(reading(pathname));
  }, [dispatch, pathname]);

  useEffect(() => {
    if (postContent) {
    }
  }, [postContent]);
  return (
    <div>
      <Header />
      {postContent?.user?.username === isLogin?.username && (
        <div>
          <button>수정</button>
          <button>삭제</button>
        </div>
      )}

      {postContent && (
        <Post>
          <h3>{postContent.title}</h3>
          <div className="detail-info">
            <h3 className="username">{postContent.user.username}</h3>
            <h3 className="date">{postContent.publishedDate}</h3>
          </div>
          <span>{postContent.tags}</span>
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

export default PostView;
