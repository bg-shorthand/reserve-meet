// const routerMeeting = require('express').Router();
// const Meeting = require('./model.js');
// const io = require('../app.js');

// routerMeeting.post('/', async (req, res) => {
//   const newMeeting = await Meeting.create(req.body);
//   res.send(newMeeting);
//   io.emit('test', 'post completed');
// });
// routerMeeting.get('/:date', async (req, res) => {
//   const meetings = await Meeting.findOneByDate(req.params.date);
//   res.send(meetings);
// });
// routerMeeting.patch('/', async (req, res) => {
//   const newMeetings = await Meeting.patch(req.body);
//   res.send(newMeetings);
// });

// module.exports = routerMeeting;
