const getApiUrl = require('./helpers');
const getHeaders = require('./helpers');
const fetch = require('node-fetch');

const generateUID = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
};

const formatPost = (post) => {
    return {
        id: generateUID(),
        timestamp: Date.now(),
        title: post.title,
        body: post.body,
        author: post.author,
        category: post.category,
    }
}


const getPosts = () => {
    const headers = getHeaders.getHeaders();
    const api = getApiUrl.getApiUrl();

    return fetch(`${api}/posts`, { headers })
        .then((res) => res.json())
        .then((data) => data)
        .catch(error => error);
}

const savePost = (post) => {
    const headers = getHeaders.getHeaders();
    const api = getApiUrl.getApiUrl();
    const formattedPost = formatPost(post);

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

const votePost = ({option, id}) => {
    const headers = getHeaders.getHeaders();
    const api = getApiUrl.getApiUrl();

    return fetch(`${api}/posts/${id}`, {
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

const removePost = (id) => {
    const headers = getHeaders.getHeaders();
    const api = getApiUrl.getApiUrl();

    return fetch(`${api}/posts/${id}`, {
        method: 'DELETE',
        headers: {
            ...headers,
        },
    }).then((res) => res.json())
      .catch(error => error);
}

export {
    getPosts,
    savePost,
    votePost,
    removePost
};