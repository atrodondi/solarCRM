const db = require("../models");

module.exports = {
  // addNew customer
  createCustomer: function (req, res) {
    db.customer
      .create(req.body)
      .then((dbModel) => res.json({id:dbModel._id}))
      .catch((err) => res.status(422).json(err));
  },

  //   delete customer by id
  deleteCustomerById: function (req, res) {
    db.customer
      .findByIdAndDelete(req.params.customerId)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  // Find all customers and sort by lastname
  findAllCustomers: function (req, res) {
    db.customer
      .find({})
      .sort({ lastName: "1" })
      .then((dbResources) => res.json(dbResources))
      .catch((err) => res.status(422).json(err));
  },

  // search by name, sort by last name
  searchByName: function (req, res) {
    let searchQuery = req.params.query;
    console.log("params yo-->", searchQuery);
    db.customer
      .find({
        $or: [
          { lastName: { $regex: searchQuery, $options: "i" } },
          { firstName: { $regex: searchQuery, $options: "i" } },
          { addressCity: { $regex: searchQuery, $options: "i" } }, //partial text search so entire name isnt required to find a match, searches those keys, i.e. last name, first name or whatever you add,
        ],
      })
      .then((result) => {
        console.log(result);
        res.json(result);
      })
      .catch((err) => res.status(422).json(err));
  },
};
