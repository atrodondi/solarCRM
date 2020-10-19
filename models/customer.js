const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  phone: { type: String, required: true },
  addressStreet: { type: String, required: true, index: { unique: true } },
  addressNumber: { type: String },
  addressCity: { type: String },
  addressState: { type: String, default: "CA" },
  addressZipcode: { type: String },
  pgeAN: { type: String },
  pgeSID: { type: String },
  pgeMeter: { type: String },
  pgeRate: { type: String },
  equipment: {
    existingModuleModel: { type: String },
    existingModuleAmt: { type: String },
    soldModuleMaker: { type: String },
    soldModuleModel: { type: String },
    soldModuleAmt: { type: String },
    existingInverterModel: { type: String },
    existingInverterAmt: { type: String },
    soldInverterModel: { type: String },
    soldInverterAmt: { type: String },
    soldInverterMake: { type: String },
    soldInverterSerial: [String],
    soldBatteryModel: { type: String },
    soldBatteryMake: { type: String },
    soldBatterySerial: { type: String },
    soldBatteryAmt: { type: String },
    connectionType: { type: String, default: "zigbee" }
  },
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
