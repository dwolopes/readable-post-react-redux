const getApiUrl = require('./helpers');
const getHeaders = require('./helpers');
const fetch = require('node-fetch');


const getComments = (id) => {
    const headers = getHeaders.getHeaders();
    const api = getApiUrl.getApiUrl();

    return fetch(`${api}/posts/${id}/comments`, { headers })
        .then((res) => res.json())
        .then((data) => data.comments);
}

module.exports = {
    getComments
}