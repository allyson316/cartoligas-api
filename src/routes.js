const { Router } = require('express');

const TimeController = require('./app/controllers/TimeController');
const TimeCartolaController = require('./app/controllers/TimeCartolaController');

const routes = new Router();

// CartolaFC
routes.get('/timesCartola', TimeCartolaController.index);
// routes.get('/times', TimeController.index);
routes.post('/times', TimeController.store);

module.exports = routes;
