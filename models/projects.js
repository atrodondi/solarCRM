const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectsSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: "Customer"
  },
  contractSignDate: { type: String },
  contractTotal: { type: Number },
  deposit: { type: String },
  designEngFee: { type: Number },
  jobsiteNumber: { type: Number },
  jobsiteSuite: { type: String },
  jobsiteStreet: { type: String },
  jobsiteState: { type: String },
  jobsiteCity: { type: String },
  jobsiteZipcode: { type: String },
  jobsiteCounty: { type: String },
  inverters: [],
  modules: [],
  storage: [],
  bui: []
});

const projects = mongoose.model("Projects", projectsSchema);

module.exports = projects;
