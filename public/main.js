const jobTemplate = function (job) {
  let healthReport = '';
  let description = '';

  if (job.healthReport[0] && job.healthReport[0].iconUrl) {
    healthReport = `<img src="http://10.216.99.56:8080/static/2ade8cde/images/32x32/${job.healthReport[0].iconUrl}" />`;
  }
  if (job.known_issue) {
    description = `<small class="healthcheck known_issue_desc">${job.known_issue}</small>`;
  } else if (job.healthReport[0] && job.healthReport[0].description) {
    description = `<small class="healthcheck">${job.healthReport[0].description}</small>`;
  }

  return `
    <li class="${job.color}" data-order="${job.order}">
      <span class="badge badge-pill badge-light">${job.project}</span>
      <span class="badge badge-pill badge-primary badge-env-${job.env_class}">${job.environment}</span>
      <div class="job-status">
        <strong class="job-name">${job.jobName}${healthReport}</strong>
        ${description}
      </div>
    </li>
  `;
}

const qoute = function () {
  return $.ajax({url: '/qoute'})
    .done(function(response) {
      $('.qoute').html(response);
    });
};

const jobs = function () {
  return $.ajax({url: '/jobs'})
    .done(function(response) {
      $('.jobs li').remove();
      $(".errors p").remove();
      if (response.errors.length) {
        response.errors.forEach((error) => {
          $('.errors p').clone().html(error).appendTo('.errors').removeClass('hidden');
        });
      }

      if (response.jobs.length) {
        response.jobs.forEach((job) => {
          $(jobTemplate(job)).appendTo('.jobs');
        });
      }
    });
};

jobs();
qoute();

setInterval(qoute, 10000);
setInterval(jobs, 2000);