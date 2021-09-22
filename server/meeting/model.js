const mongooseMeeting = require('mongoose');

const meetingSchema = new mongooseMeeting.Schema(
  {
    date: { type: String, required: true },
    meetings: {
      type: [
        {
          id: { type: String, required: true },
          summary: { type: String, required: true },
          description: { type: String, required: false },
          location: { type: String, required: true },
          creator: { type: Object, required: true },
          start: { type: Object, required: true },
          end: { type: Object, required: true },
          attendees: { type: Array, required: false },
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
    return payload;
  } else {
    const meeting = new this({ date: payload.start.dateTime.slice(0, 10), meetings: [payload] });
    await meeting.save();
    return payload;
  }
};

meetingSchema.statics.findAll = function () {
  return this.find({});
};

meetingSchema.statics.findOneByDate = async function (date) {
  return await this.findOne({ date });
};

meetingSchema.statics.patch = async function ({ type, eventId, curDate, newEvent }) {
  if (type === 'delete') {
    const meeting = await this.findOne({ date: curDate });
    await this.updateOne(
      { date: curDate },
      {
        $set: {
          date: curDate,
          meetings: meeting.meetings.filter(meeting => meeting.id !== eventId),
        },
      },
    );
    const newMeetings = this.findOne({ date: curDate });
    return newMeetings;
  } else if (type === 'patch') {
    const meeting = await this.findOne({ date: curDate });
    await this.updateOne(
      { date: curDate },
      {
        $set: {
          date: curDate,
          meetings: meeting.meetings.map(meeting => (meeting.id === eventId ? newEvent : meeting)),
        },
      },
    );
    const newMeetings = await this.findOne({ date: curDate });
    return newMeetings;
  }
};

module.exports = mongooseMeeting.model('Meeting', meetingSchema);
