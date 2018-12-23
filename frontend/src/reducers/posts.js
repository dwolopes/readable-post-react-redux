import { RECEIVE_POSTS, ADD_POST, UPDATE_VOTE, REMOVE_POST, ADD_POST_ID, EDIT_POST, UPDATE_COMMENTS_COUTER } from '../actions/posts';
import { normalizeObjectById } from '../utils/helper';

export default function posts ( state = {}, action ){
    // eslint-disable-next-line default-case
    const { post } = action;
    switch(action.type) {
        case RECEIVE_POSTS: {
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
        case EDIT_POST: 
            return {
                ...state,
                [post.id]: Object.assign({}, state[post.id], {
                    title: post.title,
                    body: post.body,
                    category: post.category,
                    author: post.author
                })
            }
        case UPDATE_COMMENTS_COUTER: { 
            const previousCounterValue =  state[action.id].commentCount;
            let newCounterValue = previousCounterValue + 1;

            return {
                ...state,
                [action.id]: Object.assign({}, state[action.id], {
                    commentCount: newCounterValue
                })
            }
        }
        default:
            return state
    }
};