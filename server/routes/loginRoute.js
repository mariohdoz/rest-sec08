'use strict'

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

 const Usuario = require('../models/usuarioModel');

app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({
        'email': body.email 
    }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: err
            });
        }

        if ( !usuarioDB ){
            return res.status(400).json({
                ok: false,
                mensaje: 'Usuario o contraseña incorrecto.'
            });
        }

        if ( !bcrypt.compareSync(body.password, usuarioDB.password) ){
            return res.status(400).json({
                ok: false,
                mensaje: 'Usuario o contraseña incorrecto.'
            });
        }

        let token = jwt.sign( { usuario: usuarioDB }, process.env.SEED, { expiresIn: process.env.TOKEN_EXPIRATION } );

        return res.status(200).json({
            ok: true,
            mensaje: 'Inicio de sesión correcta',
            usuario: usuarioDB,
            token
        }); 

    })

});

module.exports = app;
