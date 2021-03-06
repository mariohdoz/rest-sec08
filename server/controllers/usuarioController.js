'use strict';

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuarioModel');
const usuarioModel = require('../models/usuarioModel');

exports.obtener_usuarios = (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: err
                });
            }

            Usuario.countDocuments({}, (err, total) => {
                res.status(200).json({
                    ok: true,
                    total,
                    usuarios
                });
            });
        });
};

exports.insertar_usuario = (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: err
            });
        }

        usuarioDB.password = null;

        res.status(200).json({
            ok: true,
            mensaje: 'Usuario registrado correctamente.',
            usuario: usuarioDB
        });

    });
};

exports.actualizar_usuario = (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: err
            });
        }
        res.json(usuarioDB)
    });
};

exports.eliminar_usuario =  (req, res) => {
    let id = req.params.id;

    Usuario.findByIdAndUpdate(id, { estado: 0 }, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: err
            });
        }
        res.json(usuarioDB)
    });
};