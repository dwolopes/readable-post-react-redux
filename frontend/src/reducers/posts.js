import { RECEIVE_POSTS } from '../actions/posts';

export default function posts ( state = {}, action ){
    // eslint-disable-next-line default-case
    switch(action.type) {
        case RECEIVE_POSTS:
            return {
                ...state,
                ...action.posts
            }
        default:
            return state
    }
};