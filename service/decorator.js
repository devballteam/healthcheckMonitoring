'use strict';

function decorator (jobs, config) {
    const dictionary = config.dictionary || {};

    jobs = jobs.map((job) => {
        const [project,jobName,environment] = job.name.split('_');

        job.jobName = dictionary[jobName] || jobName;
        job.project = project;
        job.environment = environment;

        // set different color when issue is known and description provided
        if (config.displayDescription) {
            job.color = job.description ? 'known_issue' : job.color;
            job.known_issue = job.description ? job.description : '';
        }

        return job;
    }).filter((job) => job.color !== undefined);

    return jobs;
}

module.exports = decorator;