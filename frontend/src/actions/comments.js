import { showLoading, hideLoading} from 'react-redux-loading';
import { saveComment, voteComment, editComment, removeComment } from '../utils/api/comments'; 

const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
const UPDATE_VOTE_COMMENT = 'UPDATE_VOTE_COMMENT';
const ADD_COMMENT = 'ADD_COMMENT';
const REMOVE_COMMENT = 'REMOVE_POST';
const EDIT_COMMENT = 'EDIT_COMMENT';
const ADD_COMMENT_ID = 'ADD_COMMENT_ID';


const receiveComments = (comments) => {
    return {
        type: RECEIVE_COMMENTS,
        comments
    }
}

const uptadedVoteComment = (comment) => {
    return {
        type: UPDATE_VOTE_COMMENT,
        comment
    }
};

const addCommentById = (id) => {
    return {
        type: ADD_COMMENT_ID,
        id
    }
};

const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        comment
    }
};

const removeCommentById = (id) => {
    return {
        type: REMOVE_COMMENT,
        id
    }
};

const editCommentAction = (comment) => {
    return {
        type: EDIT_COMMENT,
        comment
    }
}

function handleUpdateVote (data) { 
    return (dispatch) => {
        return voteComment(data)
            .then( uptadedComment => dispatch(uptadedVoteComment(uptadedComment)))
    }
}

function handleRemoveComment (id) {
    return (dispatch) => {
       dispatch(removeCommentById(id));
       return removeComment(id)
               .catch( () => dispatch(removeCommentById(id)))
    }
}

function handleAddComment (comment) {
    return (dispatch) => {
        dispatch(showLoading());
        dispatch(addComment(comment));
        return saveComment(comment)
            .then( (c) => {
                dispatch(hideLoading());
            })
            .catch( (e) => {
                dispatch(removeCommentById(comment.id));
            })
    }
}

function handleEditComment(id, {body, author}) {
    return (dispatch, getState) => {
        const previousComments = getState();
        let previousComment = previousComments[id];
        dispatch(editCommentAction({id, body, author}));
        return editComment(id, body, author)
            .catch( () => editCommentAction(previousComment));
    }
 }


export {
    RECEIVE_COMMENTS,
    UPDATE_VOTE_COMMENT,
    ADD_COMMENT,
    REMOVE_COMMENT,
    addCommentById,
    receiveComments,
    uptadedVoteComment,
    handleUpdateVote,
    handleEditComment,
    handleAddComment,
    editCommentAction,
    handleRemoveComment
}