const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activeProjectsSchema = new Schema({
  client: [
    {
      type: Schema.Types.ObjectId,
      ref: "Customer"
    }
  ],
  contractSignDate: {Type:Date}
  contractTotal: { Type: Number },
  deposit: { Type: Number, default: 1000 },
  designEngFee: { Type: Number },
  jobsiteAddress: { Type: String },
  county: { Type: String },
  inverters: [String],
  modules: [String],
  batteries: [String],
  bui: [String]
});

const activeProjects = mongoose.model("ActiveProjects", activeProjectsSchema);

module.exports = activeProjects;
