class RunnApiOtherExpenses {
  constructor(client) {
    this.client = client;
  }

  // fetches the list of other-expenses from the Runn API
  // https://developer.runn.io/reference/get_other-expenses
  async fetchAll() {
    const values = await this.client.executeRunnApiGET('/other-expenses', { urlParams: { limit: 500 } });

    /*
      {
        "values": [
          {
            "id": 0,
            "cost": 0,
            "charge": 0,
            "name": "string",
            "date": "2024-12-24",
            "updatedAt": "2024-12-24T16:08:50.523Z",
            "createdAt": "2024-12-24T16:08:50.523Z",
            "projectId": 0
          }
        ],
        "nextCursor": "string"
      }
    */

    this.client.logger.log('debug', `Runn > OtherExpenses > fetched ${values.length} other-expenses`);

    return values;
  }
}

module.exports = RunnApiOtherExpenses;
