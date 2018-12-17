import { showLoading, hideLoading} from 'react-redux-loading';
import { getInitialdata } from '../utils/api/shared';
import { receiveCategories } from './categories';
import { receivePosts } from './posts';
import { receiveComments } from './comments';

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

export {
    handledInitialData
}