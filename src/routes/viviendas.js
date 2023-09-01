const express = require('express');

const router = express.Router();
const ViviendaRepo = require('../repos/vivienda-repo');

router.get('/api/viviendas', async (req, res) => {
    // Run a query to get all users
    const users = await ViviendaRepo.find();

    // Send the result back to the person who made this request
    res.send(users);
});

router.get('/api/viviendas/:id', async (req, res) => {
    const { id } = req.params;

    const user = await ViviendaRepo.findById(id);

    if (user) {
        res.send(user);
    } else {
        res.sendStatus(404);
    }
});

router.post('/api/viviendas', async (req, res) => {
    const { direccion, capacidad, niveles, propietario_id, municipio_id } = req.body;

    const user = await ViviendaRepo.insert(direccion, capacidad, niveles, propietario_id, municipio_id);


    res.send(user);
});

router.put('/api/viviendas/:id', async (req, res) => {
    const { id } = req.params;
    const { direccion, capacidad, niveles, propietario_id, municipio_id } = req.body;

    const user = await ViviendaRepo.update(id, direccion, capacidad, niveles, propietario_id, municipio_id);

    if (user) {
        res.send(user);
    } else {
        res.sendStatus(404);
    }
    

});

router.delete('/api/viviendas/:id', async (req, res) => {
    const { id } = req.params;

    const user = await ViviendaRepo.delete(id);

    if (user) {
        res.send(user);
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;