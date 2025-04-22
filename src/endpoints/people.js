class RunnApiPeople {
  constructor(runnApi) {
    this.runnApi = runnApi;
  }

  // fetches the list of people from the Runn API
  // https://developer.runn.io/reference/get_people
  async fetchAll({ onlyActive = false, modifiedAfter = null } = {}) {
    const urlParams = {
      includePlaceholders: !onlyActive,
      limit: 200
    };

    // Format: YYYY-MM-DD or YYYY-MM-DDTHH:MM:SSZ
    if (modifiedAfter) {
      urlParams.modifiedAfter = modifiedAfter;
    }

    let values = await this.runnApi.executeRunnApiGET('/people', { urlParams });

    /*
      {
        "id": 0,
        "firstName": "string",
        "lastName": "string",
        "email": "string",
        "isArchived": true,
        "references": [
          {
            "referenceName": "string",
            "externalId": "string"
          }
        ],
        "tags": [
          {
            "id": 0,
            "name": "string"
          }
        ],
        "holidaysGroupId": 0,
        "createdAt": "2024-12-01T09:49:46.564Z",
        "updatedAt": "2024-12-01T09:49:46.564Z"
      }
    */

    if (onlyActive) {
      values = values.filter((person) => !person.isArchived);
    }

    this.runnApi.logger.log('debug', `Runn > People > fetched ${values.length} people`);

    return values;
  }

  // fetches specific person
  // https://developer.runn.io/reference/get_people-personid
  async fetchOneById(personId) {
    const values = await this.runnApi.executeRunnApiGET(`/people/${personId}`, {
      parseResponseFn: (data) => data,
    });

    /*
      {
        "id": 0,
        "firstName": "string",
        "lastName": "string",
        "email": "string",
        "isArchived": true,
        "references": [
          {
            "referenceName": "string",
            "externalId": "string"
          }
        ],
        "notes": [
          {
            "id": 0,
            "note": "string",
            "createdBy": "string"
          }
        ],
        "tags": [
          {
            "id": 0,
            "name": "string"
          }
        ],
        "skills": [
          {
            "id": 0,
            "level": 0
          }
        ],
        "holidaysGroupId": 0,
        "customFields": {
          "select": [
            {
              "id": 0,
              "name": "string",
              "values": [
                {
                  "name": "string",
                  "id": 0
                }
              ]
            }
          ],
          "text": [
            {
              "id": 0,
              "name": "string",
              "value": "string"
            }
          ],
          "checkbox": [
            {
              "id": 0,
              "name": "string",
              "value": true
            }
          ],
          "date": [
            {
              "id": 0,
              "name": "string",
              "value": "2024-12-23"
            }
          ]
        },
        "createdAt": "2024-12-23T22:07:31.321Z",
        "updatedAt": "2024-12-23T22:07:31.321Z"
      }
    */

    this.runnApi.logger.log('debug', `Runn > People > fetched person id=${personId}`);

    return values[0];
  }

  // fetches a single person by email
  // https://developer.runn.io/reference/get_people?email=string
  async fetchOneByEmail(email) {
    const values = await this.runnApi.executeRunnApiGET('/people', { urlParams: { email } });

    if (values.length === 0) {
      throw new Error(`Person with email=${email} not found`);
    }

    return values[0];
  }

  // create new person
  // https://developer.runn.io/reference/post_people
  // required: firstName, lastName, roleId
  async create(firstName, lastName, roleIdOrName, otherValues = {}) {
    if (this.runnApi.options.isDryRun) {
      this.runnApi.logger.log('debug', 'Runn > People > (dry-run) created person with name=["..."] and id=["..."]');
      return {};
    }

    if (!roleIdOrName) {
      throw new Error('Role should be passed as number or string');
    }

    const response = await this.runnApi.executeRunnApiPOST('/people', {
      firstName,
      lastName,
      // if role is passed as string, then resolve it to id
      roleId: await this.runnApi.roles.getRoleId(roleIdOrName),
      ...otherValues,
    });

    /*
      {
        "id": 0,
        "firstName": "string",
        "lastName": "string",
        "email": "string",
        "isArchived": true,
        "references": [
          {
            "referenceName": "string",
            "externalId": "string"
          }
        ],
        "notes": [ ... ],
        "tags": [ ... ],
        "skills": [ ... ],
        "holidaysGroupId": 0,
        "customFields": { ... },
        "createdAt": "2024-12-01T09:49:46.564Z",
        "updatedAt": "2024-12-01T09:49:46.564Z"
      }
    */

    this.runnApi.logger.log(
      'debug',
      `Runn > People > created person with name=["${response.firstName} ${response.lastName}"] and id=["${response.id}"]`,
    );

    return response;
  }

  // update person
  // https://developer.runn.io/reference/patch_people-personid
  async update(personId, values) {
    if (this.runnApi.options.isDryRun) {
      this.runnApi.logger.log(
        'debug',
        `Runn > People > (dry-run) updated person with id=["${personId}"] to values=[${JSON.stringify(values)}]`,
      );
      return {};
    }

    const response = await this.runnApi.executeRunnApiPATCH(`/people/${personId}`, values);

    /*
      {
        "id": 0,
        "firstName": "string",
        "lastName": "string",
        "email": "string",
        "isArchived": true,
        "references": [ .. ],
        "notes": [ ... ],
        "tags": [ ... ],
        "skills": [ ... ],
        "holidaysGroupId": 0,
        "customFields": { ... },
        "createdAt": "2024-12-01T09:49:46.564Z",
        "updatedAt": "2024-12-01T09:49:46.564Z"
      }
    */

    this.runnApi.logger.log('debug', `Runn > People > updated person with id=["${response.id}"] to values=[${JSON.stringify(values)}]`);

    return response;
  }

  // fetches all contracts assigned on person
  // https://developer.runn.io/reference/get_people-personid-contracts
  async fetchContracts(personId) {
    const values = await this.runnApi.executeRunnApiGET(`/people/${personId}/contracts`, { urlParams: { limit: 500 } });

    this.runnApi.logger.log('debug', `Runn > People > fetched ${values.length} contracts for person id=${personId}`);

    return values;
  }

  // add new contract to specific person
  // https://developer.runn.io/reference/post_people-personid-contracts
  async addContract(personId, roleId, options = {}) {
    if (this.runnApi.options.isDryRun) {
      this.runnApi.logger.log('debug', `Runn > People > (dry-run) added contract for person id=${personId} with role id=${roleId}`);
      return {};
    }

    const response = await this.runnApi.executeRunnApiPOST(`/people/${personId}/contracts`, {
      roleId,
      ...options,
    });

    this.runnApi.logger.log('debug', `Runn > People > added contract for person id=${personId} with role id=${roleId}`);

    return response;
  }

  // fetches all teams where person is assigned
  // https://developer.runn.io/reference/get_people-personid-teams-current
  async fetchTeams(personId) {
    const values = await this.runnApi.executeRunnApiGET(`/people/${personId}/teams/current`, { urlParams: { limit: 500 } });

    this.runnApi.logger.log('debug', `Runn > People > fetched ${values.length} teams for person id=${personId}`);

    return values;
  }

  // add a specific person to specific team
  // https://developer.runn.io/reference/post_people-personid-teams
  async addToTeam(personId, teamId) {
    if (this.runnApi.options.isDryRun) {
      this.runnApi.logger.log('debug', `Runn > People > (dry-run) added person id=${personId} to team id=${teamId}`);
      return {};
    }

    const response = await this.runnApi.executeRunnApiPOST(`/people/${personId}/teams`, { teamId });

    this.runnApi.logger.log('debug', `Runn > People > added person id=${personId} to team id=${teamId}`);

    return response;
  }

  // remove a specific team from person
  // https://developer.runn.io/reference/delete_people-personid-teams-teamid
  async removeFromTeam(personId, teamId) {
    if (this.runnApi.options.isDryRun) {
      this.runnApi.logger.log('debug', `Runn > People > (dry-run) removed person id=${personId} from team id=${teamId}`);
      return {};
    }

    const response = await this.runnApi.executeRunnApiDELETE(`/people/${personId}/teams/${teamId}`);

    this.runnApi.logger.log('debug', `Runn > People > removed person id=${personId} from team id=${teamId}`);

    return response;
  }

  // archive person
  // https://developer.runn.io/reference/patch_people-personid
  async archive(personId) {
    return await this.update(personId, { isArchived: true });
  }

  // unarchive person
  // https://developer.runn.io/reference/patch_people-personid
  async unarchive(personId) {
    return await this.update(personId, { isArchived: false });
  }

  // delete a person
  // https://developer.runn.io/reference/delete_people-personid
  async delete(personId) {
    if (this.runnApi.options.isDryRun) {
      this.runnApi.logger.log('debug', `Runn > People > (dry-run) deleted person with id=["${personId}"]`);
      return {};
    }

    const response = await this.runnApi.executeRunnApiDELETE(`/people/${personId}`);

    this.runnApi.logger.log('debug', `Runn > People > deleted person with id=["${personId}"]`);

    return response;
  }
}

module.exports = RunnApiPeople;
