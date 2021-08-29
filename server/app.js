const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:3000'],
  },
});

io.on('connection', () => {
  console.log('CONNECTION!');

  io.emit('test', 'Are you there?');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose
  .connect('mongodb://localhost:27017/reserve-meet-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

const routerMeeting = require('express').Router();
const Meeting = require('./meeting/model.js');

routerMeeting.post('/', async (req, res) => {
  const newMeeting = await Meeting.create(req.body);
  res.send(newMeeting);
  io.emit('test', newMeeting);
});
routerMeeting.get('/:date', async (req, res) => {
  const meetings = await Meeting.findOneByDate(req.params.date);
  res.send(meetings);
});
routerMeeting.patch('/', async (req, res) => {
  const newMeetings = await Meeting.patch(req.body);
  res.send(newMeetings);
});

app.use('/admin', require('./admin/route.js'));
app.use('/room', require('./room/route.js'));
// app.use('/meeting', require('./meeting/route.js'));
app.use('/meeting', routerMeeting);

http.listen(4001, () => console.log(`Server listening on port 4001`));
