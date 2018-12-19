import { RECEIVE_POSTS, ADD_POST, UPDATE_VOTE, REMOVE_POST, ADD_POST_ID } from '../actions/posts';
import { normalizeObjectById } from '../utils/helper';

export default function posts ( state = {}, action ){
    // eslint-disable-next-line default-case
    const { post } = action;
    switch(action.type) {
        case RECEIVE_POSTS:{
            const allPosts = normalizeObjectById(action.posts);

            return {
                ...state,
                ...allPosts
            };
        }
        case ADD_POST:
            return {
                ...state,
                [post.id]: post
            }
        case UPDATE_VOTE: {
            return {
                ...state,
                [post.id]: {
                    ...post
                }
            }
        }
        case REMOVE_POST: {
            console.log(state[action.id]);
            return {
                ...state,
                [action.id]: Object.assign({}, state[action.id], { deleted:!state[action.id].deleted} )
            }
        }
        case ADD_POST_ID: 
            return {
                ...state,
                [action.id]: Object.assign({}, state[action.id], { deleted:!state[action.id].deleted })
            }
        default:
            return state
    }
};