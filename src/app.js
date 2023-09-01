const express = require('express');
const personaRouter = require('./routes/personas');
const viviendaRouter = require('./routes/viviendas');
const municipioRouter = require('./routes/municipios');
const departamentoRouter = require('./routes/departamentos');

module.exports = () => {
    const app = express();

    app.use(express.json());
    app.use(personaRouter);
    app.use(viviendaRouter);
    app.use(municipioRouter);
    app.use(departamentoRouter);

    return app;
};