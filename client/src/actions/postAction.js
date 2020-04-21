import axios from "axios";
import { SHOW_ALL_POSTS, NOTIFICATION } from "./types";

// Add post
export const addPost = (postData) => dispatch => {
  axios
    .post("/api/add", postData) //add route endpoint we made in server.js
    .then(res => {
      //after successfull adding we will show notification 
      dispatch({ type: NOTIFICATION, payload: res.data });
      //which will disappear in 1 second
      setTimeout(() =>
        dispatch({ type: NOTIFICATION, payload: {} })
        , 1000);
    })
    .catch(err => {
      dispatch({
        type: NOTIFICATION, payload: {
          message: "Some problem occured, please try again",
          type: "error"
        }
      })
    });
};

// Add post
export const showPosts = () => dispatch => {
  axios
    .get("/api") //get route endpoint we made in server.js
    .then(res => {
      //pass all posts in redux store
      dispatch({ type: SHOW_ALL_POSTS, payload: res.data })
    })
    .catch(err => {
      dispatch({
        type: NOTIFICATION, payload: {
          message: "Some problem occured, please try again",
          type: "error"
        }
      })
    });
};

// Add post
export const deletePost = (postId) => dispatch => {
  axios
    .delete(`/api/${postId}`) //delete route endpoint we made in server.js
    .then(res => {
      dispatch({ type: NOTIFICATION, payload: res.data });
      setTimeout(() =>
        dispatch({ type: NOTIFICATION, payload: {} })
        , 1000);
    })
    .catch(err => {
      dispatch({
        type: NOTIFICATION, payload: {
          message: "Some problem occured, please try again",
          type: "error"
        }
      })
    });
};