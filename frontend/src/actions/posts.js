import { showLoading, hideLoading} from 'react-redux-loading';
import { savePost, votePost, removePost } from '../utils/api/posts'; 
const RECEIVE_POSTS = 'RECEIVE_POSTS';
const ADD_POST = 'ADD_POST';
const UPDATE_VOTE = 'UPDATE_VOTE';
const REMOVE_POST = 'REMOVE_POST';
const ADD_POST_ID = 'ADD_POST_ID';


const receivePosts = (posts)  => {
    return {
        type: RECEIVE_POSTS,
        posts
    };
};

const addPost = (post) => {
    return {
        type: ADD_POST,
        post
    }
};

const uptadedVotePost = (post) => {
    return {
        type: UPDATE_VOTE,
        post
    }
};

const removePostById = (id) => {
    return {
        type: REMOVE_POST,
        id
    }
};

const addPostById = (id) => {
    return {
        type: ADD_POST_ID,
        id
    }
};


function handleAddPost (post) {
    return (dispatch) => {
        dispatch(showLoading());
        return savePost(post)
            .then( post => {
                dispatch(addPost(post))
                dispatch(hideLoading());
        })
    }
}

function handleUpdateVote (data) { 
    return (dispatch) => {
        return votePost(data)
            .then( uptadedPost => dispatch(uptadedVotePost(uptadedPost)))
    }
 }

 function handleRemoveVote (id) {
     return (dispatch) => {
        dispatch(removePostById(id));
        return removePost(id)
                .catch( () => dispatch(addPostById(id)))
     }
 }

export {
    RECEIVE_POSTS,
    ADD_POST,
    UPDATE_VOTE,
    REMOVE_POST,
    ADD_POST_ID,
    receivePosts,
    handleAddPost,
    handleUpdateVote,
    handleRemoveVote
}