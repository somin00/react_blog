import Header from '../../components/Header';
import React, { useEffect } from 'react';
import { Container } from '../Auth/styles';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { reading } from '../../store/modules/read';
import { useLocation } from 'react-router';
import { reset } from '../../store/modules/posts';

const PostView = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(reading(pathname));
  }, [dispatch, pathname]);
  return (
    <div>
      <Header />
      <Container>
        <div>{}</div>
        <div>tag</div>
        <div>content</div>
      </Container>
    </div>
  );
};

export default PostView;
