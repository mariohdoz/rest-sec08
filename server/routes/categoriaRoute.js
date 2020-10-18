'use strict'

const express = require('express');
const { verificar_token, verificar_admin_role } = require('../middlewares/Auth');
const compression = require("compression");

// Controlador 
const categoria_controller = require('../controllers/categoriaController');

const app = express(); 

app.use(compression());

app.get('/categoria', categoria_controller.buscar_categoria);

app.get('/categoria/:id', categoria_controller.buscar_categoria_id);

app.post('/categoria', verificar_token, categoria_controller.insertar_categoria);

app.put('/categoria/:id', verificar_token, categoria_controller.actualizar_categoria);

app.delete('/categoria/:id', [verificar_token, verificar_admin_role], categoria_controller.eliminar_categoria);

module.exports = app;