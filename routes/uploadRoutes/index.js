const router = require('express').Router();
const uploadController = require('../../controllers/uploadController');

// upload route
router.route('/').post(uploadController.upload);

module.exports = router;
