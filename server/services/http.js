const axios = require("axios");

const instance = axios.create({
    baseURL: 'https://teecomsys.atlassian.net'
});

module.exports = instance;