'use strict';

const orders = [
    {order: 100, rules: ['prod', 'prs']},
    {order: 90,  rules: ['ost']},
    {order: 10,  rules: ['stage', 'preprod']},
    {order: 1,   rules: ['dev']}
];

function sorter (jobs) {
    jobs.map((job) => {
        const jobNameArray = job.name.toLowerCase().split('_');
        job.order = 1;

        jobNameArray.forEach((namePart) => { // to be optimised
            orders.forEach(order => {
                if (order.rules.includes(namePart)) {
                    job.order += order.order;
                }
            });
        });
        
        return job;
    });

    return jobs.sort((a,b) => a.order - b.order).reverse();
}

module.exports = sorter;