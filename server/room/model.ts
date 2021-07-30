const mongooseRoom = require('mongoose');

const roomSchema = new mongooseRoom.Schema(
  {
    floor: { type: Number, required: true, unique: true },
    rooms: { type: Array, required: true },
  },
  {
    versionKey: false,
  },
);

roomSchema.statics.findAll = function () {
  return this.find({});
};
roomSchema.statics.findOneByFloor = function (floor) {
  return this.findOne({ floor });
};
roomSchema.statics.create = function (payload) {
  const admin = new this(payload);
  return admin.save();
};
roomSchema.statics.updateFloor = function (floor, payload) {
  return this.findOneAndUpdate({ floor }, payload, { new: true });
};
roomSchema.statics.deleteFloor = function (floor) {
  return this.remove({ floor });
};

module.exports = mongooseRoom.model('Room', roomSchema);
