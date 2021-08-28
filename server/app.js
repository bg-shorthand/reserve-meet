const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose
  .connect('mongodb://bkhan:123951@3.38.93.215:4001/reserve-meet-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

app.use('/admin', require('./admin/route.js'));
app.use('/room', require('./room/route.js'));

app.listen(4001, () => console.log(`Server listening on port 4001`));

module.exports = 'http://localhost:3000';
