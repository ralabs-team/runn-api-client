class RunnApiActivityLog {
  constructor(runnApi) {
    this.runnApi = runnApi;
  }

  // fetches the list of activity log entries from the Runn API
  // https://developer.runn.io/reference/get_activity-log
  async fetchAll({ occurredAfter = null } = {}) {
    const urlParams = {
      limit: 200,
    };

    // Format: YYYY-MM-DD or YYYY-MM-DDTHH:MM:SSZ
    if (occurredAfter) {
      urlParams.occurredAfter = occurredAfter;
    }

    try {
      const values = await this.runnApi.executeRunnApiGET('/activity-log', { urlParams });

      /*
        {
          "values": [
            {
              "eventId": "string",
              "type": "project_deleted",
              "actor": {
                "type": "runn_support"
              },
              "timestamp": "2025-04-20T23:39:00.678Z",
              "project": {
                "id": 0,
                "name": "string"
              }
            },
          ],
          "nextCursor": "string"
        }
      */

      this.runnApi.logger.log('debug', `Runn > Activity Log > fetched ${values.length} activity log entries`);

      return values;
    } catch (error) {
      if (error.response && error.response.status === 422) {
        // Activity log events are not available for test accounts. Please use a live account to access activity logs.
        throw new Error(`Error: ${error.response.data.message}`);
      }

      throw new Error(`Error: ${error.response?.data?.message}`);
    }
  }
}

module.exports = RunnApiActivityLog;
