'use strict';

const fetch = require("node-fetch");

async function fetcher (jenkins_config) {

    try {
        const responses = await Promise.all(jenkins_config.endpoints.map(url => fetch(url + jenkins_config.filters).then((response) => response.json())));
        const mapped = responses.map(response => response.jobs);

        return [].concat.apply([], mapped);
    } catch (error) {
        console.warn(error);
    }
}

module.exports = fetcher;