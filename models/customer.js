const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  phone: { type: String, required: true },
  address: { type: String, required: true, index: { unique: true } },
  pgeAN: { type: String },
  pgeSID: { type: String },
  pgeMeter: { type: String },
  pgeRate: { type: String },
  equipment: [String],
  lead: { type: Boolean, default: true },
  won: { type: Boolean, default: false },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "CustomerNotes"
    }
  ],
  activeProjects: [
    {
      type: Schema.Types.ObjectId,
      ref: "ActiveProjects"
    }
  ],
  completedProjects: [
    {
      type: Schema.Types.ObjectId,
      ref: "CompletedProjects"
    }
  ]
});

const customer = mongoose.model("Customer", customerSchema);

module.exports = customer;
