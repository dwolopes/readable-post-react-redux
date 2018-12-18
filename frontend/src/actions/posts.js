import { showLoading, hideLoading} from 'react-redux-loading';
import { savePost, votePost } from '../utils/api/posts'; 
const RECEIVE_POSTS = 'RECEIVE_POSTS';
const ADD_POST = 'ADD_POST';
const UPDATE_VOTE = 'UPDATE_VOTE';


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

const uptadedVotePost = (post) => {
    console.log(post);
    return {
        type: UPDATE_VOTE,
        post
    }
}


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

export {
    RECEIVE_POSTS,
    ADD_POST,
    UPDATE_VOTE,
    receivePosts,
    handleAddPost,
    handleUpdateVote
}