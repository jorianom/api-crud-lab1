const express = require('express');

const router = express.Router();
const MunicipioRepo = require('../repos/municipio-repo');

router.get('/api/municipios', async (req, res) => {
    // Run a query to get all users
    const users = await MunicipioRepo.find();

    // Send the result back to the person who made this request
    res.send(users);
});

router.get('/api/municipios/:id', async (req, res) => {
    const { id } = req.params;

    const user = await MunicipioRepo.findById(id);

    if (user) {
        res.send(user);
    } else {
        res.sendStatus(404);
    }
});

router.post('/api/municipios', async (req, res) => {
    const { nombre, area, presupuesto, departamento_id, gobernador_id } = req.body;
    const user = await MunicipioRepo.insert(nombre, area, presupuesto, departamento_id, gobernador_id);

    res.send(user);
});

router.put('/api/municipios/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, area, presupuesto, departamento_id, gobernador_id } = req.body;

    const user = await MunicipioRepo.update(id, nombre, area, presupuesto, departamento_id, gobernador_id);

    if (user) {
        res.send(user);
    } else {
        res.sendStatus(404);
    }
    

});

router.delete('/api/municipios/:id', async (req, res) => {
    const { id } = req.params;

    const user = await MunicipioRepo.delete(id);

    if (user) {
        res.send(user);
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;