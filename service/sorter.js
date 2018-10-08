'use strict';

const orders = [
    {order: 100, rules: ['prod']},
    {order: 10, rules: ['stage', 'preprod']},
    {order: 1, rules: ['dev']},
    {order: 100, rules: ['prs']},
    {order: 90, rules: ['ost']}
];

function sorter (jobs) {
    return jobs.map((job) => {
        const jobNameArray = job.name.toLowerCase().split('_');
        console.log(jobNameArray);
        job.order = 1;

        jobNameArray.forEach((namePart) => {
            orders.forEach(order => {
                if (order.rules.includes(namePart)) {
                    job.order += order.order;
                }
            });
        });

        return job;
    });
}

module.exports = sorter;