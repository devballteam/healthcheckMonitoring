'use strict';

const orders = [
    {order: 100, rules: ['prod', 'prs']},
    {order: 90,  rules: ['ost', 'wab-portal']},
    {order: 80,  rules: ['api']},
    {order: 70,  rules: ['portal']},
    {order: 50,  rules: ['stage', 'preprod']},
    {order: 1,   rules: ['dev']},
    {order: -50,   rules: ['features-regression']},
    {order: -100,   rules: ['notbuilt', 'oddsstore-portal']}
];

function filterOutcome (item) {
    return item.color !== 'blue' && item.color !== 'blue_anime' && item.color !== 'notbuilt'
}

function sorter (jobs) {
    jobs = jobs
    .map((job) => {
        const jobNameArray = job.name.toLowerCase().split('_');
        job.order = 1;

        jobNameArray.forEach((namePart) => { // to be optimised
            orders.forEach(order => {
                if (order.rules.includes(namePart) || order.rules.includes(job.color)) {
                    job.order += order.order;
                }
            });
        });
        
        return job;
    })
    .filter((item) => {
        if (filterOutcome(item)) {
            return item;
        }
        return false;
    });

    return jobs.sort((a,b) => a.order - b.order).reverse();
}

module.exports = sorter;