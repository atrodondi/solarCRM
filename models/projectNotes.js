const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectNotesSchema = new Schema(
  {
    note: { type: String },
  },
  { timestamps: true }
);
const ProjectNotes = mongoose.model('ProjectNotes', ProjectNotesSchema);

module.exports = ProjectNotes;
