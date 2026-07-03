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

export { getAllProjects, getProjectsByOrganizationId }; 