import React, { useCallback, useEffect } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useState } from 'react';
import { Button, Container, Form, Title } from '../Writing/styles';
import Header from '../../components/Header';
import { useDispatch } from 'react-redux';
import draftToHtml from 'draftjs-to-html';
import posts, { post, reset, update } from '../../store/modules/posts';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';

const Edit = ({ history }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [tagText, setTagText] = useState('');
  const [body, setBody] = useState('');
  const [hashtag, setHashtag] = useState([]);
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const myPost = useSelector((state) => state.posts.post);
  const isLogin = useSelector((state) => state.users.isLogin);
  const readPost = useSelector((state) => state.read.read);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    console.log(editorState);
  };

  const onChangeTag = (e) => {
    setTagText(e.target.value);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

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
      if (readPost) {
        const convertBody = convertToRaw(editorState.getCurrentContent());
        const data = {
          id: readPost?._id,
          title,
          body: JSON.stringify(convertBody),
          tags: hashtag,
        };
        dispatch(update(data));
      }
      history.push('/');
    },
    [dispatch, editorState, hashtag, history, readPost, title],
  );

  useEffect(() => {
    // if (myPost) {
    //   history.push(`/${myPost._id}`);
    // }

    if (readPost) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(readPost.body)),
        ),
      );
      setTitle(readPost.title);
      setHashtag(readPost.tags);
    }

    if (!isLogin) {
      history.push('/login');
    }
    return () => dispatch(reset());
  }, [dispatch, history, isLogin, myPost, readPost]);
  return (
    <Container>
      <Header />
      <Form onSubmit={onSubmit}>
        <Title
          type="text"
          className="title"
          placeholder="제목을 입력하세요."
          value={title}
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
        <Button type="submit">수정</Button>
      </Form>
    </Container>
  );
};

export default withRouter(Edit);
