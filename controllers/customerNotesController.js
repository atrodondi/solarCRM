const db = require("../models");

module.exports = {
  // create new customer note
  createNewCustNote: function (req, res) {
    console.log("new customer note-->", req.body);
    let custId = req.body.customer; //need to dynamically get id once i make the front end part and finger that sequencing out.
    db.customerNotes
      .create(req.body)
      .then((dbModel) => {
        return db.customer.findOneAndUpdate(
          { _id: custId },
          { $push: { notes: dbModel._id } },
          { new: true }
        );
      })
      .then((dbUser) => {
        if (dbUser) {
          res.json({message: "Successful Customer Note Created"});
        }
        
      })
      .catch((err) => res.status(422).json(err));
  },
};
