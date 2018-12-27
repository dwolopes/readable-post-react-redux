import { loadingBarReducer } from 'react-redux-loading';
import { combineReducers } from 'redux';
import categories from './categories';
import posts from './posts';
import comments from './comments';
import loading from './loading';
export default combineReducers({
    categories,
    posts,
    comments,
    loading,
    loadingBar: loadingBarReducer
})