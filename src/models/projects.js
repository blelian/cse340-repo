import db from './db.js';

const getAllProjects = async () => {
    const query = `
    SELECT
        sp.project_id,
        sp.organization_id,
        sp.title,
        sp.description,
        sp.location,
        sp.project_date,
        o.name AS organization_name,
        STRING_AGG(c.name, ', ') AS categories
    FROM service_project sp
    JOIN organization o
        ON sp.organization_id = o.organization_id
    LEFT JOIN service_project_category spc
        ON sp.project_id = spc.project_id
    LEFT JOIN category c
        ON spc.category_id = c.category_id
    GROUP BY
        sp.project_id,
        sp.organization_id,
        sp.title,
        sp.description,
        sp.location,
        sp.project_date,
        o.name
    ORDER BY sp.project_date;
    `;

    const result = await db.query(query);
    return result.rows;
};


const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          project_date
        FROM service_project
        WHERE organization_id = $1
        ORDER BY project_date;
      `;
      
      const queryParams = [organizationId];
      const result = await db.query(query, queryParams);

      return result.rows;
};

const getProjectById = async (projectId) => {
  const query = `
    SELECT
      project_id,
      organization_id,
      title,
      description,
      location,
      project_date
    FROM service_project
    WHERE project_id = $1;
  `;

  const result = await db.query(query, [projectId]);
  return result.rows[0] || null;
};


const getProjectDetails = async (projectId) => {
  const query = `
    SELECT
      sp.project_id,
      sp.organization_id,
      sp.title,
      sp.description,
      sp.location,
      sp.project_date,
      o.name AS organization_name
    FROM service_project sp
    JOIN organization o
      ON sp.organization_id = o.organization_id
    WHERE sp.project_id = $1;
  `;

  const result = await db.query(query, [projectId]);
  return result.rows[0] || null;
};


const getUpcomingProjects = async (numberOfProjects) => {
  const query = `
    SELECT
        sp.project_id,
        sp.organization_id,
        sp.title,
        sp.description,
        sp.location,
        sp.project_date,
        o.name AS organization_name,
        STRING_AGG(c.name, ', ') AS categories
    FROM service_project sp
    JOIN organization o
        ON sp.organization_id = o.organization_id
    LEFT JOIN service_project_category spc
        ON sp.project_id = spc.project_id
    LEFT JOIN category c
        ON spc.category_id = c.category_id
    WHERE sp.project_date >= CURRENT_DATE
    GROUP BY
        sp.project_id,
        sp.organization_id,
        sp.title,
        sp.description,
        sp.location,
        sp.project_date,
        o.name
    ORDER BY sp.project_date
    LIMIT $1;
  `;

  const result = await db.query(query, [numberOfProjects]);
  return result.rows;
};

const createProject = async (title, description, location, date, organizationId) => {
    const query = `
      INSERT INTO service_project (
                                    title,
                                    description,
                                    location,
                                    project_date,
                                    organization_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id;
    `;

    const queryParams = [title, description, location, date, organizationId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
};

const updateProject = async (
    projectId,
    title,
    description,
    location,
    date,
    organizationId
) => {
    const query = `
        UPDATE service_project
        SET
            title = $1,
            description = $2,
            location = $3,
            project_date = $4,
            organization_id = $5
        WHERE project_id = $6
        RETURNING project_id;
    `;

    const queryParams = [
        title,
        description,
        location,
        date,
        organizationId,
        projectId
    ];

    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Project not found');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Updated project with ID:', projectId);
    }

    return result.rows[0].project_id;
};

const addVolunteer = async (userId, projectId) => {
    const query = `
        INSERT INTO volunteer (user_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [userId, projectId]);
};

const removeVolunteer = async (userId, projectId) => {
    const query = `
        DELETE FROM volunteer
        WHERE user_id = $1
        AND project_id = $2;
    `;

    await db.query(query, [userId, projectId]);
};

const getVolunteerProjects = async (userId) => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.location,
            sp.project_date
        FROM volunteer v
        JOIN service_project sp
            ON v.project_id = sp.project_id
        WHERE v.user_id = $1
        ORDER BY sp.project_date;
    `;

    const result = await db.query(query, [userId]);

    return result.rows;
};

const isUserVolunteering = async (userId, projectId) => {
    const query = `
        SELECT *
        FROM volunteer
        WHERE user_id = $1
        AND project_id = $2;
    `;

    const result = await db.query(query, [userId, projectId]);

    return result.rows.length > 0;
};

export { getAllProjects,
         getProjectsByOrganizationId,
         getProjectById,
         getUpcomingProjects,
         getProjectDetails,
         createProject,
         updateProject,
         addVolunteer,
         removeVolunteer,
        isUserVolunteering,
        getVolunteerProjects}; 