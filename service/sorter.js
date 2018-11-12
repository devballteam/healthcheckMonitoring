'use strict';

const orders = [
    {order: 100, rules: ['prod', 'prs']},
    {order: 90,  rules: ['ost']},
    {order: 80,  rules: ['api']},
    {order: 70,  rules: ['portal']},
    {order: 50,  rules: ['stage', 'preprod']},
    {order: 40,  rules: ['wab-portal', 'rb-portal', 'pp2']},
    {order: 5,   rules: ['dev']},
    {order: -30,   rules: ['features-regression']},
    {order: -100,   rules: ['oddsstore-portal']}
];
const hiddenStatuses = ['blue', 'blue_anime', 'notbuilt', 'notbuilt_anime', 'disabled'];

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
    .filter((item) => !hiddenStatuses.includes(item.color));

    return jobs.sort((a,b) => a.order - b.order).reverse();
}

module.exports = sorter;