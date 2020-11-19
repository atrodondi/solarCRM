const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectsSchema = new Schema({
  type: { type: String, default: 'project' },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
  },
  document: {
    type: Buffer,
  },
  documentType: {
    type: String,
  },
  status: { type: String, default: 'Contract Signed' },
  contractSignDate: { type: String },
  contractTotal: { type: Number },
  deposit: { type: Number },
  designEngFee: { type: Number },
  materialFee: { type: Number },
  installFee: { type: Number },
  finalFee: { type: Number },
  jobsiteAddress: { type: String },
  jobsiteSuite: { type: String },
  jobsiteState: { type: String, default: 'CA' },
  jobsiteCity: { type: String },
  jobsiteZipcode: { type: String },
  jobsiteCounty: { type: String },
  inverters: [],
  modules: [],
  storage: [],
  buis: [],
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ProjectNotes',
    },
  ],
});

projectsSchema.virtual('documentPath').get(() => {
  if (this.document != null && this.document.type != null) {
    return `data:${
      this.document.type
    };charset=utf-8;base64,${this.document.toString('base64')}`;
  }
});

const projects = mongoose.model('Projects', projectsSchema);

module.exports = projects;
