const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerNotesSchema = new Schema({
  note: { type: String }
});
const CustomerNotes = mongoose.model("CustomerNotes", CustomerNotesSchema);

module.exports = CustomerNotes;
