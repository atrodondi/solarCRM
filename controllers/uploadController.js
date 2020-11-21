const db = require('../models');

module.exports = {
  //add new upload
  upload: function (req, res) {
    let pdf = req.body.document;
    // why is the document not able  to choose the update
    let file = req.body.file;
    let projId = req.body.projId;
    db.projects
      .findByIdAndUpdate(projId, { pdf: file }, { new: true })
      .then((response) => console.log('RESPONSE FROM UPDATE?', response));
    // db.uploads
    //   .create(req.body)
    //   .then((response) => {
    //     console.log('upload response---->>>', response);
    //     res.json(response);
    //   })
    //   .catch((err) => res.status(422).json(err));
  },
};
