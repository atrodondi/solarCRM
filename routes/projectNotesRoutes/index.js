const router = require('express').Router();
const projectNotesController = require('../../controllers/projectNotesController');

//create new note
router.route('/createNew').post(projectNotesController.createNew);

module.exports = router;
