const router = require('express').Router();
const projectController = require('../../controllers/projectController');

// create new project
router.route('/createNew').post(projectController.newProject);

// findall projects
router.route('/').get(projectController.findAllProjects);

// find project by ID
router.route('/:projectId').get(projectController.findProjectById);

module.exports = router;
