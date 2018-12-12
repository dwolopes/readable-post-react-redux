import { getPosts } from './posts';
import { getComments} from './comments';
import { getCategories } from './categories';


const getInitialdata = () => {
    return Promise.all([getCategories(), getPosts(), getComments()])
        .then(([categories, posts, comments]) => ({
            categories,
            posts,
            comments
        }))
}

export {
    getInitialdata
}