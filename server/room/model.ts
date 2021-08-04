const mongooseRoom = require('mongoose');

const roomSchema = new mongooseRoom.Schema(
  {
    floor: { type: Number, required: true, unique: true },
    roomsPerFloor: { type: Array, required: true },
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
roomSchema.statics.updateFloor = async function (floor, roomsPerFloor) {
  const res = await this.updateOne({ floor }, { $set: { roomsPerFloor } });
  return res;
};
roomSchema.statics.deleteFloor = function (floor) {
  return this.remove({ floor });
};

module.exports = mongooseRoom.model('Room', roomSchema);
