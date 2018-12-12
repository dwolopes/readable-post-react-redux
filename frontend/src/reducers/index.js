import { loadingBarReducer } from 'react-redux-loading';
import { combineReducers } from 'redux';
import categories from './categories';
import posts from './posts';
import comments from './posts';

export default combineReducers({
    categories,
    posts,
    comments,
    loadingBar: loadingBarReducer
})