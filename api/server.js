const express = require('express');
const helmet = require('helmet');

const cohortsRouter = require('../cohort/cohort-router')

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/cohorts', cohortsRouter)

module.exports = server;