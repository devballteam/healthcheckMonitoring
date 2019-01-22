'use strict';

const dictionary = {
    'Status-Portal': 'Portal',
    'Status-API': 'API',
    'Status-Rabbit': 'RabbitMQ',
    'Status-API-FL': 'API Fixtures List',
    'Status-DB': 'Database',
    'Status-WS': 'Websocket',
    'Features-Regression': 'Regression'
};

function decorator (jobs) {
    jobs.map((job) => {
        const [project,jobName,environment] = job.name.split('_');

        job.jobName = dictionary[jobName] || jobName;
        job.project = project;
        job.environment = environment;

        // set different color when issue is known and description provided
        job.color = !job.description ? job.color : 'known_issue';

        return job;
    });

    return jobs;
}

module.exports = decorator;