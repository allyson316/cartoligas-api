const { Router } = require('express');

const TimeController = require('./app/controllers/TimeController');
const TimeCartolaController = require('./app/controllers/TimeCartolaController');
const LigaController = require('./app/controllers/LigaController');
const RodadaController = require('./app/controllers/RodadaController');
const RodadaTimeController = require('./app/controllers/RodadaTimeController');

const routes = new Router();

// CartolaFC
routes.get('/timesCartola', TimeCartolaController.index);

// Ligas
routes.post('/ligas', LigaController.store);
routes.get('/ligas', LigaController.index);

// Rodadas
routes.post('/rodadas', RodadaController.store);
routes.get('/rodadas', RodadaController.index);

// RodadaTime
routes.post('/rodadasTimes', RodadaTimeController.store);
routes.get('/rodadasTimes', RodadaTimeController.index);

// routes.get('/times', TimeController.index);
routes.post('/times', TimeController.store);

module.exports = routes;
