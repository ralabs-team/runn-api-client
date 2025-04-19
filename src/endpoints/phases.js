class RunnApiPhases {
  constructor(runnApi) {
    this.runnApi = runnApi;
  }

  // fetches the list of phases from the Runn API
  // https://developer.runn.io/reference/get_phases
  async fetchAll() {
    const values = await this.runnApi.executeRunnApiGET('/phases', { urlParams: { limit: 500 } });

    /*
      {
        "values": [
          {
            "id": 0,
            "name": "string",
            "color": "string",
            "startDate": "2024-12-24",
            "endDate": "2024-12-24",
            "updatedAt": "2024-12-24T16:03:33.322Z",
            "createdAt": "2024-12-24T16:03:33.322Z",
            "projectId": 0
          }
        ],
        "nextCursor": "string"
      }
    */

    this.runnApi.logger.log('debug', `Runn > Phases > fetched ${values.length} phases`);

    return values;
  }
}

module.exports = RunnApiPhases;
