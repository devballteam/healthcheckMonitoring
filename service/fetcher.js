'use strict';

const fetch = require("node-fetch");

async function fetcher (jenkins_config) {
    const errorLog = [];
    try {
        const fetchMethod = url => fetch(url + jenkins_config.filters)
        .then(response => response.json())
        .catch(error => {
            errorLog.push(error.message);
            return error.message;
        });
        const responses = await Promise.all(jenkins_config.endpoints.map(fetchMethod));
        const mapped = responses.map(response => response.jobs).filter(response => response);
        return [
            [].concat.apply([], mapped),
            errorLog
        ];
    } catch (error) {
        console.warn(error);
    }
}

module.exports = fetcher;