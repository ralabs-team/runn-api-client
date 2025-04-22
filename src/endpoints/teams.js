class RunnApiTeams {
  constructor(runnApi) {
    this.runnApi = runnApi;
  }

  // fetches the list of teams from the Runn API
  // https://developer.runn.io/reference/get_teams
  async fetchAll({ modifiedAfter = null } = {}) {
    const urlParams = {
      limit: 200
    };

    // Format: YYYY-MM-DD or YYYY-MM-DDTHH:MM:SSZ
    if (modifiedAfter) {
      urlParams.modifiedAfter = modifiedAfter;
    }

    const values = await this.runnApi.executeRunnApiGET('/teams', { urlParams });

    /*
      {
        "id": 0,
        "name": "string",
        "createdAt": "2024-12-01T09:49:46.564Z",
        "updatedAt": "2024-12-01T09:49:46.564Z"
      }
    */

    this.runnApi.logger.log('debug', `Runn > Teams > fetched ${values.length} teams`);

    return values;
  }

  // create new team
  // https://developer.runn.io/reference/post_teams
  async create(name) {
    if (this.runnApi.options.isDryRun) {
      this.runnApi.logger.log('debug', `Runn > Teams > (dry-run) created team with name=["${name}"] and id=[...]`);
      return {};
    }

    const response = await this.runnApi.executeRunnApiPOST('/teams', { name });

    /*
      {
        "id": 0,
        "name": "string",
        "createdAt": "2024-12-01T09:49:46.564Z",
        "updatedAt": "2024-12-01T09:49:46.564Z"
      }
    */

    this.runnApi.logger.log('debug', `Runn > Teams > created team with name=["${response.name}"] and id=["${response.id}"]`);

    return response;
  }
}

module.exports = RunnApiTeams;
