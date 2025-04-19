class RunnApiRateCards {
  constructor(runnApi) {
    this.runnApi = runnApi;
  }

  // fetches rate card data from the Runn API.
  // https://developer.runn.io/reference/get_rate-cards
  async fetchAll() {
    const values = await this.runnApi.executeRunnApiGET('/rate-cards');

    this.runnApi.logger.log('debug', `Runn > RateCards > fetched ${values.length} rate cards`);

    /*
      {
        id: 157280,
        name: 'Internal',
        description: null,
        isArchived: false,
        references: [],
        isBlendedRateCard: false,
        blendedRate: 0,
        rateType: 'hours',
        projectIds: [ 957517 ],
        createdAt: '2024-11-28T15:43:32.204Z',
        updatedAt: '2024-11-28T15:43:32.204Z'
      },
    */

    return values;
  }

  // create new rate card on Runn
  // https://developer.runn.io/reference/post_rate-cards
  async create(name, values = {}) {
    if (this.runnApi.options.isDryRun) {
      this.runnApi.logger.log('debug', `Runn > RateCards > (dry-run) created new rate card with params=["${JSON.stringify(values)}"]`);
      return {};
    }

    const response = await this.runnApi.executeRunnApiPOST('/rate-cards', {
      name,
      description: '', // required by Runn API
      isBlendedRateCard: 'false', // required by Runn API
      blendedRate: '',
      rateType: 'hours', // required by Runn API
      ...values,
    });

    /*
      {
        id: 157396,
        name: '6000',
        description: '',
        isArchived: false,
        references: [ { referenceName: 'salesforce.Rate__c', externalId: '6000' } ],
        isBlendedRateCard: true,
        blendedRate: 0,
        rateType: 'hours',
        projectIds: [],
        createdAt: '2024-11-30T00:05:40.736Z',
        updatedAt: '2024-11-30T00:05:40.736Z'
      }
    */

    this.runnApi.logger.log('debug', `Runn > RateCards > Created a new rate card "${response.name}" and id="${response.id}"`);

    return response;
  }

  // TODO blocked by Runn API
  // https://developer.runn.io/reference/delete_rate-cards-ratecardid
  async delete(rateCardId) {
    if (this.runnApi.options.isDryRun) {
      this.runnApi.logger.log('debug', `Runn > RateCards > (dry-run) deleted rate card with id=["${rateCardId}"]`);
      return {};
    }

    const response = await this.runnApi.executeRunnApiDELETE(`/rate-cards/${rateCardId}`);

    this.runnApi.logger.log('debug', `Runn > RateCards > deleted rate card with id="${rateCardId}"`);

    return response.status == 204;
  }
}

module.exports = RunnApiRateCards;
