'use strict';

const fs = require('fs');
const path = require('path');

const Usuario = require('../models/usuarioModel');
const Producto = require('../models/productoModel');

exports.obtener_imagen = (req, res) => {

    let tipo = req.params.tipo;
    let img = req.params.img;

    console.log(img);

    let img_defecto = path.resolve(__dirname, '../assets/img/image-not-found.png');

    let aux_ruta = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);

    if (fs.existsSync(aux_ruta)) {
        res.sendFile(aux_ruta);
    } else {
        res.sendFile(img_defecto);
    }

};

