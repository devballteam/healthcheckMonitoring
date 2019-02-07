'use strict';

const express = require('express');
const app     = express();
const port    = process.env.PORT || 8090;

const fetcher   = require(`${process.cwd()}/service/fetcher`);
const sorter    = require(`${process.cwd()}/service/sorter`);
const decorator = require(`${process.cwd()}/service/decorator`);

app.set('view engine', 'pug');
app.use(express.static(require('path').join(__dirname, 'public')));

app.get('/', async (req, res) => {
    return res.render('index');
});

app.get('/jobs', async (req, res) => {
    const team   = req.query.team || 'devball';
    const config = require(`${process.cwd()}/config/${team}`);

    const fetcherResponse   = await fetcher(config.jenkins);
    const sorterResponse    = await sorter(fetcherResponse[0], config.sort_rules);
    const decoratorResponse = await decorator(sorterResponse, config);

    return res.json({
        jobs: decoratorResponse,
        errors: fetcherResponse[1]
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));