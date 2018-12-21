const getApiUrl = require('./helpers');
const getHeaders = require('./helpers');
const fetch = require('node-fetch');

const generateUID = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
};

const formatComment = (comment, parentId) => {
    return {
        id: generateUID(),
        parentId,
        timestamp: Date.now(),
        body: comment.body,
        author: comment.author,
    }
}

const getComments = (id) => {
    const headers = getHeaders.getHeaders();
    const api = getApiUrl.getApiUrl();

    return fetch(`${api}/comments`, { headers })
        .then((res) => res.json())
        .then((data) => data);
}

const saveComment = (post) => {
    const headers = getHeaders.getHeaders();
    const api = getApiUrl.getApiUrl();
    const formattedPost = formatComment(post);

    return fetch(`${api}/posts`, { 
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedPost),
     })
     .then(res => res.json())
     .catch(error => error);
}

const voteComment = ({option, id}) => {
    const headers = getHeaders.getHeaders();
    const api = getApiUrl.getApiUrl();

    return fetch(`${api}/comments/${id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ option })
    })
    .then(res => res.json())
    .catch(error => error);
}

const removeComment = (id) => {
    const headers = getHeaders.getHeaders();
    const api = getApiUrl.getApiUrl();

    return fetch(`${api}/comments/${id}`, {
        method: 'DELETE',
        headers: {
            ...headers,
        },
    })
    .then((res) => res.json())
    .catch(error => error);
}

const editComment = (id, body, author) => {
    const headers = getHeaders.getHeaders();
    const api = getApiUrl.getApiUrl();

    return fetch(`${api}/comments/${id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id, body, author })
    })
    .then((res) => res.json())
    .catch(error => error);
}


export {
    getComments,
    saveComment,
    voteComment,
    removeComment,
    editComment
}