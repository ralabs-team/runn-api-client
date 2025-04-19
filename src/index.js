const axios = require('axios');
const qs = require('qs');

const Logger = require('./helpers/log');
const { delay, getRandom } = require('./helpers');

// Runn API client
// https://developer.runn.io/reference/

class RunnApiClient {
  constructor(apiKey, options) {
    this.apiKey = apiKey;
    this.options = {
      RUNN_API_URL: 'https://api.runn.io',
      isDryRun: false,
      logLevel: 'error',
      ...options,
    };

    this.logger = new Logger({
      logLevel: this.options.logLevel,
    });

    this.assignments = new (require('./endpoints/assignments'))(this);
    this.clients = new (require('./endpoints/clients'))(this);
    this.contracts = new (require('./endpoints/contracts'))(this);
    this.customFields = new (require('./endpoints/custom-fields'))(this);
    this.holidayGroups = new (require('./endpoints/holiday-groups'))(this);
    this.milestones = new (require('./endpoints/milestones'))(this);
    this.otherExpenses = new (require('./endpoints/other-expenses'))(this);
    this.people = new (require('./endpoints/people'))(this);
    this.phases = new (require('./endpoints/phases'))(this);
    this.projectTags = new (require('./endpoints/project-tags'))(this);
    this.projects = new (require('./endpoints/projects'))(this);
    this.rateCards = new (require('./endpoints/rate-cards'))(this);
    this.roles = new (require('./endpoints/roles'))(this);
    this.teams = new (require('./endpoints/teams'))(this);
  }

  // return default headers needed by Runn API
  // https://developer.runn.io/reference/
  getRequestHeaders(requestMethod = 'get') {
    const headers = {
      accept: 'application/json',
      'accept-version': '1.0.0',
      authorization: `Bearer ${this.apiKey}`,
    };

    if (requestMethod !== 'get' && requestMethod !== 'delete') {
      headers['content-type'] = 'application/json';
    }

    return headers;
  }

  // reusable wrapper for Runn API calls
  async executeRunnApiCallWithRetry(apiCall, maxRetries = 5) {
    let retries = 0;

    while (retries <= maxRetries) {
      try {
        const response = await apiCall();

        // how many requests remain to the client in the time window
        const ratelimitRemaining = response.headers['x-ratelimit-remaining'];

        // how many seconds must pass before the rate limit resets
        const ratelimitReset = response.headers['x-ratelimit-reset'];

        // https://developer.runn.io/docs/rate-limits
        // if rate limit will be reached in 20seconds,
        // then it's better to add random delay between 0.5s to 2s to avoid rate-limits from Runn API

        if (ratelimitRemaining < 60 && ratelimitReset > 30) {
          await delay(getRandom(1000, 3000));
        }
        if (ratelimitRemaining < 20) {
          await delay(getRandom(1000, 5000));
        }

        return response;
      } catch (err) {
        const statusCode = err?.response?.status;

        if (statusCode == 401) {
          this.logger.log('error', 'Unauthorized, incorrect API key');
          throw new Error('Unauthorized, incorrect API key');
        }

        // response error on Runn API side
        if (statusCode >= 500 && statusCode < 600) {
          this.logger.log('error', `Runn API respond ${statusCode} error`);
          await delay(2000);
        } else if (statusCode === 429 && retries < maxRetries) {
          // console.log('err?.response.headers', err?.response.headers);
          // console.log('x-ratelimit-limit', err?.response.headers['x-ratelimit-limit']); // how many requests the client can make  // eslint-disable-line max-len
          // console.log('x-ratelimit-remaining', err?.response.headers['x-ratelimit-remaining']); // how many requests remain to the client in the time window  // eslint-disable-line max-len
          // console.log('x-ratelimit-reset', err?.response.headers['x-ratelimit-reset']); // how many seconds must pass before the rate limit resets  // eslint-disable-line max-len
          // console.log('retry-after', err?.response.headers['retry-after']); // wait before they can make new requests // eslint-disable-line max-len

          // how many seconds must pass before the rate limit resets
          const ratelimitReset = err?.response.headers['x-ratelimit-reset'];

          let delaySecondsWait = ratelimitReset + 1;

          if (!delaySecondsWait) {
            delaySecondsWait = 60;
          }

          retries++;
          this.logger.log(
            'info',
            `Runn API request limit exceeded. Retrying ${retries}/${maxRetries} in ${delaySecondsWait} seconds...`,
          );
          await delay(delaySecondsWait * 1000);
        } else {
          // Throw error if not retryable or retries exhausted
          this.logger.log('error', `Error after ${retries} retries:`, err?.response?.data || err.message);
          throw err;
        }
      }
    }
  }

  // make GET request call to Runn API
  // includes pagination (limit/cursor) to fetch all existed records
  // param: urlPrefix: '/people'
  // params { urlParams: { limit: 5 }, parseResponseFn: (data) => data.values }
  async executeRunnApiGET(urlPrefix, params = {}) {
    let url = `${this.options.RUNN_API_URL}${urlPrefix}`;
    let results = [];
    let cursor = null;

    const options = { headers: this.getRequestHeaders('get') };

    do {
      const urlParams = { limit: 200, ...params.urlParams, cursor };
      const paginatedUrl = `${url}?${qs.stringify(urlParams)}`;

      // execute the API call with retry logic
      const response = await this.executeRunnApiCallWithRetry(async () => {
        return await axios.get(paginatedUrl, options);
      });

      const data = response.data;
      const values = typeof params.parseResponseFn !== 'undefined' ? params.parseResponseFn(data) : data.values;

      // append current page's results
      results = results.concat(values);

      // update cursor for the next page
      cursor = data.nextCursor;

      // console.log(`Fetched ${data.values.length} items, total: ${results.length}`);
    } while (cursor);

    return results;
  }

  // make POST request call to Runn API
  // param: urlPrefix: '/people'
  // params data: { ... }
  async executeRunnApiPOST(urlPrefix, data) {
    const url = `${this.options.RUNN_API_URL}${urlPrefix}`;
    const options = { headers: this.getRequestHeaders('post') };

    const response = await this.executeRunnApiCallWithRetry(async () => {
      return await axios.post(url, data, options);
    });

    return response.data;
  }

  // make PATCH request call to Runn API
  // param: urlPrefix: '/people'
  // params data: { ... }
  async executeRunnApiPATCH(urlPrefix, data) {
    const url = `${this.options.RUNN_API_URL}${urlPrefix}`;
    const options = { headers: this.getRequestHeaders('patch') };

    const response = await this.executeRunnApiCallWithRetry(async () => {
      return await axios.patch(url, data, options);
    });

    return response.data;
  }

  // make DELETE request call to Runn API
  // param: urlPrefix: '/people'
  async executeRunnApiDELETE(urlPrefix) {
    const url = `${this.options.RUNN_API_URL}${urlPrefix}`;
    const options = { headers: this.getRequestHeaders('delete') };

    const response = await this.executeRunnApiCallWithRetry(async () => {
      return await axios.delete(url, options);
    });

    return response.data;
  }
};

module.exports = RunnApiClient;
