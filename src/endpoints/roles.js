class RunnApiRoles {
  constructor(runnApi) {
    this.runnApi = runnApi;
  }

  // fetches the list of roles from the Runn API
  // https://developer.runn.io/reference/get_roles
  async fetchAll() {
    const values = await this.runnApi.executeRunnApiGET('/roles');

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

    this.runnApi.logger.log('debug', `Runn > Roles > fetched ${values.length} roles`);

    return values;
  }

  // if role is number, return it
  // if role is string, then fetch all roles, and find this one, and return it's id
  async getRoleId(role) {
    if (typeof role === 'number') {
      return role;
    }

    const roles = await this.fetchAll();
    const foundRole = roles.find((r) => r.name.toLowerCase() === role.toLowerCase());
    if (foundRole) {
      return foundRole.id;
    }

    throw new Error(`Role not found: ${role}`);
  }

  // create new role
  // https://developer.runn.io/reference/post_roles
  async create(name, references = []) {
    if (this.runnApi.options.isDryRun) {
      this.runnApi.logger.log('debug', `Runn > Roles > (dry-run) created role with name=["${name}"] and id=["..."]`);
      return {};
    }

    const response = await this.runnApi.executeRunnApiPOST('/roles', { name, references });

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

    this.runnApi.logger.log('debug', `Runn > Roles > created role with name=["${response.name}"] and id=["${response.id}"]`);

    return response;
  }

  // update new role
  // https://developer.runn.io/reference/patch_roles-roleid
  async update(roleId, newValues) {
    if (this.runnApi.options.isDryRun) {
      this.runnApi.logger.log(
        'debug',
        `Runn > Roles > (dry-run) updated role with name=["..."] and id=["..."] to values=[${JSON.stringify(newValues)}]`,
      );
      return {};
    }

    const response = await this.runnApi.executeRunnApiPATCH(`/roles/${roleId}`, newValues);

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

    this.runnApi.logger.log(
      'debug',
      `Runn > Roles > updated role with name=["${response.name}"] and id=["${response.id}"] to values=[${JSON.stringify(newValues)}]`,
    );

    return response;
  }
}

module.exports = RunnApiRoles;
