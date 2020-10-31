const router = require("express").Router();
const customerNotesController = require("../../controllers/customerNotesController");

// all notes of customer by id
// router.route("/:id").get(customerNotesController.getNotesByCustId);

//create new note
router
  .route("/createNewCustNote")
  .post(customerNotesController.createNewCustNote);

module.exports = router;
