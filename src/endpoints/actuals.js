class RunnApiActuals {
  constructor(runnApi) {
    this.runnApi = runnApi;
  }

  // return all actuals from Runn
  // https://developer.runn.io/reference/get_actuals
  async fetchAll({ modifiedAfter = null } = {}) {
    const urlParams = {
      limit: 500
    };

    // Format: YYYY-MM-DD or YYYY-MM-DDTHH:MM:SSZ
    if (modifiedAfter) {
      urlParams.modifiedAfter = modifiedAfter;
    }

    const values = await this.runnApi.executeRunnApiGET('/actuals', { urlParams });

    /*
    {
      "values": [
        {
          "id": 0,
          "date": "2025-04-20",
          "billableMinutes": 0,
          "nonbillableMinutes": 0,
          "billableNote": "string",
          "nonbillableNote": "string",
          "phaseId": 0,
          "personId": 0,
          "projectId": 0,
          "roleId": 0,
          "workstreamId": 0,
          "createdAt": "2025-04-20T23:39:00.678Z",
          "updatedAt": "2025-04-20T23:39:00.678Z"
        }
      ],
      "nextCursor": "string"
    }
    */

    this.runnApi.logger.log('debug', `Runn > Actuals > fetched ${values.length} actuals`);

    return values;
  }
}

module.exports = RunnApiActuals;
