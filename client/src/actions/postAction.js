import axios from "axios";
import { SHOW_ALL_POSTS, NOTIFICATION } from "./types";

// Add post
export const addPost = (postData) => dispatch => {
  axios
    .post("/api/add", postData)
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

// Add post
export const showPosts = () => dispatch => {
  axios
    .get("/api")
    .then(res => {
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
    .delete(`/api/${postId}`)
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