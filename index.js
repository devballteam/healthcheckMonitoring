'use strict';

const express = require('express');
const app = express();
const port = 3000;
const url = "http://qajenkins3.ptv.com:8080/view/Devball/api/json"; //move to config?

const fetcher = require(`${process.cwd()}/service/fetcher`);
const sorter = require(`${process.cwd()}/service/sorter`);
const decorator = require(`${process.cwd()}/service/decorator`);

app.set('view engine', 'pug');
app.use(express.static(require('path').join(__dirname, 'public')));

app.get('/', (req, res) => {
    fetcher(url)
    .then(response => sorter(response.jobs))
    .then(response => decorator(response))
    .then(jobs => res.render('index', {jobs}))
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));