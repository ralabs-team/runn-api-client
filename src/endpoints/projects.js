class RunnApiProjects {
  constructor(runnApi) {
    this.runnApi = runnApi;
  }

  // fetches the list of projects from the Runn API.
  // https://developer.runn.io/reference/get_projects-projectid
  // https://app.runn.io/projects
  async fetchAll() {
    const values = await this.runnApi.executeRunnApiGET('/projects');

    /*
      {
        "id": 0,
        "name": "string",
        "isTemplate": true,
        "isArchived": true,
        "isConfirmed": true,
        "pricingModel": "fp",
        "rateType": "hours",
        "teamId": 0,
        "budget": 0,
        "expensesBudget": 0,
        "references": [ ... ],
        "clientId": 0,
        "rateCardId": 0,
        "customFields": { ... },
        "tags": [ { "id": 0, "name": "string" } ],
        "createdAt": "2024-12-01T15:31:36.195Z",
        "updatedAt": "2024-12-01T15:31:36.195Z"
      }
    */

    this.runnApi.logger.log('debug', `Runn > Projects > fetched ${values.length} projects`);

    return values;
  }

  // creates a new project in runn
  // https://app.runn.io/projects
  // https://developer.runn.io/reference/post_projects
  async create(name, runnApiId, values = {}) {
    if (this.runnApi.options.isDryRun) {
      this.runnApi.logger.log('debug', `Runn > Projects > (dry-run) created new project with name=["${name}"]`);
      return {};
    }

    const response = await this.runnApi.executeRunnApiPOST('/projects', {
      name, // required by Runn API
      runnApiId, // required by Runn API
      ...values,
    });

    /*
      {
        "id": 0,
        "name": "string",
        "isTemplate": true,
        "isArchived": true,
        "isConfirmed": true,
        "pricingModel": "fp",
        "rateType": "hours",
        "teamId": 0,
        "budget": 0,
        "expensesBudget": 0,
        "references": [ .. ],
        "clientId": 0,
        "rateCardId": 0,
        "customFields": { .. },
        "tags": [ { "id": 0, "name": "string" } ],
        "createdAt": "2024-12-01T15:31:36.195Z",
        "updatedAt": "2024-12-01T15:31:36.195Z"
      }
    */

    this.runnApi.logger.log('debug', `Runn > Projects > Created a project "${response.name}" and id="${response.id}"`);

    return response;
  }

  // pick custom field value on a specific project
  // https://developer.runn.io/reference/patch_projects-projectid-custom-fields-select
  async addCustomSelectFieldValues(projectId, selectId, values = []) {
    values = values.filter((value) => value != null);

    if (this.runnApi.options.isDryRun) {
      this.runnApi.logger.log(
        'debug',
        `Runn > Projects > (dry-run) updated project id=[${projectId}] custom field [${selectId}] to values=[${JSON.stringify(values)}]`,
      );
      return {};
    }

    if (!values.length) {
      this.runnApi.logger.log('warn', `Runn > Projects > empty values passed to update project [${projectId}] custom field [${selectId}]`);
      return;
    }

    try {
      const response = await this.runnApi.executeRunnApiPATCH(`/projects/${projectId}/custom-fields/select`, {
        id: selectId,
        values,
      });

      /*
        {
          "id": 0,
          "values": [ { "id": 0 } ]
        }
      */

      this.runnApi.logger.log(
        'debug',
        `Runn > Projects > updated project id=[${projectId}] custom field [${selectId}] to ${response.values.length} values`,
      );

      return response;
    }
    catch (e) {
      this.runnApi.logger.log('error', `Runn > Projects > failed to update project id=[${projectId}] custom field [${selectId}]`, e);
      return null;
    }
  }

  // update project
  // https://developer.runn.io/reference/patch_projects-projectid
  async update(projectId, newValues) {
    if (this.runnApi.options.isDryRun) {
      this.runnApi.logger.log(
        'debug',
        `Runn > Projects > (dry-run) updated person with id=[${projectId}] to values=[${JSON.stringify(newValues)}]`,
      );
      return {};
    }

    const response = await this.runnApi.executeRunnApiPATCH(`/projects/${projectId}`, newValues);

    /*
      {
        "id": 0,
        "name": "string",
        "isTemplate": true,
        "isArchived": true,
        "isConfirmed": true,
        "pricingModel": "fp",
        "rateType": "hours",
        "teamId": 0,
        "budget": 0,
        "expensesBudget": 0,
        "references": [ { "referenceName": "string", "externalId": "string" } ],
        "clientId": 0,
        "rateCardId": 0,
        "customFields": { ... },
        "tags": [ { "id": 0, "name": "string" } ],
        "createdAt": "2024-12-01T15:31:36.195Z",
        "updatedAt": "2024-12-01T15:31:36.195Z"
      }
    */

    this.runnApi.logger.log('debug', `Runn > Projects > updated project with id=[${response.id}] to values=[${JSON.stringify(newValues)}]`);

    return response;
  }

  // archive a specific project on Runn
  // https://developer.runn.io/reference/patch_projects-projectid
  async archive(projectId) {
    return await this.update(projectId, { isArchived: true });
  }

  // unarchive a specific project on Runn
  // https://developer.runn.io/reference/patch_projects-projectid
  async unarchive(projectId) {
    return await this.update(projectId, { isArchived: false });
  }

  // create a project note
  // usually used to keep history when some changes been made on project, or why project was archived
  // https://developer.runn.io/reference/post_projects-projectid-notes
  async addNote(projectId, note) {
    if (this.runnApi.options.isDryRun) {
      this.runnApi.logger.log('debug', `Runn > Projects > (dry-run) added note to project with id=[${projectId}]`);
      return {};
    }

    const response = await this.runnApi.executeRunnApiPOST(`/projects/${projectId}/notes`, { note });

    /*
      {
        id: 91166,
        createdBy: 'API',
        createdByEmail: null,
        createdAt: '2024-11-30T18:20:32.185Z',
        note: 'migration script v0.1, archived project since assigned client was not found on salesforce, client.name="Apple", client.references="[]"' // eslint-disable-line max-len
      }
    */

    this.runnApi.logger.log('debug', `Runn > Projects > added note to project with id=[${projectId}]`);

    return response;
  }
}

module.exports = RunnApiProjects;
