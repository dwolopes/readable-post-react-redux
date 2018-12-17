import { showLoading, hideLoading} from 'react-redux-loading';
import { savePost } from '../utils/api/posts'; 
const RECEIVE_POSTS = 'RECEIVE_POSTS';
const ADD_POST = 'ADD_POST';

const receivePosts = (posts)  => {
    return {
        type: RECEIVE_POSTS,
        posts
    };
}

const addPost = (post) => {
    return {
        type: ADD_POST,
        post
    }
}

function handleAddPost (post) {
    return (dispatch) => {
        dispatch(showLoading());
        return savePost(post).then( post => {
            dispatch(addPost(post))
            dispatch(hideLoading());
        });
    }
}

export {
    RECEIVE_POSTS,
    ADD_POST,
    receivePosts,
    handleAddPost
}