import { voteComment } from '../utils/api/comments'; 

const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
const UPDATE_VOTE_COMMENT = 'UPDATE_VOTE_COMMENT';


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

function handleUpdateVote (data) { 
    return (dispatch) => {
        return voteComment(data)
            .then( uptadedComment => dispatch(uptadedVoteComment(uptadedComment)))
    }
}


export {
    RECEIVE_COMMENTS,
    UPDATE_VOTE_COMMENT,
    receiveComments,
    uptadedVoteComment,
    handleUpdateVote
}