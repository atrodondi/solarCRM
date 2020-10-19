const db = require("../models");

module.exports = {
  // create new project
  newProject: function (req, res) {
    db.projects
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  //  findall projects
  findAllProjects: function (req, res) {
    db.projects
      .find({})
      .then(dbProjs => res.json(dbProjs))
      .catch(err => res.status(422).json(err));
  }
};
