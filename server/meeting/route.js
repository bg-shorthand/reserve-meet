const routerMeeting = require('express').Router();
const Meeting = require('./model.js');

routerMeeting.post('/', async (req, res) => {
  const newMeeting = await Meeting.create(req.body);
  res.send(newMeeting);
});
routerMeeting.get('/:date', async (req, res) => {
  const meetings = await Meeting.findOneByDate(req.params.date);
  res.send(meetings);
});

module.exports = routerMeeting;
