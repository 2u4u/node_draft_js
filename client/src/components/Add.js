import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { addPost } from "../actions/postAction";
import { Row, Col, Form, Input, Button, notification } from 'antd';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function Add(props) {
  const dispatch = useDispatch();
  const message = useSelector(state => state.post.notification);
  const post = props.location.state ? props.location.state.post : "";
  const description = post ? post.description : ""
  const id = post ? post._id : ""

  const editorContent = post ?
    EditorState.createWithContent(convertFromRaw(JSON.parse(description))) :
    EditorState.createEmpty();

  const [editorState, setEditorState] = useState({ editorState: editorContent });
  const [topic, setTopic] = useState(post.topic);

  const handleEditorChange = (editorState) => {
    setEditorState({ editorState });
  }

  const onSubmit = () => {
    const newPost = {
      id,
      topic,
      description: JSON.stringify(convertToRaw(editorState.editorState.getCurrentContent())),
    };
    dispatch(addPost(newPost));
  }

  useEffect(() => {
    if (message.type) {
      notification[message.type]({
        duration: 1,
        message: <span>{message.message}</span>
      });
    }
  }, [message])

  return (
    <Row justify="center">
      <Col span="12">
        <Form
          onFinish={onSubmit}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ topic }}
        >
          <Form.Item
            label="Topic"
            name="topic"
          >
            <Input onChange={e => setTopic(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
          >
            <Editor
              editorState={editorState.editorState}
              onEditorStateChange={handleEditorChange}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
            />
          </Form.Item>
          <div style={{ textAlign: "center" }}>
            <Button type="primary" htmlType="submit">Add post</Button>
          </div>
        </Form>
      </Col>
    </Row>

  );
}

export default Add;