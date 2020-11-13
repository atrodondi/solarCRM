const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectsSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Customer'
  },
  status: { type: String, default: 'Contract Signed' },
  contractSignDate: { type: String },
  contractTotal: { type: Number },
  deposit: { type: String },
  designEngFee: { type: Number },
  jobsiteAddress: { type: String },
  jobsiteSuite: { type: String },
  jobsiteState: { type: String, default: 'CA' },
  jobsiteCity: { type: String },
  jobsiteZipcode: { type: String },
  jobsiteCounty: { type: String },
  inverters: [],
  modules: [],
  storage: [],
  buis: []
});

const projects = mongoose.model('Projects', projectsSchema);

module.exports = projects;
