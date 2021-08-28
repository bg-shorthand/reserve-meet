const routerMeeting = require('express').Router();
const Meeting = require('./model.js');

routerMeeting.post('/', async (req, res) => {
  await Meeting.create(req.body);
  const meetings = await Meeting.findAll();
  res.send(meetings);
});

module.exports = routerMeeting;
