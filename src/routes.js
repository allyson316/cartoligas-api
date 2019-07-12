const { Router } = require('express');

const TimeController = require('./app/controllers/TimeController');

const routes = new Router();

// routes.get('/times', TimeController.index);
routes.post('/times', TimeController.store);

module.exports = routes;
