'use strict';

const fetch = require("node-fetch");

async function fetcher (url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.warn(error);
    }
}

module.exports = fetcher;