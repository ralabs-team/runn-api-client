class RunnApiRoles {
  constructor(client) {
    this.client = client;
  }

  // fetches the list of roles from the Runn API
  // https://developer.runn.io/reference/get_roles
  async fetchAll() {
    const values = await this.client.executeRunnApiGET('/roles');

    /*
      {
        "id": 0,
        "name": "string",
        "isArchived": true,
        "defaultHourCost": 0,
        "standardRate": 0,
        "references": [
          {
            "referenceName": "string",
            "externalId": "string"
          }
        ],
        "personIds": [
          0
        ],
        "createdAt": "2024-12-01T09:49:46.564Z",
        "updatedAt": "2024-12-01T09:49:46.564Z"
      }
    */

    this.client.logger.log('debug', `Runn > Roles > fetched ${values.length} roles`);

    return values;
  }

  // create new role
  // https://developer.runn.io/reference/post_roles
  async create(name, references = []) {
    if (this.client.options.isDryRun) {
      this.client.logger.log('debug', `Runn > Roles > (dry-run) created role with name=["${name}"] and id=["..."]`);
      return {};
    }

    const response = await this.client.executeRunnApiPOST('/roles', { name, references });

    /*
      {
        "id": 0,
        "name": "string",
        "isArchived": true,
        "defaultHourCost": 0,
        "standardRate": 0,
        "references": [
          {
            "referenceName": "string",
            "externalId": "string"
          }
        ],
        "personIds": [
          0
        ],
        "createdAt": "2024-12-01T09:49:46.564Z",
        "updatedAt": "2024-12-01T09:49:46.564Z"
      }
    */

    this.client.logger.log('debug', `Runn > Roles > created role with name=["${response.name}"] and id=["${response.id}"]`);

    return response;
  }

  // update new role
  // https://developer.runn.io/reference/patch_roles-roleid
  async update(roleId, newValues) {
    if (this.client.options.isDryRun) {
      this.client.logger.log(
        'debug',
        `Runn > Roles > (dry-run) updated role with name=["..."] and id=["..."] to values=[${JSON.stringify(newValues)}]`,
      );
      return {};
    }

    const response = await this.client.executeRunnApiPATCH(`/roles/${roleId}`, newValues);

    /*
      {
        "id": 0,
        "name": "string",
        "isArchived": true,
        "defaultHourCost": 0,
        "standardRate": 0,
        "references": [
          {
            "referenceName": "string",
            "externalId": "string"
          }
        ],
        "personIds": [
          0
        ],
        "createdAt": "2024-12-01T09:49:46.564Z",
        "updatedAt": "2024-12-01T09:49:46.564Z"
      }
    */

    this.client.logger.log(
      'debug',
      `Runn > Roles > updated role with name=["${response.name}"] and id=["${response.id}"] to values=[${JSON.stringify(newValues)}]`,
    );

    return response;
  }
}

module.exports = RunnApiRoles;
