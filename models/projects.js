const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectsSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: "Customer"
  },
  contractSignDate: { Type: Date },
  contractTotal: { Type: Number },
  deposit: { Type: String },
  designEngFee: { Type: Number },
  jobsiteNumber: { Type: Number },
  jobsiteSuite: { Type: String },
  jobsiteStreet: { Type: String },
  jobsiteState: { Type: String },
  jobsiteCity: { Type: String },
  jobsiteZipcode: { Type: String },
  jobsiteCounty: { Type: String },
  inverters: [],
  modules: [],
  storage: [],
  bui: []
});

const projects = mongoose.model("Projects", projectsSchema);

module.exports = projects;
