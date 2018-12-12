const RECEIVE_POSTS= 'RECEIVE_POSTS';

const receivePosts = (posts)  => {
    return {
        type: RECEIVE_POSTS,
        posts
    };
}

export {
    RECEIVE_POSTS,
    receivePosts
}