const router = require('express').Router();
const customerNotesController = require('../../controllers/customerNotesController');

// all notes of customer by id
// router.route("/:id").get(customerNotesController.getNotesByCustId);

//create new note
//@@ /customerNotes/createNewCustNote
router
  .route('/createNewCustNote')
  .post(customerNotesController.createNewCustNote);

// delete customer note by id
// @@ /customerNotes/delete/:id
router.route('/delete/:id').delete(customerNotesController.deleteCustNote);

module.exports = router;
