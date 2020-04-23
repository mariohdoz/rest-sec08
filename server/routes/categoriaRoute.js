'use strict'

const express = require('express');
const _ = require('underscore');
const { verificar_token, verificar_admin_role } = require('../middlewares/Auth');

const Categoria = require('../models/categoriaModel');

const app = express(); 

app.get('/categoria', (req, res) => {

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
});

app.get('/categoria/:id', (req, res) => {

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

})

app.post('/categoria', verificar_token, (req, res) => {
    
    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save( (err, categoriaDB) => {
        
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

});

app.put('/categoria/:id', verificar_token, (req, res) => {
    
    let id = req.params.id; 
    let body = _.pick(req.body, ['descripcion']); 

    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true },(err, categoriaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: err
            });            
        }
        
        res.json(categoriaDB);

    });

});

app.delete('/categoria/:id', [verificar_token, verificar_admin_role], (req, res) => {
    
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

})

module.exports = app;