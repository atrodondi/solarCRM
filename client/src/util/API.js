import axios from "axios";

export default {
  // add a new customer to database
  addCustomer: function (newCustomer) {
    return axios.post("/customer/addNew", newCustomer);
  },

  // find all customers from DB
  findAllCustomers: function () {
    return axios.get("/customer");
  },
};
