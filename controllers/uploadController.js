const db = require('../models');

module.exports = {
  //add new upload
  upload: function (req, res) {
    // why is the document not able  to choose the update... you have to make separate routes for each document type it appears..permit, signed permit, signed contract, etc etc
    console.log('upload REQUEST BODY-->', req.body);
    let projId = req.body.projId;
    let documentObj = {
      file: req.body.file,
      fileName: req.body.fileName,
      document: req.body.document
    };
    db.uploads
      .create(documentObj)
      .then(dbModel => {
        console.log(dbModel);
        return db.projects
          .findByIdAndUpdate(
            { _id: projId },
            { $push: { documents: dbModel._id } },
            { new: true, useFindAndModify: false }
          )
          .populate('documents')
          .populate('client');
      })
      .then(response => {
        console.log('project update docuements', response);
        res.json(response);
      });
  }
};
