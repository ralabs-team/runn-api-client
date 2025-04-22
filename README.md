# Runn API Client

[![npm version](https://img.shields.io/npm/v/runn-api-client.svg)](https://www.npmjs.com/package/runn-api-client)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Dependencies](https://img.shields.io/librariesio/release/npm/runn-api-client)](https://libraries.io/npm/runn-api-client)
[![Known Vulnerabilities](https://snyk.io/test/github/ralabs-team/runn-api-client/badge.svg)](https://snyk.io/test/github/ralabs-team/runn-api-client)

API integration with [Runn.io](https://runn.io) - a resource planning and project forecasting platform.

[![Watch the Loom](https://github.com/user-attachments/assets/4c980433-613d-4a89-9cfd-db68b34859c0)](https://www.loom.com/share/8ab2296ce6994eaba2c1c499f123a659?sid=a1388290-02a4-49e9-b57f-19b6c9c023a4)

## Description

This package provides a simple and intuitive way to interact with the Runn API. It includes support for all of the methods described on [Runn API documentation](https://developer.runn.io/) and [Runn API reference](https://developer.runn.io/reference);

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

## Methods

### Activity

| Method Name | Description | Runn API Reference |
| --- | --- | --- |
| `fetchAll({ onlyActive: boolean, modifiedAfter: string }): Promise<Activity[]>` | Fetches all activities from Runn | [link](https://developer.runn.io/reference/get_activity-log) |

### Actuals

| Method Name | Description | Runn API Reference |
| --- | --- | --- |
| `fetchAll({ onlyActive: boolean, modifiedAfter: string }): Promise<Actual[]>` | Fetches all actuals from Runn | [link](https://developer.runn.io/reference/get_actuals) |

### Assignments

| Method Name | Description | Runn API Reference |
| --- | --- | --- |
| `fetchAll({ onlyActive: boolean, modifiedAfter: string }): Promise<Assignment[]>` | Fetches all assignments from Runn | [link](https://developer.runn.io/reference/get_assignments) |

### Clients

| Method Name | Description | Runn API Reference |
| --- | --- | --- |
| `fetchAll({ onlyActive: boolean, modifiedAfter: string }): Promise<Client[]>` | Fetches all clients from Runn | [link](https://developer.runn.io/reference/get_clients) |
| `fetchOneById(clientId: string): Promise<Client>` | Fetches a specific client from Runn | [link](https://developer.runn.io/reference/get_clients-clientid) |
| `create(name: string, references: string): Promise<Client>` | Creates a new client in Runn | [link](https://developer.runn.io/reference/post_clients) |
| `update(clientId: string, values: object): Promise<Client>` | Updates a specific client in Runn | [link](https://developer.runn.io/reference/patch_clients-clientid) |
| `archive(clientId: string): Promise<Client>` | Archives a specific client in Runn | [link](https://developer.runn.io/reference/patch_clients-clientid) |
| `unarchive(clientId: string): Promise<Client>` | Unarchives a specific client in Runn | [link](https://developer.runn.io/reference/patch_clients-clientid) |
| `listProjects(clientId: string): Promise<Project[]>` | Fetches all projects assigned to a specific client | [link](https://developer.runn.io/reference/get_clients-clientid-projects) |

### Contracts

| Method Name | Description | Runn API Reference |
| --- | --- | --- |
| `fetchAll({ onlyActive: boolean, modifiedAfter: string }): Promise<Contract[]>` | Fetches all contracts from Runn | [link](https://developer.runn.io/reference/get_contracts) |

### Custom Fields

| Method Name | Description | Runn API Reference |
| --- | --- | --- |
| `fetchAllSelectFields(): Promise<CustomField[]>` | Fetches all custom fields from Runn | [link](https://developer.runn.io/reference/delete_custom-fields-checkbox-checkboxfieldid) |
fetchProjectsSelectCustomFields(): Promise<CustomField[]>` | Fetches all custom fields from Runn | [link](https://developer.runn.io/reference/get_custom-fields-select) |
createSelectCustomField(name: string, model: string, options: CustomFieldOption[], params: object): Promise<CustomField>` | Creates a new custom field in Runn | [link](https://developer.runn.io/reference/post_custom-fields-select) |

### Holiday Groups

| Method Name | Description | Runn API Reference |
| --- | --- | --- |
| `fetchAll(): Promise<HolidayGroup[]>` | Fetches all holiday groups from Runn | [link](https://developer.runn.io/reference/get_holiday-groups) |

### Milestones

| Method Name | Description | Runn API Reference |
| --- | --- | --- |
| `fetchAll(): Promise<Milestone[]>` | Fetches all milestones from Runn | [link](https://developer.runn.io/reference/get_milestones) |

### Other Expenses

| Method Name | Description | Runn API Reference |
| --- | --- | --- |
| `fetchAll(): Promise<OtherExpense[]>` | Fetches all other expenses from Runn | [link](https://developer.runn.io/reference/get_other-expenses) |

### People
| Method Name | Description | Runn API Reference |
| --- | --- | --- |
| `fetchAll({ onlyActive: boolean, modifiedAfter: string }): Promise<Person[]>` | Fetches all people from Runn | [link](https://developer.runn.io/reference/get_people) |
| `fetchOneById(personId: string): Promise<Person>` | Fetches a specific person from Runn | [link](https://developer.runn.io/reference/get_people-personid) |
| `fetchOneByEmail(email: string): Promise<Person>` | Fetches a specific person by email from Runn | [link](https://developer.runn.io/reference/get_people?email=string) |
| `create(firstName: string, lastName: string, roleIdOrName: number/string, otherValues: object): Promise<Person>` | Creates a new person in Runn | [link](https://developer.runn.io/reference/post_people) |
| `update(personId: string, values: object): Promise<Person>` | Updates a specific person in Runn | [link](https://developer.runn.io/reference/get_people) |
| `fetchContracts(personId: string): Promise<Contract[]>` | Fetches all contracts assigned on person | [link](https://developer.runn.io/reference/get_people-personid-contracts) |
| `addContract(personId: string, roleId: string, options: object): Promise<Contract>` | Adds a new contract to a specific person | [link](https://developer.runn.io/reference/post_people-personid-contracts) |
| `fetchTeams(personId: string): Promise<Team[]>` | Fetches all teams where person is assigned | [link](https://developer.runn.io/reference/get_people-personid-teams-current) |
| `addToTeam(personId: string, teamId: string): Promise<Team>` | Adds a specific person to a specific team | [link](https://developer.runn.io/reference/post_people-personid-teams) |
| `removeFromTeam(personId: string, teamId: string): Promise<Team>` | Removes a specific team from a specific person | [link](https://developer.runn.io/reference/delete_people-personid-teams-teamid) |
| `archive(personId: string): Promise<Person>` | Archives a specific person in Runn | [link](https://developer.runn.io/reference/patch_people-personid) |
| `unarchive(personId: string): Promise<Person>` | Unarchives a specific person in Runn | [link](https://developer.runn.io/reference/patch_people-personid) |
| `delete(personId: string): Promise<Person>` | Deletes a specific person in Runn | [link](https://developer.runn.io/reference/delete_people-personid) |

### Phases

| Method Name | Description | Runn API Reference |
| --- | --- | --- |
| `fetchAll(): Promise<Phase[]>` | Fetches all phases from Runn | [link](https://developer.runn.io/reference/get_phases) |

### Project Tags

| Method Name | Description | Runn API Reference |
| --- | --- | --- |
| `fetchAll(): Promise<ProjectTag[]>` | Fetches all project tags from Runn | [link](https://developer.runn.io/reference/get_project-tags) |
| `create(values): Promise<ProjectTag>` | Creates a new project tag in Runn | [link](https://developer.runn.io/reference/post_project-tags) |
| `addToProject(projectTagId: string, projectId: string): Promise<ProjectTag>` | Adds a project tag to a specific project | [link](https://developer.runn.io/reference/post_project-tags-projecttagid-project-projectid) |
| `createOrUpdate(values): Promise<ProjectTag>` | Creates or updates a project tag in Runn | [link](https://developer.runn.io/reference/post_project-tags) |

### Projects

| Method Name | Description | Runn API Reference |
| --- | --- | --- |
| `fetchAll(): Promise<Project[]>` | Fetches all projects from Runn | [link](https://developer.runn.io/reference/get_projects) |
| `fetchOneById(projectId: string): Promise<Project>` | Fetches a specific project from Runn | [link](https://developer.runn.io/reference/get_projects-projectid) |
| `create(values)`: Creates a new project in Runn | [link](https://developer.runn.io/reference/post_projects) |
| `addCustomSelectFieldValues(projectId: string, customSelectFieldId: string, values: object): Promise<Project>` | Adds custom select field values to a specific project | [link](https://developer.runn.io/reference/patch_projects-projectid-custom-fields-select) |
| `update(projectId: string, values: object): Promise<Project>` | Updates a specific project in Runn | [link](https://developer.runn.io/reference/patch_projects-projectid) |
| `archive(projectId)`: Archives a specific project | [link](https://developer.runn.io/reference/patch_projects-projectid) |
| `unarchive(projectId)`: Unarchives a specific project | [link](https://developer.runn.io/reference/patch_projects-projectid) |
| `addNote(projectId, note)`: Adds a note to a specific project | [link](https://developer.runn.io/reference/post_projects-projectid-notes) |

### Rate Cards

| Method Name | Description | Runn API Reference |
| --- | --- | --- |
| `fetchAll(): Promise<RateCard[]>` | Fetches all rate cards from Runn | [link](https://developer.runn.io/reference/get_rate-cards) |
| `create(name, values): Promise<RateCard>` | Creates a new rate card in Runn | [link](https://developer.runn.io/reference/post_rate-cards) |
| `delete(rateCardId: string): Promise<RateCard>` | Deletes a specific rate card in Runn | [link](https://developer.runn.io/reference/delete_rate-cards-ratecardid) |

### Roles

| Method Name | Description | Runn API Reference |
| --- | --- | --- |
| `fetchAll(): Promise<Role[]>` | Fetches all roles from Runn | [link](https://developer.runn.io/reference/get_roles) |
| `getRoleId(roleName: string): Promise<number>` | Retrieves the ID of a role by name | [link](https://developer.runn.io/reference/get_roles) |
| `create(roleName: string, values): Promise<Role>` | Creates a new role in Runn | [link](https://developer.runn.io/reference/post_roles) |
| `update(roleId: string, values: object): Promise<Role>` | Updates a specific role in Runn | [link](https://developer.runn.io/reference/patch_roles-roleid) |

### Teams

| Method Name | Description | Runn API Reference |
| --- | --- | --- |
| `fetchAll({ modifiedAfter = null }): Promise<TeamMember[]>` | Fetches all team members from Runn | [link](https://developer.runn.io/reference/get_teams) |
| `create(values): Promise<TeamMember>` | Creates a new team member in Runn | [link](https://developer.runn.io/reference/post_teams) |

### Users

| Method Name | Description | Runn API Reference |
| --- | --- | --- |
| `fetchAll({ modifiedAfter = null }): Promise<User[]>` | Fetches all users from Runn | [link](https://developer.runn.io/reference/get_users) |

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
