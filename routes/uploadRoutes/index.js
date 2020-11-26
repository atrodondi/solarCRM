const router = require('express').Router();
const uploadController = require('../../controllers/uploadController');
const projectController = require('../../controllers/projectController');

// upload route
router.route('/').post(uploadController.upload);

// upload signed contract to project with specific id
// @@/uploads/signedContract/:id of project
router
  .route('/signedContract/:id')
  .post(projectController.uploadSignedContract);

module.exports = router;
