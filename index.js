'use strict';

const express = require('express');
const app = express();
const port = 8090;

const additionalParams = '?tree=jobs[name,color,description,healthReport[description,score,iconUrl]]';
const qaJenkinsUrl     = `http://qajenkins3.ptv.com:8080/view/Devball/api/json${additionalParams}`; //move to config?
const mtpJenkinsUrl    = `http://10.216.99.56:8080/view/Devball/api/json${additionalParams}`;
const atgraJenkinsUrl  = `http://atgrabuild01.runningball.local:8080/view/DEVBALL/api/json${additionalParams}`;

const qouteApi         = 'https://geek-jokes.sameerkumar.website/api'

const fetcher   = require(`${process.cwd()}/service/fetcher`);
const sorter    = require(`${process.cwd()}/service/sorter`);
const decorator = require(`${process.cwd()}/service/decorator`);

app.set('view engine', 'pug');
app.use(express.static(require('path').join(__dirname, 'public')));

app.get('/', (req, res) => {
    fetcher([qaJenkinsUrl, mtpJenkinsUrl, atgraJenkinsUrl])
    .then(response => sorter(response))
    .then(response => decorator(response))
    .then(jobs => res.render('index', {jobs}))
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));