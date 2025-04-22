class RunnApiUsers {
  constructor(runnApi) {
    this.runnApi = runnApi;
  }

  // fetches the list of users from the Runn API
  // https://developer.runn.io/reference/get_users
  async fetchAll({ modifiedAfter = null } = {}) {
    const urlParams = {
      limit: 200
    };

    // Format: YYYY-MM-DD or YYYY-MM-DDTHH:MM:SSZ
    if (modifiedAfter) {
      urlParams.modifiedAfter = modifiedAfter;
    }

    const values = await this.runnApi.executeRunnApiGET('/users', { urlParams });

    /*
      {
        "id": 0,
        "name": "string",
        "createdAt": "2024-12-01T09:49:46.564Z",
        "updatedAt": "2024-12-01T09:49:46.564Z"
      }
    */

    this.runnApi.logger.log('debug', `Runn > Users > fetched ${values.length} users`);

    return values;
  }
}

module.exports = RunnApiUsers;
