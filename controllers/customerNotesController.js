const db = require('../models');

module.exports = {
  // create new customer note
  createNewCustNote: function (req, res) {
    console.log('new customer note-->', req.body);
    let custId = req.body.customer;
    db.customerNotes
      .create(req.body)
      .then((dbModel) => {
        return db.customer.findOneAndUpdate(
          { _id: custId },
          { $push: { notes: dbModel._id } },
          { new: true }
        );
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
    console.log('PARAMS.ID--->>>', req.params.id);
    db.customerNotes
      .findByIdAndDelete(req.params.id)
      .then((dbNote) => {
        console.log('DBNOTE customer--->>>', dbNote.customer);
        return db.customer.findOne({ _id: dbNote.customer }, { new: true });
      })
      .then((customerData) => {
        console.log('CUSTOMER DATA BROSEPH----^^', customerData);
        if (customerData) {
          res.json(customerData);
        }
      })
      .catch((err) => res.status(422).json(err));
  },
};
