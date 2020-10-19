const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const completedProjectsSchema = new Schema({
  client: [
    {
      type: Schema.Types.ObjectId,
      ref: "Customer"
    }
  ]
});

const completedProjects = mongoose.model(
  "CompletedProjects",
  completedProjectsSchema
);

module.exports = completedProjects;
