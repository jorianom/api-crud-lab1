const express = require('express');

const router = express.Router();
const PersonaRepo = require('../repos/persona-repo');

router.get('/api/personas', async (req, res) => {
    // Run a query to get all users
    const users = await PersonaRepo.find();

    // Send the result back to the person who made this request
    res.send(users);
});

router.get('/api/personas/:id', async (req, res) => {
    const { id } = req.params;

    const user = await PersonaRepo.findById(id);

    if (user) {
        res.send(user);
    } else {
        res.sendStatus(404);
    }
});

router.post('/api/personas', async (req, res) => {
    const { nombre, telefono, edad, sexo, vivienda_id, cabeza_de_familia } = req.body;
    console.log(req.body);
    const user = await PersonaRepo.insert(nombre, telefono, edad, sexo, vivienda_id, cabeza_de_familia);

    res.send(user);
});

router.put('/api/personas/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, telefono, edad, sexo, vivienda_id, cabeza_de_familia } = req.body;

    const user = await PersonaRepo.update(id, nombre, telefono, edad, sexo, vivienda_id, cabeza_de_familia);

    if (user) {
        res.send(user);
    } else {
        res.sendStatus(404);
    }
    

});

router.delete('/api/personas/:id', async (req, res) => {
    const { id } = req.params;

    const user = await PersonaRepo.delete(id);

    if (user) {
        res.send(user);
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;