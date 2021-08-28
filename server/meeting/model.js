const mongooseMeeting = require('mongoose');

const meetingSchema = new mongooseMeeting.Schema(
  {
    summary: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    creator: { type: Object, required: true },
    start: { type: Object, required: true },
    end: { type: Object, required: true },
    attendees: { type: Array, required: true },
  },
  {
    versionKey: false,
  },
);

meetingSchema.statics.create = function (payload) {
  const meeting = new this(payload);
  return meeting.save();
};

meetingSchema.statics.findAll = function () {
  return this.find({});
};

module.exports = mongooseMeeting.model('Meeting', meetingSchema);
