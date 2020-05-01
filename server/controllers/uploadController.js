'use strict';

const fs = require('fs');
const path = require('path');

const Usuario = require('../models/usuarioModel');
const Producto = require('../models/productoModel');

exports.cargar_archivo = (req, res) => {

    let tipo = req.params.tipo;
    let id = req.params.id; 

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: {
                msg: 'Sin documento para cargar.'}
        });
    }

    let tipo_valido = validar_tipo(tipo);

    if(!tipo_valido){
        return res.status(400).json({
            ok: false,
            mensaje: 'Tipo no soportado'
        });
    }

    let archivo = req.files.archivo;
    let extension_valida = validar_extension(archivo.mimetype);

    if ( !extension_valida ) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Extensión no soportada'
        });
    }

    let nombre_archivo = req.files.archivo.name.split('.');
    let extension = nombre_archivo[nombre_archivo.length - 1];
    let aux_nombre = nombre_archivo[0];

    let nombre_servidor = `${ id }${ new Date().getTime() }.${ extension }`;

    archivo.mv(`uploads/${tipo}/${nombre_servidor}`, (err) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: err
            });
        }

        if(tipo === 'usuario'){
            imagenUsuario(id, res, nombre_servidor);
        }else{
            imagenProducto(id, res, nombre_servidor);
        }

    });
};

function validar_tipo(tipo){

    const tipos_validos = ['producto', 'usuario'];
    let estatus = false;

    if (tipos_validos.indexOf(tipo) >= 0 ){
        estatus = true;
    }

    return estatus;

}

function validar_extension(extension){

    const extensiones_permitidas = ['image/png', 'image/jpg', 'image/jpeg'];
    let estatus = false;

    if (extensiones_permitidas.indexOf(extension) >= 0) {
        estatus = true;
    }

    return estatus; 

}

function imagenProducto(id, res, nombre_archivo) {
    
    Producto.findById(id, (err, productoDB)=>{

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: err
            });
        }

        if (!productoDB) {
            
            borrarImagen('producto', productoDB.img);
            
            return res.status(400).json({
                ok: false,
                mensaje: 'Producto no se encuentra registrado.'
            });
        }

        borrarImagen('producto', productoDB.img);

        productoDB.img = nombre_archivo;

        productoDB.save( (err, productoGuardado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: err
                });
            }

            res.status(200).json({
                ok: true,
                mensaje: 'Producto actualizado correctamente.',
                usuario: productoGuardado
            });

        });

    });

}

function imagenUsuario(id, res, nombre_archivo) {
    
    Usuario.findById(id, (err, usuarioDb)=>{

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: err
            });
        }

        if (!usuarioDb) {
            
            borrarImagen('usuario', usuarioDb.img);
            
            return res.status(400).json({
                ok: false,
                mensaje: 'Usuario no se encuentra registrado.'
            });
        }

        borrarImagen('usuario', usuarioDb.img);

        usuarioDb.img = nombre_archivo;

        usuarioDb.save( (err, usuarioGuardado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: err
                });
            }

            res.status(200).json({
                ok: true,
                mensaje: 'Usuario actualizado correctamente.',
                usuario: usuarioGuardado
            });

        });

    });

}

function borrarImagen(tipo, nombre){
    let ruta_img = path.resolve(__dirname, `../../uploads/${tipo}/${nombre}`);

    if (fs.existsSync(ruta_img)) {
        fs.unlinkSync(ruta_img);
    }

    return true;
}