const _ = require('lodash');

const RUNN_CUSTOM_FIELD_MODEL_PROJECT = 'PROJECT';
const RUNN_CUSTOM_FIELD_MODEL_PERSON = 'PERSON';

class RunnApiCustomFields {
  constructor(runnApi) {
    this.runnApi = runnApi;
  }

  // fetches custom fields from the Runn API.
  // https://developer.runn.io/reference/get_custom-fields-select
  async fetchAllSelectFields() {
    const values = await this.runnApi.executeRunnApiGET('/custom-fields/select');

    this.runnApi.logger.log('debug', `Runn > Custom Fields > fetched ${values.length} custom-fields`);

    /*
      {
        "values": [
          {
            "id": 0,
            "name": "string",
            "description": "string",
            "model": "PERSON", // PROJECT
            "options": [
              {
                "id": 0,
                "name": "string"
              }
            ],
            "singleSelect": true,
            "required": true,
            "showInPlanner": true,
            "sortOrder": 0,
            "filterableInPlanner": true
          }
        ],
        "nextCursor": "string"
      }
    */

    return values;
  }

  // receive custom project fetches
  // https://developer.runn.io/reference/get_custom-fields-select
  async fetchProjectsSelectCustomFields() {
    const fields = await this.fetchRunnCustomFields();

    return fields.filter((k) => k.model == RUNN_CUSTOM_FIELD_MODEL_PROJECT);
  };

  // receive custom person fetches
  // https://developer.runn.io/reference/get_custom-fields-select
  async fetchRunnPeopleCustomFields() {
    const fields = await this.fetchRunnCustomFields();

    return fields.filter((k) => k.model == RUNN_CUSTOM_FIELD_MODEL_PERSON);
  };

  // create new custom field with type=Select
  // https://developer.runn.io/reference/post_custom-fields-select
  async createSelectCustomField(name, model, options, params) {
    if (this.runnApi.options.isDryRun) {
      this.runnApi.logger.log(
        'debug',
        `Runn > Custom Fields > (dry-run) created new custom field with name=["${name}"] and model=["${model}"]`,
      );
      return {};
    }

    const response = await this.runnApi.executeRunnApiPOST('/custom-fields/select', {
      name,
      model,
      // need to remove duplicates, since Runn API doesn't allow duplicated options
      options: _.uniq(options).map((k) => ({ name: k })),
      singleSelect: true,
      required: false,
      showInPlanner: false,
      filterableInPlanner: true,
      ...params,
    });

    /*
      {
        "id": 0,
        "name": "string",
        "description": "string",
        "model": "PERSON",
        "options": [
          {
            "id": 0,
            "name": "string"
          }
        ],
        "singleSelect": true,
        "required": true,
        "showInPlanner": true,
        "sortOrder": 0,
        "filterableInPlanner": true
      }
    */

    this.runnApi.logger.log('debug', `Runn > Custom Fields > created new custom field with name=["${response.name}"]`);

    return response;
  };

  // create new custom project field with type=Select
  // https://developer.runn.io/reference/get_custom-fields-select
  async createRunnProjectSelectCustomField(name, options, params = {}) {
    return await this.createRunnSelectCustomField(name, RUNN_CUSTOM_FIELD_MODEL_PROJECT, options, params);
  };

  // create new custom people field with type=Select
  // https://developer.runn.io/reference/get_custom-fields-select
  async createRunnPeopleSelectCustomField(name, options, params = {}) {
    return await this.createRunnSelectCustomField(name, RUNN_CUSTOM_FIELD_MODEL_PERSON, options, params);
  };

  // update a specific custom field, add new options
  // https://developer.runn.io/reference/post_custom-fields-select-selectfieldid-options
  async addRunnSelectCustomFieldOptions(selectFieldId, name) {
    if (this.runnApi.options.isDryRun) {
      this.runnApi.logger.log(
        'debug',
        `Runn > Custom Fields > (dry-run) added new option with name=["${name}"] to custom field id=["${selectFieldId}"]`,
      );
      return {};
    }

    try {
      const response = await this.runnApi.executeRunnApiPOST(`/custom-fields/select/${selectFieldId}/options`, { name });

      /*
        {
          "option": {
            "id": 0,
            "name": "string"
          }
        }
      */

      this.runnApi.logger.log('debug', `Runn > Custom Fields > added new option with name=["${name}"] to custom field id=["${selectFieldId}"]`);

      return response;
    }
    catch (e) {
      this.runnApi.logger.log('error', `Runn > Custom Fields > failed to add new option with name=["${name}"] to custom field id=["${selectFieldId}"]`, e);
    }
  };
}

module.exports = RunnApiCustomFields;
