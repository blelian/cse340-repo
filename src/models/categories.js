import db from './db.js';

const getAllCategories = async () => {
    const query = `
        SELECT category_id, name
        FROM category
        ORDER BY name;
    `;

    const result = await db.query(query);
    return result.rows;
};

const getCategoryById = async (id) => {
    const query = `
        SELECT
            category_id,
            name
        FROM category
        WHERE category_id = $1;
    `;

    const result = await db.query(query, [id]);
    return result.rows[0] || null;
};

const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT
            c.category_id,
            c.name
        FROM category c
        JOIN service_project_category spc
            ON c.category_id = spc.category_id
        WHERE spc.project_id = $1
        ORDER BY c.name;
    `;

    const result = await db.query(query, [projectId]);
    return result.rows;
};

const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT
            sp.project_id,
            sp.title
        FROM service_project sp
        JOIN service_project_category spc
            ON sp.project_id = spc.project_id
        WHERE spc.category_id = $1
        ORDER BY sp.project_date;
    `;

    const result = await db.query(query, [categoryId]);
    return result.rows;
};

const assignCategoryToProject = async (projectId, categoryId) => {
    const query = `
        INSERT INTO service_project_category (project_id, category_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [projectId, categoryId]);
};

const updateCategoryAssignments = async (projectId, categoryIds) => {
    // First, remove existing category assignments for the project
    const deleteQuery = `
        DELETE FROM service_project_category
        WHERE project_id = $1;
    `;

    await db.query(deleteQuery, [projectId]);

    // Next, add the new category assignments
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(projectId, categoryId);
    }
};

const createCategory = async (name) => {
    const query = `
        INSERT INTO category (name)
        VALUES ($1)
        RETURNING category_id;
    `;

    const result = await db.query(query, [name]);

    if (result.rows.length === 0) {
        throw new Error('Failed to create category');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new category with ID:', result.rows[0].category_id);
    }

    return result.rows[0].category_id;
};

const updateCategory = async (categoryId, name) => {
    const query = `
        UPDATE category
        SET name = $1
        WHERE category_id = $2
        RETURNING category_id;
    `;

    const result = await db.query(query, [name, categoryId]);

    if (result.rows.length === 0) {
        throw new Error('Category not found');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Updated category with ID:', categoryId);
    }

    return result.rows[0].category_id;
};
    
export { getAllCategories,
         getCategoryById,
         getCategoriesByProjectId,
         getProjectsByCategoryId,
         updateCategoryAssignments,
         createCategory,
         updateCategory };