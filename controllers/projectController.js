const db = require('../models');

module.exports = {
  // create new project
  newProject: function (req, res) {
    db.projects
      .create(req.body)
      .then(dbModel => {
        console.log(dbModel);
        // then push the new project into the clients active project list
        return db.customer.findOneAndUpdate(
          { _id: dbModel.client },
          { $push: { activeProjects: dbModel._id } },
          { new: true }
        );
      })
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => res.status(422).json(err));
  },

  //  findall projects
  findAllProjects: async function (req, res) {
    db.projects
      .find({})
      .populate('notes')
      .populate('client')
      .then(dbProjs => res.json(dbProjs))
      .catch(err => res.status(422).json(err));
  },

  //   find project by id
  findProjectById: async function (req, res) {
    let projectId = req.params.projectId;
    console.log('projectId--->>>', projectId);
    if (projectId != undefined) {
      db.projects
        .findById(req.params.projectId)
        .populate('client')
        .populate('notes')
        .then(dbProject => res.json(dbProject))
        .catch(err => res.status(422).json(err));
    } else {
      res.send({
        msg: 'Something went wrong, please pick a project again!'
      });
    }
  },

  uploadSignedContract: function (req, res) {
    console.log(req.body);
    console.log(req.params.id);
    let file = req.body.file;
    db.projects
      .findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { signedContract: file } },
        { new: true, useFindAndModify: false }
      )
      .then(result => {
        // console.log('result of uploading signed contract', result);
        if (result.signedContract === file) {
          res.json({
            msg: ' Signed Contract Upload Successful!'
          });
        } else {
          res.json({
            msg: 'Oops! Something went wrong!! Please Try Again'
          });
        }
      })
      .catch(err => res.status(422).json(err));
  },

  // uploading permit document
  uploadPermit: function (req, res) {
    console.log(req.body);
    console.log(req.params.id);
    let file = req.body.file;
    db.projects
      .findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { permit: file } },
        { new: true, useFindAndModify: false }
      )
      .then(result => {
        // console.log('result of uploading signed contract', result);
        if (result.permit === file) {
          res.json({
            msg: ' Permit Upload Successful!'
          });
        } else {
          res.json({
            msg: 'Oops! Something went wrong!! Please Try Again'
          });
        }
      })
      .catch(err => res.status(422).json(err));
  },

  // upload plansets
  uploadPlansets: function (req, res) {
    console.log(req.body);
    console.log(req.params.id);
    let file = req.body.file;
    db.projects
      .findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { plansets: file } },
        { new: true, useFindAndModify: false }
      )
      .then(result => {
        // console.log('result of uploading signed contract', result);
        if (result.plansets === file) {
          res.json({
            msg: ' Permit Upload Successful!'
          });
        } else {
          res.json({
            msg: 'Oops! Something went wrong!! Please Try Again'
          });
        }
      })
      .catch(err => res.status(422).json(err));
  },

  // upload final signed off permits
  uploadFinalPermit: function (req, res) {
    let file = req.body.file;
    db.projects
      .findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { finalPermit: file } },
        { new: true, useFindAndModify: false }
      )
      .then(result => {
        // console.log('result of uploading signed contract', result);
        if (result.plansets === file) {
          res.json({
            msg: ' Final Permit Upload Successful!'
          });
        } else {
          res.json({
            msg: 'Oops! Something went wrong!! Please Try Again'
          });
        }
      })
      .catch(err => res.status(422).json(err));
  }

  // end of module exports
};
