import { showLoading, hideLoading} from 'react-redux-loading';
import { getInitialdata } from '../utils/api/shared';
import { saveComment } from '../utils/api/comments'; 
import { receiveCategories } from './categories';
import { receivePosts, updateCommentsCounter } from './posts';
import { receiveComments } from './comments';
import { addComment, removeCommentById }  from './comments'

function handledInitialData () {
    return (dispatch) => {
        dispatch(showLoading());
        return getInitialdata().then(({categories, posts, comments }) => {
            dispatch(receiveCategories(categories));
            dispatch(receivePosts(posts));
            dispatch(receiveComments(comments));
            dispatch(hideLoading());
        })
    }
}

function handleAddComment (comment) {
    return (dispatch) => {
        dispatch(showLoading());
        dispatch(addComment(comment));
        return saveComment(comment)
            .then( (commentReturned) => {
                dispatch(updateCommentsCounter(commentReturned))
                dispatch(hideLoading());
            })
            .catch( (e) => {
                dispatch(removeCommentById(comment.id));
            })
    }
}

export {
    handledInitialData,
    handleAddComment,
}