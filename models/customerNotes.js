const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerNotesSchema = new Schema(
  {
    note: String,
    customer:String
  },
  { timestamps: true }
  
  
);
const CustomerNotes = mongoose.model("CustomerNotes", CustomerNotesSchema);

module.exports = CustomerNotes;
