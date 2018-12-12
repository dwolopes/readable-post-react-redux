const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';


const receiveComments = (comments) => {
    return {
        type: RECEIVE_COMMENTS,
        comments
    }
}

export {
    RECEIVE_COMMENTS,
    receiveComments
}