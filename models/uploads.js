const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UploadSchema = new Schema(
  {
    file: { type: String },
    fileName: { type: String },
    document: { type: String }
  },
  { timestamps: true }
);

const uploads = mongoose.model('Uploads', UploadSchema);

module.exports = uploads;
