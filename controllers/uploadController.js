const db = require('../models');

module.exports = {
  //add new upload
  upload: function (req, res) {
    console.log(req.body);
    db.uploads
      .create(req.body)
      .then((response) => {
        console.log('upload response---->>>', response);
        res.json(response);
      })
      .catch((err) => res.status(422).json(err));
  },
};
