class RunnApiClients {
  constructor(runnApi) {
    this.runnApi = runnApi;
  }

  // fetches the list of clients from the Runn API.
  // https://developer.runn.io/reference/get_clients
  async fetchAll({ onlyActive = false, modifiedAfter = null } = {}) {
    const urlParams = {
      limit: 200
    };

    // Format: YYYY-MM-DD or YYYY-MM-DDTHH:MM:SSZ
    if (modifiedAfter) {
      urlParams.modifiedAfter = modifiedAfter;
    }

    const values = await this.runnApi.executeRunnApiGET('/clients', { urlParams });

    /*
      {
        id: 450966,
        name: 'APC',
        website: null,
        isArchived: false,
        references: [],
        createdAt: '2024-11-28T15:43:32.198Z',
        updatedAt: '2024-11-28T15:43:32.198Z'
      }
    */

    if (onlyActive) {
      values = values.filter((client) => !client.isArchived);
    }

    this.runnApi.logger.log('debug', `Runn > Clients > fetched ${values.length} clients`);

    return values;
  }

  // fetches a specific client from the Runn API.
  // https://developer.runn.io/reference/get_clients-clientid
  async fetchOneById(clientId) {
    const response = await this.runnApi.executeRunnApiGET(`/clients/${clientId}`);

    this.runnApi.logger.log('debug', `Runn > Clients > fetched client with id="${clientId}"`);

    return response;
  }

  // creates a new client in Runn by sending a POST request to the Runn API.
  // https://developer.runn.io/reference/post_clients
  async create(name, references = []) {
    if (this.runnApi.options.isDryRun) {
      this.runnApi.logger.log('debug', `Runn > Clients > (dry-run) created new client name=["${name}"]`);
      return {};
    }

    const response = await this.runnApi.executeRunnApiPOST('/clients', {
      name,
      references,
    });

    /*
      {
        id: 451322,
        name: 'Sanifit',
        website: null,
        isArchived: false,
        references: [
          {
            referenceName: 'salesforce.Id',
            externalId: '0010Z00001t4cUSQAY'
          }
        ],
        createdAt: '2024-11-29T23:06:06.133Z',
        updatedAt: '2024-11-29T23:06:06.133Z'
      }
    */

    this.runnApi.logger.log('debug', `Runn > Clients > created new client "${name}"`);

    return response;
  }

  // update values on specific client on runn
  // https://developer.runn.io/reference/patch_clients-clientid
  async update(clientId, newValues) {
    if (this.runnApi.options.isDryRun) {
      this.runnApi.logger.log(
        'debug',
        `Runn > Clients > (dry-run) updated client with id="${clientId}", and set values=[${JSON.stringify(newValues)}]`,
      );
      return {};
    }

    const response = await this.runnApi.executeRunnApiPATCH(`/clients/${clientId}`, newValues);

    /*
      {
        id: 451364,
        name: 'Saniona',
        website: '',
        isArchived: false,
        references: [
          {
            referenceName: 'salesforce.Id',
            externalId: '0010Z00001t4wazQAA'
          }
        ],
        createdAt: '2024-11-30T17:49:53.708Z',
        updatedAt: '2024-11-30T18:40:54.252Z'
      }
    */

    this.runnApi.logger.log('debug', `Runn > Clients > updated client with id="${clientId}", and set values=[${JSON.stringify(newValues)}]`);

    // TODO remove
    if (response.id !== clientId) {
      this.runnApi.logger.log('error', 'updateRunnClient: not updated', response);
      // process.exit(0);
    }

    return response;
  }

  // archive a specific client on Runn
  // since there're no Runn API endpoint to delete account
  // https://developer.runn.io/reference/patch_clients-clientid
  async archive(clientId) {
    try {
      return await this.update(clientId, { isArchived: true });
    } catch (e) {
      // TODO: handle it properly
      console.error(e);
    }
  }

  // unarchive a specific client on Runn
  // https://developer.runn.io/reference/patch_clients-clientid
  async unarchive(clientId) {
    return await this.update(clientId, { isArchived: false });
  }

  // List a client's projects
  // https://developer.runn.io/reference/get_clients-clientid-projects
  async listProjects(clientId) {
    const projects = await this.executeRunnApiGET(`/clients/${clientId}/projects`);

    this.runnApi.logger.log('debug', `Runn > Clients > received [${projects.length}] projects assigned on client with id="${clientId}"`);

    /*
      {
        id: 1923,
        name: 'iHuman OS',
        isTemplate: false,
        isArchived: false,
        isConfirmed: false,
        pricingModel: 'tm',
        rateType: 'hours',
        teamId: null,
        budget: 144000,
        expensesBudget: null,
        references: [],
        clientId: 1663,
        rateCardId: 702,
        customFields: [Object],
        tags: [Array],
        createdAt: '2020-03-08T04:01:51.599Z',
        updatedAt: '2020-06-07T18:58:01.188Z'
      },
    */

    return projects;
  }
}

module.exports = RunnApiClients;
