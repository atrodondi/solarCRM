const db = require('../models');

module.exports = {
  // create new customer note
  createNewCustNote: function (req, res) {
    console.log('new customer note-->', req.body);
    let custId = req.body.customer;
    db.customerNotes
      .create(req.body)
      .then((dbModel) => {
        return db.customer
          .findOneAndUpdate(
            { _id: custId },
            { $push: { notes: dbModel._id } },
            { new: true }
          )
          .populate('activeProjects')
          .populate('notes');
      })
      .then((dbUser) => {
        console.log(dbUser);
        if (dbUser) {
          res.json(dbUser);
        }
      })
      .catch((err) => res.status(422).json(err));
  },

  //deleting a customer note, and then returning the customer data to uopdate the state on the front end
  deleteCustNote: function (req, res) {
    let noteId = req.params.id;

    db.customerNotes
      .findByIdAndDelete(noteId)
      .then((dbNote) => {
        // after deleting the note, need to delete the reference to the note in the customer, then return the new updated customer info populated with projects and notes
        return db.customer
          .findByIdAndUpdate(
            dbNote.customer,
            {
              $pull: {
                notes: noteId,
              },
            },
            { new: true }
          )
          .populate('activeProjects')
          .populate('notes');
      })
      .then((customerData) => {
        if (customerData) {
          res.json(customerData);
        }
      })
      .catch((err) => res.status(422).json(err));
  },
};
