class RunnApiAssignments {
  constructor(runnApi) {
    this.runnApi = runnApi;
  }

  // return all allocationns from Runn
  // https://developer.runn.io/reference/get_assignments
  async fetchAll({ onlyActive = false, modifiedAfter = null } = {}) {
    const urlParams = {
      limit: 500
    };

    // Format: YYYY-MM-DD or YYYY-MM-DDTHH:MM:SSZ
    if (modifiedAfter) {
      urlParams.modifiedAfter = modifiedAfter;
    }

    let values = await this.runnApi.executeRunnApiGET('/assignments', { urlParams });

    /*
    {
      "values": [
        {
          "id": 0,
          "personId": 0,
          "startDate": "2024-12-24",
          "endDate": "2024-12-24",
          "projectId": 0,
          "minutesPerDay": 0,
          "roleId": 0,
          "isActive": true,
          "note": "string",
          "isBillable": true,
          "phaseId": 0,
          "isNonWorkingDay": true,
          "isTemplate": true,
          "isPlaceholder": true,
          "workstreamId": 0,
          "createdAt": "2024-12-24T16:46:27.816Z",
          "updatedAt": "2024-12-24T16:46:27.816Z"
        }
      ],
      "nextCursor": "string"
    }
    */

    if (onlyActive) {
      values = values.filter((allocation) => allocation.isActive && !allocation.isPlaceholder && !allocation.isTemplate);
    }

    this.runnApi.logger.log('debug', `Runn > Assignments > fetched ${values.length} assignments`);

    return values;
  }

  // return only valid allocations from Runn
  // filter out archived projects and archived people
  async fetchActive() {
    // fetch all Runn projects, so we can filter out allocations on archived projects
    const runnProjectsAll = await this.runnApi.projects.fetchAll();

    // fetch all Runn people, so we can filter out allocations on archived people
    const runnPeopleAll = await this.runnApi.people.fetchAll();

    // Retrieving role data from Runn.io
    const runnAssignmentsAll = await this.fetchAll();
    let runnAssignmentsActive = runnAssignmentsAll;

    // filter out placeholders and templates
    runnAssignmentsActive = runnAssignmentsActive.filter(k => k.isPlaceholder !== true && k.isTemplate !== true);

    // filter out allocations for archived projects
    const runnProjectsArchivedIds = runnProjectsAll.filter(p => p.isArchived).map(p => p.id);
    runnAssignmentsActive = runnAssignmentsActive.filter(
      k => !runnProjectsArchivedIds.includes(k.projectId),
    );

    // filter out allocations for archived people
    const runnPeopleArchivedIds = runnPeopleAll.filter(p => p.isArchived).map(p => p.id);
    runnAssignmentsActive = runnAssignmentsActive.filter(
      k => !runnPeopleArchivedIds.includes(k.personId),
    );

    return runnAssignmentsActive;
  }
}

module.exports = RunnApiAssignments;
