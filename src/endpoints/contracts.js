class RunnApiContracts {
  constructor(runnApi) {
    this.runnApi = runnApi;
  }

  // fetches all people contracts
  // https://developer.runn.io/reference/get_contracts
  async fetchAll() {
    const values = await this.runnApi.executeRunnApiGET('/contracts');

    this.runnApi.logger.log('debug', `Runn > Contracts > fetched ${values.length} people contracts`);

    /*
      {
        "values": [
          {
            "id": 0,
            "costPerHour": 0,
            "employmentType": "string",
            "minutesPerDay": 0,
            "rosteredDays": {
              "monday": 0,
              "tuesday": 0,
              "wednesday": 0,
              "thursday": 0,
              "friday": 0
            },
            "startDate": "2024-12-23",
            "endDate": "2024-12-23",
            "roleId": 0,
            "personId": 0,
            "jobTitle": "string",
            "createdAt": "2024-12-23T22:28:56.587Z",
            "updatedAt": "2024-12-23T22:28:56.587Z"
          }
        ],
        "nextCursor": "string"
      }
    */

    return values;
  }
}

module.exports = RunnApiContracts;
