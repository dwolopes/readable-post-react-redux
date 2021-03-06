import { RECEIVE_COMMENTS, UPDATE_VOTE_COMMENT, REMOVE_COMMENT, ADD_COMMENT, EDIT_COMMENT} from '../actions/comments';
import { normalizeObjectById } from '../utils/helper';

export default function comments( state = {}, action ) {
    const { comment } = action;

    switch(action.type) {
        
        case RECEIVE_COMMENTS: {
            const allComments = normalizeObjectById(action.comments);

            return {
                ...state,
                ...allComments
            };
        }
        case ADD_COMMENT: 
            return {
                ...state,
                [comment.id]: comment
            }
        case REMOVE_COMMENT: {
            console.log('Entrei');
            return {
                ...state,
                [action.id]: Object.assign({}, state[action.id], { deleted:!state[action.id].deleted} )
            }
        }
        case UPDATE_VOTE_COMMENT: {
            return {
                ...state,
                [comment.id]: {
                    ...comment
                }
            }
        }
        case EDIT_COMMENT: 
            return {
                ...state,
                [comment.id]: Object.assign({}, state[comment.id], {
                    body: comment.body,
                    author: comment.author
                })
            }
        default:
            return state;
    }
};