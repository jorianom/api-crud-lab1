const express = require('express');

const router = express.Router();
const DepartamentoRepo = require('../repos/departamento-repo');

router.get('/api/departamentos', async (req, res) => {
    // Run a query to get all users
    const users = await DepartamentoRepo.find();

    // Send the result back to the person who made this request
    res.send(users);
});

router.get('/api/departamentos/:id', async (req, res) => {
    const { id } = req.params;

    const user = await DepartamentoRepo.findById(id);

    if (user) {
        res.send(user);
    } else {
        res.sendStatus(404);
    }
});

router.post('/api/departamentos', async (req, res) => {
    const { nombre, ubicacion, presupuesto, poblacion } = req.body;

    const user = await DepartamentoRepo.insert(nombre, ubicacion, presupuesto, poblacion);


    res.send(user);
});

router.put('/api/departamentos/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, ubicacion, presupuesto, poblacion } = req.body;

    const user = await DepartamentoRepo.update(id, nombre, ubicacion, presupuesto, poblacion);

    if (user) {
        res.send(user);
    } else {
        res.sendStatus(404);
    }
    

});

router.delete('/api/departamentos/:id', async (req, res) => {
    const { id } = req.params;

    const user = await DepartamentoRepo.delete(id);

    if (user) {
        res.send(user);
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;