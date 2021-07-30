const routerAdmin = require('express').Router();
const Admin = require('./model.ts');

routerAdmin.get('/', async (_, res) => {
  try {
    const admins = await Admin.findAll();
    if (!admins.length) return res.status(404).send({ err: 'Admin not found' });
    res.send(admins);
  } catch (e) {
    res.status(500).send(e);
  }
});
routerAdmin.get('/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const admin = await Admin.findOneByEmail(email);
    if (!admin) return res.status(404).send({ err: 'Admin not found' });
    res.send(admin);
  } catch (e) {
    res.status(500).send(e);
  }
});
routerAdmin.post('/', async (req, res) => {
  try {
    await Admin.create(req.body);
    const admins = await Admin.findAll();
    if (!admins.length) return res.status(404).send({ err: 'Creation fail' });
    res.send(admins);
  } catch (e) {
    res.status(500).send(e);
  }
});
routerAdmin.delete('/:email', async (req, res) => {
  try {
    await Admin.deleteByEmail(req.params.email);
    const admins = await Admin.findAll();
    if (!admins.length) return res.status(404).send({ err: 'Admin not found' });
    res.send(admins);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = routerAdmin;
