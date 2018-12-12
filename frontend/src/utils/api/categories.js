const getApiUrl = require('./helpers');
const getHeaders = require('./helpers');
const fetch = require('node-fetch');

const getCategories = () => {
    const headers = getHeaders.getHeaders();
    const api = getApiUrl.getApiUrl();

    return fetch(`${api}/categories`, { headers })
        .then(res => res.json())
        .then(data => data.categories);
};

module.exports = {
    getCategories
};