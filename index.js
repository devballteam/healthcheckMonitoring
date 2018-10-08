'use strict';

const express = require('express');
const app = express();
const port = 3000;
const url = "http://qajenkins3.ptv.com:8080/view/Devball/api/json"; //move to config?

const fetcher = require(`${process.cwd()}/service/fetcher`);
const sorter = require(`${process.cwd()}/service/sorter`);

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    fetcher(url)
    .then(response => sorter(response.jobs))
    .then(sorted => {
        // console.log('data',data.jobs);
        res.render('index', {jobs: sorted});
    })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));