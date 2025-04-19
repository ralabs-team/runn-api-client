class RunnApiHolidayGroups {
  constructor(runnApi) {
    this.runnApi = runnApi;
  }

  // fetches all holiday groups
  // https://developer.runn.io/reference/get_holiday-groups
  async fetchRunnHolidayGroups() {
    const values = await this.runnApi.executeRunnApiGET('/holiday-groups');

    this.runnApi.logger.log('debug', `Runn > Holiday Groups > fetched ${values.length} holiday groups`);

    /*
      {
        "values": [
          {
            "id": 0,
            "name": "string",
            "countryCode": "string",
            "countryName": "string",
            "regionName": "string",
            "holidayIds": [
              0
            ]
          }
        ],
        "nextCursor": "string"
      }
    */

    return values;
  }
}

module.exports = RunnApiHolidayGroups;
