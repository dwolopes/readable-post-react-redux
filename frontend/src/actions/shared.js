import { showLoading, hideLoading} from 'react-redux-loading';
import { getInitialdata } from '../utils/api/shared';
import { receiveCategories } from './categories';
import { receivePosts } from './posts';

export function handledInitialData () {
    return (dispatch) => {
        dispatch(showLoading());
        return getInitialdata().then(({categories, posts }) => {
            dispatch(receiveCategories(categories));
            dispatch(receivePosts(posts));
            dispatch(hideLoading());
        })
    }
}