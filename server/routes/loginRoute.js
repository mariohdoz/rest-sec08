'use strict'

const express = require('express');
const app = express();

const login_controller = require('../controllers/loginController');

app.post('/login', login_controller.login_normal);

app.post('/signWG', login_controller.login_google);

module.exports = app;
