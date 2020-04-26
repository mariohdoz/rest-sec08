'use strict'

const express = require('express');
const { verificar_token } = require('../middlewares/Auth');

// Controlador 
const producto_controller = require('../controllers/productoController');

const app = express();

app.get('/producto', verificar_token, producto_controller.buscar_producto);

app.get('/producto/:id', verificar_token, producto_controller.buscar_producto_id);

app.get('/producto/buscar/:termino', verificar_token, producto_controller.buscar_producto_termino);

app.post('/producto', verificar_token, producto_controller.insetar_producto);

app.put('/producto/:id', verificar_token, producto_controller.actualizar_producto);

app.delete('/producto/:id', verificar_token, producto_controller.elimiar_producto);

module.exports = app;