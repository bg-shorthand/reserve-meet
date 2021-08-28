const mongooseAdmin = require('mongoose');

const adminSchema = new mongooseAdmin.Schema(
  {
    email: { type: String, required: true, unique: true },
  },
  {
    versionKey: false,
  },
);

adminSchema.statics.findAll = function () {
  return this.find({});
};
adminSchema.statics.findOneByEmail = function (email) {
  return this.findOne({ email });
};
adminSchema.statics.create = function (payload) {
  const admin = new this(payload);
  return admin.save();
};
adminSchema.statics.deleteByEmail = function (email) {
  return this.remove({ email });
};

module.exports = mongooseAdmin.model('Admin', adminSchema);
