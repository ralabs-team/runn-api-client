class RunnApiProjectTags {
  constructor(runnApi) {
    this.runnApi = runnApi;
  }

  // fetches all project tags
  // https://developer.runn.io/reference/get_project-tags
  async fetchAll() {
    const values = await this.runnApi.executeRunnApiGET('/project-tags');

    this.runnApi.logger.log('debug', `Runn > ProjectTags > fetched ${values.length} project tags`);

    /*
      {
        "values": [
          {
            "id": 0,
            "name": "string",
            "projectIds": [
              0
            ],
            "archived": true,
            "createdAt": "2024-12-09T13:07:59.873Z",
            "updatedAt": "2024-12-09T13:07:59.873Z"
          }
        ],
        "nextCursor": "string"
      }
    */

    return values;
  }

  // create new project tag
  // https://developer.runn.io/reference/post_project-tags
  async create(name) {
    if (this.runnApi.options.isDryRun) {
      this.runnApi.logger.log('debug', `Runn > ProjectTags > (dry-run) created new project tag with name="${name}"`);
      return {};
    }

    const response = await this.runnApi.executeRunnApiPOST('/project-tags', { name });

    /*
      {
        "id": 0,
        "name": "string",
        "projectIds": [
          0
        ],
        "archived": true,
        "createdAt": "2024-12-09T13:07:59.873Z",
        "updatedAt": "2024-12-09T13:07:59.873Z"
      }
    */

    this.runnApi.logger.log('debug', `Runn > ProjectTags > Created a new project tag "${response.name}" and id="${response.id}"`);

    return response;
  }

  // add a project tag to a project
  // https://developer.runn.io/reference/post_project-tags-projecttagid-project-projectid
  async addToProject(projectId, projectTagId) {
    if (this.runnApi.options.isDryRun) {
      this.runnApi.logger.log('debug', `Runn > ProjectTags > (dry-run) added tag ${projectTagId} to project ${projectId}`);
      return {};
    }

    try {
      const response = await this.runnApi.executeRunnApiPOST(`/project-tags/${projectTagId}/project/${projectId}`, {
        projectId, projectTagId,
      });

      /*
        {
          "id": 0,
          "name": "string",
          "projectIds": [
            0
          ],
          "archived": true,
          "createdAt": "2024-12-09T13:07:59.873Z",
          "updatedAt": "2024-12-09T13:07:59.873Z"
        }
      */

      this.runnApi.logger.log('debug', `Runn > ProjectTags > Added tag ${response.name} to project ${projectId}`);

      return response;
    }
    catch (e) {
      if (e.response?.data?.message?.indexOf('already exists on Project') !== -1) {
        return true;
      }

      throw e;
    }
  }

  // create or update project tag
  // field: { label: 'Salesforce (New)', id: null }
  async createOrUpdate(runnProjectTags, field) {
    const runnProjectTag = runnProjectTags.find((k) => k.name == field.label);

    if (!runnProjectTag) {
      const response = await this.create(field.label);
      return response.id;
    }

    return runnProjectTag.id;
  }
}

module.exports = RunnApiProjectTags;
