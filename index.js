'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 8090;

const fetcher   = require(`${process.cwd()}/service/fetcher`);
const sorter    = require(`${process.cwd()}/service/sorter`);
const decorator = require(`${process.cwd()}/service/decorator`);

app.set('view engine', 'pug');
app.use(express.static(require('path').join(__dirname, 'public')));

app.get('/', (req, res) => {
    const team = req.query.team || 'devball';
    const config = require(`${process.cwd()}/config/${team}`);

    fetcher(config.jenkins)
    .then(response => sorter(response, config.sort_rules))
    .then(response => decorator(response, config))
    .then(jobs => res.render('index', {jobs}))
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));