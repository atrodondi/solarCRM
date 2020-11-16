const db = require('../models');

module.exports = {
  // create new project
  newProject: function (req, res) {
    db.projects
      .create(req.body)
      .then((dbModel) => {
        console.log(dbModel);
        // then push the new project into the clients active project list
        return db.customer.findOneAndUpdate(
          { _id: dbModel.client },
          { $push: { activeProjects: dbModel._id } },
          { new: true }
        );
      })
      .then((dbUser) => {
        res.json(dbUser);
      })
      .catch((err) => res.status(422).json(err));
  },

  //  findall projects
  findAllProjects: function (req, res) {
    db.projects
      .find({})
      .then((dbProjs) => res.json(dbProjs))
      .catch((err) => res.status(422).json(err));
  },

  //   find project by id
  findProjectById: function (req, res) {
    db.projects
      .findById(req.params.projectId)
      .populate('client')
      .then((dbProject) => res.json(dbProject))
      .catch((err) => res.status(422).json(err));
  },
};
