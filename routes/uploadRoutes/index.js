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

//upload permit to project using ID
// @@/uploads/permit/:id of project
router.route('/permit/:id').post(projectController.uploadPermit);

// upload plansets
//@@ /uploads/plansets/:id of project
router.route('/plansets/:id').post(projectController.uploadPlansets);

// upload final signed off permit
//@@ .uploads/finalPermit/:id of project
router.route('/finalPermit/:id').post(projectController.uploadFinalPermit);

module.exports = router;
