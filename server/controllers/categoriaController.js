'use strict'; 

const _ = require('underscore');

const Categoria = require('../models/categoriaModel');

exports.buscar_categoria = (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .skip(desde)
        .limit(limite)
        .exec((err, categoriaDB) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: err
                });
            }

            Categoria.countDocuments({}, (err, total) => {
                res.status(200).json({
                    ok: true,
                    total,
                    categoriaDB
                });
            });
        });
};

exports.buscar_categoria_id = (req, res) => { 

    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Categoria no registrada.'
            });
        }

        res.status(200).json({
            ok: true,
            categorias: categoriaDB
        });

    });

};

exports.insertar_categoria = (req, res) => {
    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: err
            });
        }

        res.status(200).json({
            ok: true,
            mensaje: 'Categoría registrado correctamente.',
            categoria: categoriaDB
        });
    });
};

exports.actualizar_categoria = (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['descripcion']);

    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, categoriaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: err
            });
        }

        res.json(categoriaDB);

    });
};

exports. eliminar_categoria = (req, res) => {
    let id = req.params.id;

    Categoria.findByIdAndDelete(id, (err, categoriaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Categoria no registrada.'
            });
        }

        res.status(200).json({
            ok: true,
            mensaje: 'Categoria eliminada correctamente.',
            categorias: categoriaDB
        });

    });
};