import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
//actions
import { showPosts, deletePost } from "../actions/postAction";
//draft js part
import draftToHtml from 'draftjs-to-html';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
//ant part
import { Button, Row, Col, Collapse, Empty, notification } from 'antd';
const { Panel } = Collapse;

function View() {
  const dispatch = useDispatch();
  //get posts and notifications from store
  const posts = useSelector(state => state.post.posts);
  const message = useSelector(state => state.post.notification);

  //runs when we click button to delete post
  const onDelete = (postId) => {
    //dispatches delete post action 
    dispatch(deletePost(postId));
  }

  useEffect(() => {
    //if notification in store changed it state
    if (message.type) {
      //then show it
      notification[message.type]({
        duration: 1,
        message: <span>{message.message}</span>
      });
    }
    //run action to gt all posts
    dispatch(showPosts());
  }, [dispatch, message])

  return (
    <Row justify="center">
      <Col span="12">
        {/* check if posts list is not empty  */}
        {posts.length ?
          <Collapse accordion>
            {/* iterate over list of posts  */}
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
          // if it sempty then show Empty component
          : <Empty />
        }
      </Col>
    </Row>
  );
}

export default View;