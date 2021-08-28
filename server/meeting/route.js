const routerMeeting = require('express').Router();
const Meeting = require('./model.js');

routerMeeting.post('/', async (req, res) => {
  await Meeting.create(req.body);
  const meetings = await Meeting.findAll();
  res.send(meetings);
});
routerMeeting.get('/:date', async (req, res) => {
  const meetings = await Meeting.findOneByDate(req.params.date);
  res.send(meetings);
});

module.exports = routerMeeting;
