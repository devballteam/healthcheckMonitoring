'use strict';

const fetch = require("node-fetch");

async function fetcher (urls) {
    try {
        const [qa, mtp, build] = await Promise.all(urls.map(url => fetch(url).then((response) => response.json())));
        return [...qa.jobs, ...mtp.jobs, ...build.jobs];
    } catch (error) {
        console.warn(error);
    }
}

module.exports = fetcher;