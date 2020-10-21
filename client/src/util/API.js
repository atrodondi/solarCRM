import axios from "axios";

export default {
  addCustomer: function (newCustomer) {
    return axios.post("/customer/addNew", newCustomer);
  }
};
