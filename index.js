'use strict';

const express = require('express');
const fetch   = require("node-fetch");
const app     = express();
const port    = process.env.PORT || 8090;

const fetcher   = require(`${process.cwd()}/service/fetcher`);
const sorter    = require(`${process.cwd()}/service/sorter`);
const decorator = require(`${process.cwd()}/service/decorator`);

app.set('view engine', 'pug');
app.use(express.static(require('path').join(__dirname, 'public')));

app.get('/', async (req, res) => {
    const team = req.query.team || 'devball';
    const config = require(`${process.cwd()}/config/${team}`);

    const fetcherResponse   = await fetcher(config.jenkins);
    const sorterResponse    = await sorter(fetcherResponse[0], config.sort_rules);
    const decoratorResponse = await decorator(sorterResponse, config);
    const funnyQuote        = await fetch('https://geek-jokes.sameerkumar.website/api');


    return res.render('index', {jobs: decoratorResponse, errors: fetcherResponse[1], qoute: await funnyQuote.json()});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));