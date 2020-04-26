'use strict'

const express = require('express');
const { verificar_token, verificar_admin_role } = require('../middlewares/Auth');

const usuario_controller = require('../controllers/usuarioController');

const app = express();

app.get('/usuario', verificar_token, usuario_controller.obtener_usuarios);

app.post('/usuario', [verificar_token, verificar_admin_role], usuario_controller.insertar_usuario);

app.put('/usuario/:id', [verificar_token, verificar_admin_role], usuario_controller.actualizar_usuario);

app.delete('/usuario/:id', [verificar_token, verificar_admin_role], usuario_controller.eliminar_usuario);

module.exports = app;
