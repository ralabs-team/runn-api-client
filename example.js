const RunnApiClient = require('runn-api-client');

const RUNN_API_KEY = 'TEST_test_...';

(async () => {
  const runnApi = new RunnApiClient(RUNN_API_KEY, { logLevel: 'debug', isDryRun: false });

  // fetch all clients
  const clients = await runnApi.clients.fetchAll();
  console.log('clients', clients.length); // eslint-disable-line no-console

  // fetch all allocations
  const assignments = await runnApi.assignments.fetchAll();
  console.log('assignments', assignments.length); // eslint-disable-line no-console

  // fetch all people
  const people = await runnApi.people.fetchAll();
  console.log('people', people.length); // eslint-disable-line no-console

  runnApi.projects.fetchAll()

  // create new client
  // await runnApi.clients.create('Test Client', []);
})();
