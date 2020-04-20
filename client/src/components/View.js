import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import draftToHtml from 'draftjs-to-html';
import { showPosts, deletePost } from "../actions/postAction";
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button, Row, Col, Collapse, Empty, notification } from 'antd';

const { Panel } = Collapse;

function View() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.post.posts);
  const message = useSelector(state => state.post.notification);

  const onDelete = (postId) => {
    dispatch(deletePost(postId));
  }

  useEffect(() => {
    if (message.type) {
      notification[message.type]({
        duration: 1,
        message: <span>{message.message}</span>
      });
    }
    dispatch(showPosts());
  }, [dispatch, message])

  return (
    <Row justify="center">
      <Col span="12">
        {posts.length ?
          <Collapse accordion>
            {posts.map((post, index) => {
              return (
                <Panel header={post.topic} key={index}>
                  <div
                    dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(post.description)) }} >
                  </div>
                  <Link to={{ pathname: '/edit', state: { post: post } }}>Edit</Link>
                  <Button type="link" danger onClick={() => onDelete(post._id)}>Delete</Button>
                </Panel>
              )
            })}
          </Collapse>
          : <Empty />
        }
      </Col>
    </Row>
  );
}

export default View;