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
  findAllProjects: async function (req, res) {
    db.projects
      .find({})
      .populate('notes')
      .populate('client')
      .then((dbProjs) => res.json(dbProjs))
      .catch((err) => res.status(422).json(err));
  },

  //   find project by id
  findProjectById: async function (req, res) {
    let projectId = req.params.projectId;
    console.log('projectId--->>>', projectId);
    if (projectId != undefined) {
      db.projects
        .findById(req.params.projectId)
        .populate('client')
        .then((dbProject) => res.json(dbProject))
        .catch((err) => res.status(422).json(err));
    } else {
      res.send({
        msg: 'Something went wrong, please pick a project again!',
      });
    }
  },
};
