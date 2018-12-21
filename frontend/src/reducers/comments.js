import { RECEIVE_COMMENTS } from '../actions/comments';
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
        default:
            return state;
    }
};