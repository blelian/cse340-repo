import express from 'express';
import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage,
         processNewOrganizationForm,
         showOrganizationDetailsPage,
         showNewOrganizationForm} from './controllers/organizations.js';
import { showProjectsPage,
         showProjectDetailsPage } from './controllers/projects.js';
import { showCategoriesPage,
         showCategoryDetailsPage } from './controllers/categories.js';
import { showTestErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);
// Route for new organization page
router.get('/new-organization', showNewOrganizationForm);

// error-handling routes
router.get('/test-error', showTestErrorPage);

// Route to handle new organization form submission
router.post('/new-organization', processNewOrganizationForm);


export default router;