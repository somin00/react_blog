import React, { useCallback, useEffect } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { useState } from 'react';
import { Button, Container, Form, Title } from './styles';
import Header from '../../components/Header';

const Writing = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [tagText, setTagText] = useState('');
  const [hashtag, setHashtag] = useState([]);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const onChange = (e) => {
    setTagText(e.target.value);
  };

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

  useEffect(() => {
    if (hashtag) {
      console.log('====================================');
      console.log(hashtag);
      console.log('====================================');
    }
  }, [hashtag]);
  return (
    <Container>
      <Header />
      <Form action="">
        <Title type="text" className="title" placeholder="제목을 입력하세요." />
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
            onChange={onChange}
          ></input>
          <button onClick={onSubmitTag}>추가</button>
          <div>
            {hashtag.map((tag) => (
              <span>{`#${tag}  `}</span>
            ))}
          </div>
        </div>
        <Button>저장</Button>
      </Form>
    </Container>
  );
};

export default Writing;
