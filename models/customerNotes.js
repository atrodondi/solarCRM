const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerNotesSchema = new Schema({
  timestamp: true,
  note: { type: String }
});
const CustomerNotes = mongoose.model("CustomerNotes", CustomerNotesSchema);

module.exports = CustomerNotes;
