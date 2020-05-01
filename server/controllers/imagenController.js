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


// exports.obtener_imagen = async (req, res) => {

//     let tipo = req.params.tipo;
//     let id = req.params.id;

//     let img_defecto = path.resolve(__dirname, '../assets/img/image-not-found.png');

//     if (tipo === 'usuario') {

//         Usuario.findById(id, (err, usuarioDB) => {

//             if (err) {
//                 return res.status(500).json({
//                     ok: false,
//                     mensaje: err
//                 });
//             }

//             if (!usuarioDb) {
//                 return res.status(400).json({
//                     ok: false,
//                     mensaje: 'Usuario no se encuentra registrado.'
//                 });
//             }

//             let aux_ruta = path.resolve(__dirname, `../../uploads/${tipo}/${usuarioDB.img}`);

//             if (fs.existsSync(aux_ruta)) {
//                 res.sendFile(aux_ruta);
//             } else {
//                 res.sendFile(img_defecto);
//             }

//         });

//     } else if (tipo === 'producto') {

//         await Producto.findById(id, (err, productoDB) => {

//             if (err) {
//                 return res.status(500).json({
//                     ok: false,
//                     mensaje: err
//                 });
//             }

//             if (!productoDB) {
//                 return false;
//             }

//             let aux_ruta = path.resolve(__dirname, `../../uploads/${tipo}/${productoDB.img}`);

//             if (fs.existsSync(aux_ruta)) {
//                 res.sendFile(aux_ruta);
//             } else {
//                 res.sendFile(img_defecto);
//             }

//         });

//     }
   



// };
