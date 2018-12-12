const getApiUrl = require('./helpers');
const getHeaders = require('./helpers');
const fetch = require('node-fetch');


const getPosts = () => {
    const headers = getHeaders.getHeaders();
    const api = getApiUrl.getApiUrl();

    return fetch(`${api}/posts`, { headers })
        .then((res) => res.json())
        .then((data) => data);
}

module.exports = {
    getPosts
};