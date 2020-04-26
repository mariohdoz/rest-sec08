'use strict'

const express = require('express');
const fileUpload = require('express-fileupload');

// Controlador 
const upload_controller = require('../controllers/uploadController');

const app = express();

// Opciones por defecto 
app.use(fileUpload());

app.post('/upload', upload_controller.cargar_archivo);

module.exports = app;