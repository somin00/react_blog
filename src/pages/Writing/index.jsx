import React, { useCallback, useEffect } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useState } from 'react';
import { Button, Container, Form, Title } from './styles';
import Header from '../../components/Header';
import { useDispatch } from 'react-redux';
import draftToHtml from 'draftjs-to-html';
import posts, { post, reset } from '../../store/modules/posts';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';

const Writing = ({ history }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [tagText, setTagText] = useState('');
  const [body, setBody] = useState('');
  const [hashtag, setHashtag] = useState([]);
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const myPost = useSelector((state) => state.posts.post);
  const isLogin = useSelector((state) => state.users.isLogin);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const onChangeTag = (e) => {
    setTagText(e.target.value);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  // const onChangeBody = (e) => {
  //   setBody(e.target.value);
  // };
  // const onAddTag = useCallback(
  //   (tag) => {
  //     const buffer = [tag, ...hashtag];
  //     setHashtag(buffer);
  //   },
  //   [hashtag],
  // );

  // const onSubmitTag = useCallback(
  //   (e) => {
  //     e.preventDefault();
  //     // const buffer = [tagText, ...hashtag];
  //     // setHashtag(buffer);
  //     onAddTag(tagText);
  //     setTagText('');
  //   },
  //   [onAddTag, tagText],
  // );

  const onSubmitTag = useCallback(
    (e) => {
      e.preventDefault();
      setHashtag((prev) => [tagText, ...prev]);
      setTagText('');
    },
    [tagText],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const convertBody = convertToRaw(editorState.getCurrentContent());
      const data = { title, body: JSON.stringify(convertBody), tags: hashtag };
      dispatch(post(data));
    },
    [dispatch, editorState, hashtag, title],
  );

  useEffect(() => {
    if (myPost) {
      history.push(`/${myPost._id}`);
    }

    if (!isLogin) {
      history.push('/login');
    }
    return () => dispatch(reset());
  }, [dispatch, history, isLogin, myPost]);
  return (
    <Container>
      <Header />
      <Form onSubmit={onSubmit}>
        <Title
          type="text"
          className="title"
          placeholder="제목을 입력하세요."
          onChange={onChangeTitle}
        />
        <Editor
          editorState={editorState}
          wrapperClassName="wrapper-class"
          editorClassName="editor"
          toolbarClassName="toolbar-class"
          placeholder="내용을 작성하세요..."
          onEditorStateChange={onEditorStateChange}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
          }}
        />

        <div className="hashtag">
          <input
            type="text"
            placeholder="태그를 입력하세요."
            value={tagText}
            onChange={onChangeTag}
          ></input>
          <button onClick={onSubmitTag}>추가</button>
          <div>
            {hashtag.map((tag) => (
              <span>{`#${tag}  `}</span>
            ))}
          </div>
        </div>
        <Button type="submit">저장</Button>
      </Form>
    </Container>
  );
};

export default withRouter(Writing);
