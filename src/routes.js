import express from 'express';
import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage,
         processNewOrganizationForm,
         showOrganizationDetailsPage,
         showNewOrganizationForm,
         organizationValidation,
         showEditOrganizationForm,
         processEditOrganizationForm } from './controllers/organizations.js';
import { showProjectsPage,
         showProjectDetailsPage,
         showNewProjectForm,
         processNewProjectForm,
         projectValidation,
         showEditProjectForm,
         processEditProjectForm } from './controllers/projects.js';
import { showCategoriesPage,
         showCategoryDetailsPage,
         showAssignCategoriesForm,
         processAssignCategoriesForm} from './controllers/categories.js';
import { showTestErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/project/:projectId/assign-categories', showAssignCategoriesForm);
// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);
// Route for new organization page
router.get('/new-organization', showNewOrganizationForm);
// Route to display the edit organization form
router.get('/edit-organization/:id', showEditOrganizationForm);
// Route for new project page
router.get('/new-project', showNewProjectForm);
// Route to display the edit project form
router.get('/edit-project/:id', showEditProjectForm);
// Route to handle new project form submission
router.post(
    '/new-project',
    projectValidation,
    processNewProjectForm
);
// Route to handle the edit project form submission
router.post(
    '/edit-project/:id',
    projectValidation,
    processEditProjectForm
);
// error-handling routes
router.get('/test-error', showTestErrorPage);

// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

// Route to handle the edit organization form submission
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

router.post('/project/:projectId/assign-categories', processAssignCategoriesForm);

export default router;