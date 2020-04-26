'use strict'; 

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

const Usuario = require('../models/usuarioModel');

exports.login_normal = (req, res) => {

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

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Usuario o contraseña incorrecto.'
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Usuario o contraseña incorrecto.'
            });
        }

        let token = generarToken(usuarioDB);

        return res.status(200).json({
            ok: true,
            mensaje: 'Inicio de sesión correcta',
            usuario: usuarioDB,
            token
        });

    })
};

exports.login_google = async (req, res) => {
    
    let token = req.body.idtoken;

    let userG = await verify(token)
        .catch((e) => {
            return res.status(403).json({
                ok: false,
                mensaje: e
            });
        });

    Usuario.findOne({ 'email': userG.email }, (err, usuarioDB) => {

        console.log("Entró");

        if (err) {
            console.log("1");
            return res.status(500).json({
                ok: false,
                mensaje: err
            });
        }

        if (usuarioDB) {

            if (usuarioDB.google === false) {
                console.log("2");
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Usuario ya se encuentra creado, debe iniciar normalmente.'
                });
            } else {
                console.log("3");
                let token = generarToken(usuarioDB);

                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                })

            }

        } else {

            let usuario = new Usuario();

            usuario.nombre = userG.nombre;
            usuario.email = userG.email;
            usuario.img = userG.img;
            usuario.google = true;
            usuario.password = ':c';

            usuario.save((err, usuarioSave) => {

                if (err) {
                    console.log("4");
                    return res.status(500).json({
                        ok: false,
                        mensaje: err
                    });
                }

                let token = generarToken(usuarioDB);

                console.log("5");

                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                })

            });

        }
    });
};

async function verify(token) {

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
    });

    const payload = ticket.getPayload();
    
    return {
        'nombre': payload.name,
        'email': payload.email,
        'img': payload.picture,
        'google': true
    }

};

function generarToken(usuario) {
    return jwt.sign({ usuario }, process.env.SEED, { expiresIn: process.env.TOKEN_EXPIRATION });
};