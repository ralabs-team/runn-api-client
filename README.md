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

| Method Name | Description | Documentation Link |
| --- | --- | --- |
| `fetchAll({ onlyActive: boolean, modifiedAfter: string }): Promise<Activity[]>` | Fetches all activities from Runn | [link](https://developer.runn.io/reference/get_activities) |

### Actuals

| Method Name | Description | Documentation Link |
| --- | --- | --- |
| `fetchAll({ onlyActive: boolean, modifiedAfter: string }): Promise<Actual[]>` | Fetches all actuals from Runn | [link](https://developer.runn.io/reference/get_actuals) |

### Assignments

| Method Name | Description | Documentation Link |
| --- | --- | --- |
| `fetchAll({ onlyActive: boolean, modifiedAfter: string }): Promise<Assignment[]>` | Fetches all assignments from Runn | [link](https://developer.runn.io/reference/get_assignments) |

### Clients

| Method Name | Description | Documentation Link |
| --- | --- | --- |
| `fetchAll(): Promise<Client[]>` | Fetches all clients from Runn | [link](https://developer.runn.io/reference/get_clients) |
| `fetchOneById(clientId: string): Promise<Client>` | Fetches a specific client from Runn | [link](https://developer.runn.io/reference/get_clients-clientid) |
| `create(name: string, references: string): Promise<Client>` | Creates a new client in Runn | [link](https://developer.runn.io/reference/post_clients) |
| `update(clientId: string, values: object): Promise<Client>` | Updates a specific client in Runn | [link](https://developer.runn.io/reference/patch_clients-clientid) |
| `archive(clientId: string): Promise<Client>` | Archives a specific client in Runn | [link](https://developer.runn.io/reference/patch_clients-clientid) |
| `unarchive(clientId: string): Promise<Client>` | Unarchives a specific client in Runn | [link](https://developer.runn.io/reference/patch_clients-clientid) |
| `listProjects(clientId: string): Promise<Project[]>` | Fetches all projects assigned to a specific client | [link](https://developer.runn.io/reference/get_clients-clientid-projects) |

### Contracts

| Method Name | Description | Documentation Link |
| --- | --- | --- |
| `fetchAll({ onlyActive: boolean, modifiedAfter: string }): Promise<Contract[]>` | Fetches all contracts from Runn | [link](https://developer.runn.io/reference/get_contracts) |
| `fetchOneById(contractId: string): Promise<Contract>` | Fetches a specific contract from Runn | [link](https://developer.runn.io/reference/get_contracts-contractid) |
| `create(values): Promise<Contract>` | Creates a new contract in Runn | [link](https://developer.runn.io/reference/post_contracts) |
| `update(contractId: string, values: object): Promise<Contract>` | Updates a specific contract in Runn | [link](https://developer.runn.io/reference/patch_contracts-contractid) |
| `archive(contractId: string): Promise<Contract>` | Archives a specific contract in Runn | [link](https://developer.runn.io/reference/patch_contracts-contractid) |
| `unarchive(contractId: string): Promise<Contract>` | Unarchives a specific contract in Runn | [link](https://developer.runn.io/reference/patch_contracts-contractid) |

### Custom Fields

| Method Name | Description | Documentation Link |
| --- | --- | --- |
| `fetchAll({ onlyActive: boolean, modifiedAfter: string }): Promise<CustomField[]>` | Fetches all custom fields from Runn | [link](https://developer.runn.io/reference/get_custom_fields) |
| `fetchOneById(customFieldId: string): Promise<CustomField>` | Fetches a specific custom field from Runn | [link](https://developer.runn.io/reference/get_custom_fields-customfieldid) |
| `create(values): Promise<CustomField>` | Creates a new custom field in Runn | [link](https://developer.runn.io/reference/post_custom_fields) |
| `update(customFieldId: string, values: object): Promise<CustomField>` | Updates a specific custom field in Runn | [link](https://developer.runn.io/reference/patch_custom_fields-customfieldid) |
| `archive(customFieldId: string): Promise<CustomField>` | Archives a specific custom field in Runn | [link](https://developer.runn.io/reference/patch_custom_fields-customfieldid) |
| `unarchive(customFieldId: string): Promise<CustomField>` | Unarchives a specific custom field in Runn | [link](https://developer.runn.io/reference/patch_custom_fields-customfieldid) |

### Holiday Groups

| Method Name | Description | Documentation Link |
| --- | --- | --- |
| `fetchAll(): Promise<HolidayGroup[]>` | Fetches all holiday groups from Runn | [link](https://developer.runn.io/reference/get_holiday_groups) |
| `fetchOneById(holidayGroupId: string): Promise<HolidayGroup>` | Fetches a specific holiday group from Runn | [link](https://developer.runn.io/reference/get_holiday_groups-holidaygroupid) |
| `create(values): Promise<HolidayGroup>` | Creates a new holiday group in Runn | [link](https://developer.runn.io/reference/post_holiday_groups) |
| `update(holidayGroupId: string, values: object): Promise<HolidayGroup>` | Updates a specific holiday group in Runn | [link](https://developer.runn.io/reference/patch_holiday_groups-holidaygroupid) |
| `archive(holidayGroupId: string): Promise<HolidayGroup>` | Archives a specific holiday group in Runn | [link](https://developer.runn.io/reference/patch_holiday_groups-holidaygroupid) |
| `unarchive(holidayGroupId: string): Promise<HolidayGroup>` | Unarchives a specific holiday group in Runn | [link](https://developer.runn.io/reference/patch_holiday_groups-holidaygroupid) |

### Milestones

| Method Name | Description | Documentation Link |
| --- | --- | --- |
| `fetchAll({ onlyActive: boolean, modifiedAfter: string }): Promise<Milestone[]>` | Fetches all milestones from Runn | [link](https://developer.runn.io/reference/get_milestones) |
| `fetchOneById(milestoneId: string): Promise<Milestone>` | Fetches a specific milestone from Runn | [link](https://developer.runn.io/reference/get_milestones-milestoneid) |
| `create(values): Promise<Milestone>` | Creates a new milestone in Runn | [link](https://developer.runn.io/reference/post_milestones) |
| `update(milestoneId: string, values: object): Promise<Milestone>` | Updates a specific milestone in Runn | [link](https://developer.runn.io/reference/patch_milestones-milestoneid) |
| `archive(milestoneId: string): Promise<Milestone>` | Archives a specific milestone in Runn | [link](https://developer.runn.io/reference/patch_milestones-milestoneid) |
| `unarchive(milestoneId: string): Promise<Milestone>` | Unarchives a specific milestone in Runn | [link](https://developer.runn.io/reference/patch_milestones-milestoneid) |

### Other Expenses

| Method Name | Description | Documentation Link |
| --- | --- | --- |
| `fetchAll({ onlyActive: boolean, modifiedAfter: string }): Promise<OtherExpense[]>` | Fetches all other expenses from Runn | [link](https://developer.runn.io/reference/get_other_expenses) |
| `fetchOneById(otherExpenseId: string): Promise<OtherExpense>` | Fetches a specific other expense from Runn | [link](https://developer.runn.io/reference/get_other_expenses-otherexpenseid) |
| `create(values): Promise<OtherExpense>` | Creates a new other expense in Runn | [link](https://developer.runn.io/reference/post_other_expenses) |
| `update(otherExpenseId: string, values: object): Promise<OtherExpense>` | Updates a specific other expense in Runn | [link](https://developer.runn.io/reference/patch_other_expenses-otherexpenseid) |
| `archive(otherExpenseId: string): Promise<OtherExpense>` | Archives a specific other expense in Runn | [link](https://developer.runn.io/reference/patch_other_expenses-otherexpenseid) |
| `unarchive(otherExpenseId: string): Promise<OtherExpense>` | Unarchives a specific other expense in Runn | [link](https://developer.runn.io/reference/patch_other_expenses-otherexpenseid) |

### People
| Method Name | Description | Documentation Link |
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

| Method Name | Description | Documentation Link |
| --- | --- | --- |
| `fetchAll({ onlyActive: boolean, modifiedAfter: string }): Promise<Phase[]>` | Fetches all phases from Runn | [link](https://developer.runn.io/reference/get_phases) |
| `fetchOneById(phaseId: string): Promise<Phase>` | Fetches a specific phase from Runn | [link](https://developer.runn.io/reference/get_phases-phaseid) |
| `create(values): Promise<Phase>` | Creates a new phase in Runn | [link](https://developer.runn.io/reference/post_phases) |
| `update(phaseId: string, values: object): Promise<Phase>` | Updates a specific phase in Runn | [link](https://developer.runn.io/reference/patch_phases-phaseid) |
| `archive(phaseId: string): Promise<Phase>` | Archives a specific phase in Runn | [link](https://developer.runn.io/reference/patch_phases-phaseid) |
| `unarchive(phaseId: string): Promise<Phase>` | Unarchives a specific phase in Runn | [link](https://developer.runn.io/reference/patch_phases-phaseid) |

### Project Tags

| Method Name | Description | Documentation Link |
| --- | --- | --- |
| `fetchAll(): Promise<ProjectTag[]>` | Fetches all project tags from Runn | [link](https://developer.runn.io/reference/get_project_tags) |
| `create(values): Promise<ProjectTag>` | Creates a new project tag in Runn | [link](https://developer.runn.io/reference/post_project_tags) |
| `update(projectTagId: string, values: object): Promise<ProjectTag>` | Updates a specific project tag in Runn | [link](https://developer.runn.io/reference/patch_project_tags-projecttagid) |
| `archive(projectTagId: string): Promise<ProjectTag>` | Archives a specific project tag in Runn | [link](https://developer.runn.io/reference/patch_project_tags-projecttagid) |
| `unarchive(projectTagId: string): Promise<ProjectTag>` | Unarchives a specific project tag in Runn | [link](https://developer.runn.io/reference/patch_project_tags-projecttagid) |

### Projects

| Method Name | Description | Documentation Link |
| --- | --- | --- |
| `fetchAll(): Promise<Project[]>` | Fetches all projects from Runn | [link](https://developer.runn.io/reference/get_projects) |
| `create(values)`: Creates a new project in Runn | [link](https://developer.runn.io/reference/post_projects) |
| `addNote(projectId, note)`: Adds a note to a specific project | [link](https://developer.runn.io/reference/post_projects-projectid-notes) |
| `archive(projectId)`: Archives a specific project | [link](https://developer.runn.io/reference/patch_projects-projectid) |
| `unarchive(projectId)`: Unarchives a specific project | [link](https://developer.runn.io/reference/patch_projects-projectid) |

### Rate Cards

| Method Name | Description | Documentation Link |
| --- | --- | --- |
| `fetchAll(): Promise<RateCard[]>` | Fetches all rate cards from Runn | [link](https://developer.runn.io/reference/get_rate_cards) |
| `create(values): Promise<RateCard>` | Creates a new rate card in Runn | [link](https://developer.runn.io/reference/post_rate_cards) |
| `update(rateCardId: string, values: object): Promise<RateCard>` | Updates a specific rate card in Runn | [link](https://developer.runn.io/reference/patch_rate_cards-ratecardid) |
| `archive(rateCardId: string): Promise<RateCard>` | Archives a specific rate card in Runn | [link](https://developer.runn.io/reference/patch_rate_cards-ratecardid) |
| `unarchive(rateCardId: string): Promise<RateCard>` | Unarchives a specific rate card in Runn | [link](https://developer.runn.io/reference/patch_rate_cards-ratecardid) |

### Roles

| Method Name | Description | Documentation Link |
| --- | --- | --- |
| `fetchAll(): Promise<Role[]>` | Fetches all roles from Runn | [link](https://developer.runn.io/reference/get_roles) |

### Teams

| Method Name | Description | Documentation Link |
| --- | --- | --- |
| `fetchAll(): Promise<TeamMember[]>` | Fetches all team members from Runn | [link](https://developer.runn.io/reference/get_team) |

### Users

| Method Name | Description | Documentation Link |
| --- | --- | --- |
| `fetchAll(): Promise<User[]>` | Fetches all users from Runn | [link](https://developer.runn.io/reference/get_users) |

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
