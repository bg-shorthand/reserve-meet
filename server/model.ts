const mongoose2 = require('mongoose');

const adminSchema = new mongoose2.Schema({
  email: { type: String, required: true, unique: true },
});

adminSchema.statics.findAll = function () {
  return this.find({});
};

module.exports = mongoose2.model('Admin', adminSchema);
