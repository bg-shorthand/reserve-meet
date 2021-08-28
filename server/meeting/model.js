const mongooseMeeting = require('mongoose');

const meetingSchema = new mongooseMeeting.Schema(
  {
    date: { type: String, required: true },
    meetings: {
      type: [
        {
          summary: { type: String, required: true },
          description: { type: String, required: true },
          location: { type: String, required: true },
          creator: { type: Object, required: true },
          start: { type: Object, required: true },
          end: { type: Object, required: true },
          attendees: { type: Array, required: true },
        },
      ],
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

meetingSchema.statics.create = async function (payload) {
  const date = payload.start.dateTime.slice(0, 10);
  const meeting = await this.findOne({ date });
  if (meeting) {
    await this.updateOne(
      { date },
      {
        $set: {
          date,
          meetings: [...meeting.meetings, payload],
        },
      },
    );
  } else {
    const meeting = new this({ date: payload.start.dateTime.slice(0, 10), meetings: [payload] });
    return meeting.save();
  }
};

meetingSchema.statics.findAll = function () {
  return this.find({});
};

module.exports = mongooseMeeting.model('Meeting', meetingSchema);
