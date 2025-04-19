class RunnApiTeams {
  constructor(client) {
    this.client = client;
  }

  // fetches the list of teams from the Runn API
  // https://developer.runn.io/reference/get_teams
  async fetchAll() {
    const values = await this.client.executeRunnApiGET('/teams');

    /*
      {
        "id": 0,
        "name": "string",
        "createdAt": "2024-12-01T09:49:46.564Z",
        "updatedAt": "2024-12-01T09:49:46.564Z"
      }
    */

    this.client.logger.log('debug', `Runn > Teams > fetched ${values.length} teams`);

    return values;
  }

  // create new team
  // https://developer.runn.io/reference/post_teams
  async create(name) {
    if (this.client.options.isDryRun) {
      this.client.logger.log('debug', `Runn > Teams > (dry-run) created team with name=["${name}"] and id=[...]`);
      return {};
    }

    const response = await this.client.executeRunnApiPOST('/teams', { name });

    /*
      {
        "id": 0,
        "name": "string",
        "createdAt": "2024-12-01T09:49:46.564Z",
        "updatedAt": "2024-12-01T09:49:46.564Z"
      }
    */

    this.client.logger.log('debug', `Runn > Teams > created team with name=["${response.name}"] and id=["${response.id}"]`);

    return response;
  }
}

module.exports = RunnApiTeams;
