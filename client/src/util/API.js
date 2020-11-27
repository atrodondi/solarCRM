import axios from 'axios';

export default {
  // add a new customer to database
  addCustomer: function (newCustomer) {
    return axios.post('/customer/addNew', newCustomer);
  },

  // find all customers from DB
  findAllCustomers: function () {
    return axios.get('/customer');
  },

  //search contacts by name
  searchContactsByName: function (query) {
    return axios.get('/customer/searchByName/' + query);
  },

  // add customer note
  addCustNote: function (note) {
    return axios.post('/customerNotes/createNewCustNote', note);
  },

  // add new project
  addNewProject: function (newProj) {
    return axios.post('/project/createNew', newProj);
  },

  // add new project note
  addProjNote: function (newProjNote) {
    return axios.post('/projectNotes/createNew', newProjNote);
  },

  //find all projects
  findAllProjects: function () {
    return axios.get('/project');
  },

  // find project by id
  findProjById: function (id) {
    return axios.get('/project/' + id);
  },

  // upload file
  // @ /uploads/fileType(ie. contract,permit,planset, etc/projId
  upload: function (file) {
    return axios.post('/uploads', file);
  }
};
