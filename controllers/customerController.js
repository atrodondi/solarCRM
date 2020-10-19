const db = require("../models");

module.exports = {
  // addNew customer
  createCustomer: function (req, res) {
    db.customer
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  //   delete customer by id
  deleteCustomerById: function (req, res) {
    db.customer
      .findByIdAndDelete(req.params.customerId)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // Find all customers
  findAllCustomers: function (req, res) {
    db.customer
      .find({})
      .then(dbResources => res.json(dbResources))
      .catch(err => res.status(422).json(err));
  }
};
