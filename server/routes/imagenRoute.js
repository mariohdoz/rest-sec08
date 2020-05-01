'use strict'

const express = require('express');
const { verificar_token_img } = require('../middlewares/Auth');

// Controlador 
const imagen_controller = require('../controllers/imagenController');

const app = express();

app.get('/imagen/:tipo/:img', verificar_token_img, imagen_controller.obtener_imagen);
// app.get('/imagen/:tipo/:id', imagen_controller.obtener_imagen);

module.exports = app 