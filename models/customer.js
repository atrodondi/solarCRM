const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  type: { type: String, default: 'contact' },
  firstName: { type: String, required: true, index: true },
  lastName: { type: String, required: true, index: true },
  email: { type: String, index: { unique: true } },
  phone: { type: String, required: true },
  addressStreet: { type: String, required: true, index: { unique: true } },
  addressCity: { type: String, index: true },
  addressState: { type: String, default: 'CA' },
  addressZipcode: { type: String },
  addressCounty: { type: String },
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
    soldInverterSerial: { type: String },
    soldBatteryModel: { type: String },
    soldBatteryMake: { type: String },
    soldBatterySerial: { type: String },
    soldBatteryAmt: { type: String },
    connectionType: { type: String, default: 'zigbee' },
  },
  lead: { type: Boolean, default: true },
  won: { type: Boolean, default: false },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'CustomerNotes',
    },
  ],
  activeProjects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ActiveProjects',
    },
  ],
  completedProjects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'CompletedProjects',
    },
  ],
});

customerSchema.index({
  firstName: 'text',
  lastName: 'text',
  addressCity: 'text',
});

const customer = mongoose.model('Customer', customerSchema);

module.exports = customer;
