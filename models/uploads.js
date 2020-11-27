const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UploadSchema = new Schema(
  {
    file: { type: String },
    fileName: { type: String },
    document: { type: String }
  },
  { timestamp: true }
);

// UploadSchema.virtual('documentPath').get(() => {
//   if (this.document != null && this.document.type != null) {
//     return `data:${
//       this.document.type
//     };charset=utf-8;base64,${this.document.toString('base64')}`;
//   }
// });

const uploads = mongoose.model('Uploads', UploadSchema);

module.exports = uploads;
