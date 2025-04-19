class RunnApiPhases {
  constructor(client) {
    this.client = client;
  }

  // fetches the list of phases from the Runn API
  // https://developer.runn.io/reference/get_phases
  async fetchAll() {
    const values = await this.client.executeRunnApiGET('/phases', { urlParams: { limit: 500 } });

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

    this.client.logger.log('debug', `Runn > Phases > fetched ${values.length} phases`);

    return values;
  }
}

module.exports = RunnApiPhases;
