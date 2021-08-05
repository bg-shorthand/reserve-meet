const routerRoom = require('express').Router();
const Room = require('./model.ts');

routerRoom.get('/', async (_, res) => {
  try {
    const rooms = await Room.findAll();
    if (!rooms.length) return res.status(404).send({ err: 'Room not found' });
    res.send(rooms.sort((a, b) => a.floor - b.floor));
  } catch (e) {
    res.status(500).send(e);
  }
});
routerRoom.get('/:floor', async (req, res) => {
  try {
    const floor = req.params.floor;
    const room = await Room.findOneByFloor(floor);
    if (!room) return res.status(404).send({ err: 'Room not found' });
    res.send(room);
  } catch (e) {
    res.status(500).send(e);
  }
});
routerRoom.post('/', async (req, res) => {
  try {
    const { floor } = req.body;
    await Room.create({ floor, rooms: [] });
    const rooms = await Room.findAll();
    if (!rooms.length) return res.status(404).send({ err: 'Creation fail' });
    res.send(rooms.sort((a, b) => a.floor - b.floor));
  } catch (e) {
    res.status(500).send(e);
  }
});
routerRoom.put('/:floor', async (req, res) => {
  try {
    const floor = req.params.floor;
    const roomsPerFloor = req.body;
    await Room.updateFloor(floor, roomsPerFloor);
    const rooms = await Room.findAll();
    if (!rooms.length) return res.status(404).send({ err: 'Modify fail' });
    res.send(rooms.sort((a, b) => a.floor - b.floor));
  } catch (e) {
    res.status(500).send(e);
  }
});
routerRoom.delete('/:floor', async (req, res) => {
  try {
    await Room.deleteFloor(+req.params.floor);
    const rooms = await Room.findAll();
    if (!rooms.length) return res.status(404).send({ err: 'Room not found' });
    res.send(rooms.sort((a, b) => a.floor - b.floor));
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = routerRoom;
