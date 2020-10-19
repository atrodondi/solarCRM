const router = require("express").Router();
const projectController = require("../../controllers/projectController");

// create new project
router.route("/createNew").post(projectController.newProject);

// findall projects
router.route("/").get(projectController.findAllProjects);

module.exports = router;
