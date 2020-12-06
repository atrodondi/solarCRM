const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// need to change the schema so that projects is just one array, and then just change the schema in projects to have another status key that is either active or complete, or just two keys of active = true, complete = false, and such

const customerSchema = new Schema({
  type: { type: String, default: 'customer' },
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
      ref: 'Projects',
    },
  ],
  completedProjects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Projects',
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
