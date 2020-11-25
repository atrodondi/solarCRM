const router = require('express').Router();
const projectController = require('../../controllers/projectController');

// create new project
// @/project/createNew
router.route('/createNew').post(projectController.newProject);

// findall projects
// @/project
router.route('/').get(projectController.findAllProjects);

// find project by ID
// @/project/:projectId
router.route('/:projectId').get(projectController.findProjectById);

module.exports = router;
