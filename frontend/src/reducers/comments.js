import { RECEIVE_COMMENTS } from '../actions/comments';

export default function comments( state = {}, action ) {
    // eslint-disable-next-line default-case
    switch(action.type) {
        case RECEIVE_COMMENTS: 
            return {
                ...state,
                ...action.comments
            };
        default:
            return state;
    }
};