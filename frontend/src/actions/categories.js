const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

const receiveCategories = (categories) => {;
    return {
        type: RECEIVE_CATEGORIES,
        categories
    }
}

export {
    RECEIVE_CATEGORIES,
    receiveCategories
}