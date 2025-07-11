class RunnApiMilestones {
  constructor(runnApi) {
    this.runnApi = runnApi;
  }

  // fetches the list of milestones from the Runn API
  // https://developer.runn.io/reference/get_milestones
  async fetchAll() {
    const values = await this.runnApi.executeRunnApiGET('/milestones', { urlParams: { limit: 500 } });

    /*
      {
        "values": [
          {
            "id": 0,
            "title": "string",
            "icon": "string",
            "note": "string",
            "date": "2024-12-24",
            "projectId": 0,
            "createdAt": "2024-12-24T16:03:33.322Z",
            "updatedAt": "2024-12-24T16:03:33.322Z"
          }
        ],
        "nextCursor": "string"
      }
    */

    this.runnApi.logger.log('debug', `Runn > Milestones > fetched ${values.length} milestones`);

    return values;
  }
}

module.exports = RunnApiMilestones;
