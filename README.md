# Runn API Client

API integration with [Runn.io](https://runn.io) - a resource planning and project forecasting platform.

## Description

This package provides a simple and intuitive way to interact with the Runn API. It includes support for all of the methods described on [Runn API documentation](https://developer.runn.io/);

- Clients
- Projects
- Team
- People
- Assignments
- Custom Fields
- ...

## Installation

```bash
npm install runn-api-client
```

## Requirements

- Node.js 14 or higher
- A valid Runn API key (get it from your [Runn account API settings](https://app.runn.io/account/api))

## Usage

```javascript
const RunnApiClient = require('runn-api-client');

// Initialize the client
const runnApi = new RunnApiClient('YOUR_API_KEY', {
  logLevel: 'debug',  // Optional: debug, info, warn, error
  isDryRun: false     // Optional: simulate API calls without making actual requests
});

// Fetch all clients
const clients = await runnApi.clients.fetchAll();

// Create a new client
const newClient = await runnApi.clients.create('Client Name', [
  { referenceName: 'salesforce.Id', externalId: 'SF123' }
]);

// Fetch active assignments
const assignments = await runnApi.assignments.fetchActive();

// Create a new project
const project = await runnApi.projects.create({
  name: 'Project Name',
  clientId: 123,
  ...
});

// Add a note to a project
await runnApi.projects.addNote(project.id, 'Project note content');
```

## Configuration

The client accepts the following configuration options:

```javascript
{
  logLevel: 'debug', // 'debug' | 'info' | 'warn' | 'error'
  isDryRun: false,   // Simulate API calls without making actual requests
  RUNN_API_URL: 'https://api.runn.io/api/v0' // Optional: override API URL
}
```

## Features

- Comprehensive error handling
- Rate limiting support
- Dry run mode for testing
- Detailed logging
- Pagination handling

## API Documentation

For detailed API documentation, visit the [Runn Developer Portal](https://developer.runn.io/reference).

## Development

For local development:

```bash
git clone https://github.com/ralabs-team/runn-api-client.git
cd runn-api-client
npm install
npm link runn-api-client
```

## Author

Roman Rodomansky @ [Ralabs](https://ralabs.org)

## License

MIT

## Dependencies

- axios: HTTP client
- kleur: Terminal string styling
- lodash: Utility functions
- qs: Query string parsing and stringifying