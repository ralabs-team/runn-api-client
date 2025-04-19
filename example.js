const runnApiClient = require('runn-api-client');

const RUNN_API_KEY = 'TEST_runnintegration_...';

(async () => {
  const runnApi = new runnApiClient(RUNN_API_KEY, { logLevel: 'debug', isDryRun: true });

  const clients = await runnApi.clients.fetchAll();
  console.log(clients.length); // eslint-disable-line no-console

  const assignments = await runnApi.assignments.fetchAll();
  console.log(assignments.length); // eslint-disable-line no-console
})();
