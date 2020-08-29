const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activeProjectsSchema = new Schema({
  client: [
    {
      type: Schema.Types.ObjectId,
      ref: "Customer"
    }
  ]
});

const activeProjects = mongoose.model("ActiveProjects", activeProjectsSchema);

module.exports = activeProjects;
