const db = require('../models');

module.exports = {
  //create new project note
  createNew: function (req, res) {
    console.log(req.body);

    db.projectNotes
      .create(req.body)
      .then((dbModel) => {
        return db.projects.findOneAndUpdate(
          { _id: req.body.project },
          { $push: { notes: dbModel._id } },
          { new: true }
        );
      })
      .then((dbUser) => {
        if (dbUser) {
          res.json(dbUser);
        }
      })
      .catch((err) => res.status(422).json(err));
  },
};
