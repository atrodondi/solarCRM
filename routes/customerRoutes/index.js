const router = require("express").Router();
const customerController = require("../../controllers/customerController");

// add customer
router.route("/addNew").post(customerController.createCustomer);

// delete customer by id
router.route("/delete/:customerId").get(customerController.deleteCustomerById);

//find all customers
router.route("/").get(customerController.findAllCustomers);

// search customers by name, sort by last name ascending
router.route("/searchByName/:query").get(customerController.searchByName);

module.exports = router;
