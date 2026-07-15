import express from 'express';
import { showUserRegistrationForm, processUserRegistrationForm } from './controllers/users.js';
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
         processAssignCategoriesForm,
         showNewCategoryForm,
         processNewCategoryForm,
         categoryValidation,
         showEditCategoryForm,
         processEditCategoryForm } from './controllers/categories.js';
import { showTestErrorPage } from './controllers/errors.js';

import { showLoginForm,
         processLoginForm,
         processLogout,
         showDashboard,
         requireLogin,
         showAdminPage,
         requireRole,
         showUsers
          } from './controllers/users.js';

const router = express.Router();


router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects',  showProjectsPage);
router.get('/categories',  showCategoriesPage);
router.get('/category/:id',  showCategoryDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/project/:projectId/assign-categories', requireRole('admin'), showAssignCategoriesForm);
// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);
// Route for new organization page
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);
// Route to display the edit organization form
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
// Route for new project page
router.get('/new-project', requireRole('admin'), showNewProjectForm);
// Route to display the edit project form
router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);
// Route for new category page
router.get('/new-category', requireRole('admin'), showNewCategoryForm);
// Route to display the edit category form
router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);
//user login routes
router.get('/login', showLoginForm);
router.get('/logout', processLogout);

router.get(
    '/admin',
    requireRole('admin'),
    showAdminPage
);

router.get('/register', showUserRegistrationForm);
// error-handling routes
router.get('/test-error', showTestErrorPage);
// Protected dashboard route
router.get('/dashboard', requireLogin, showDashboard);
// Admin-only users page
router.get(
    '/users',
    requireRole('admin'),
    showUsers
);

//user login route
router.post('/login', processLoginForm);


router.post('/register', processUserRegistrationForm);
// Route to handle new project form submission
router.post(
    '/new-project',
    requireRole('admin'),
    projectValidation,
    processNewProjectForm
);
// Route to handle the edit project form submission
router.post(
    '/edit-project/:id',
    requireRole('admin'),
    projectValidation,
    processEditProjectForm
);

// Route to handle new category form submission
router.post(
    '/new-category',
    requireRole('admin'),
    categoryValidation,
    processNewCategoryForm
);

// Route to handle new organization form submission
router.post('/new-organization', 
    requireRole('admin'), organizationValidation, processNewOrganizationForm);

// Route to handle the edit organization form submission
router.post('/edit-organization/:id', 
            requireRole('admin'),
            organizationValidation,
            processEditOrganizationForm);

router.post('/project/:projectId/assign-categories', 
            requireRole('admin'),
            processAssignCategoriesForm);

// Route to handle the edit category form submission
router.post(
    '/edit-category/:id',
    requireRole('admin'),
    categoryValidation,
    processEditCategoryForm
);

export default router;