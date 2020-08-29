const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectNotesSchema = new Schema({
  timestamp: true,
  note: { type: String }
});
const ProjectNotes = mongoose.model("ProjectNotes", ProjectNotesSchema);

module.exports = ProjectNotes;
