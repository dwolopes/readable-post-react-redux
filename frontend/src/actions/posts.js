import { showLoading, hideLoading} from 'react-redux-loading';
import { savePost, votePost, removePost, editPost } from '../utils/api/posts'; 
const RECEIVE_POSTS = 'RECEIVE_POSTS';
const ADD_POST = 'ADD_POST';
const UPDATE_VOTE = 'UPDATE_VOTE';
const REMOVE_POST = 'REMOVE_POST';
const ADD_POST_ID = 'ADD_POST_ID';
const EDIT_POST = 'EDIT_POST';


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

const editPostAction = (post) => {
    return {
        type: EDIT_POST,
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

 function handleRemovePost (id) {
     return (dispatch) => {
        dispatch(removePostById(id));
        return removePost(id)
                .catch( () => dispatch(addPostById(id)))
     }
 }

 function handleEditPost(id, {title, body, category, author}) {
    return (dispatch, getState) => {
        const previousPosts = getState();
        let previousPost = previousPosts[id];
        dispatch(editPostAction({id, title, body, category, author}));
        return editPost(id, title, body, category, author)
            .catch( () => editPostAction(previousPost));
    }
 }

export {
    RECEIVE_POSTS,
    ADD_POST,
    UPDATE_VOTE,
    REMOVE_POST,
    ADD_POST_ID,
    EDIT_POST,
    receivePosts,
    handleAddPost,
    handleUpdateVote,
    handleRemovePost,
    handleEditPost
}