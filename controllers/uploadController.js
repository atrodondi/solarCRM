const db = require('../models');

module.exports = {
  //add new upload
  upload: function (req, res) {
    let newDoc = req.body.newDocument;
    // why is the document not able  to choose the update... you have to make separate routes for each document type it appears..permit, signed permit, signed contract, etc etc
    let file = req.body.file;
    let projId = req.body.projId;
    db.projects
      .findByIdAndUpdate(
        projId,
        { changeOrder123123: file },
        { new: true, useFindAndModify: false }
      )
      .then((response) => console.log('RESPONSE FROM UPDATE?', response))
      .catch((err) => res.status(422).json(err));
  },
};
