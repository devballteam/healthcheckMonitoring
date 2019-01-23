'use strict';

const hiddenStatuses = ['blue', 'blue_anime', 'notbuilt', 'notbuilt_anime', 'disabled'];

function sorter (jobs, orders) {

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