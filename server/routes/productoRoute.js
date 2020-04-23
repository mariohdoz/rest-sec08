'use strict'

const express = require('express');
const _ = require('underscore');
const { verificar_token, verificar_admin_role } = require('../middlewares/Auth');

const Producto = require('../models/productoModel')

const app = express();

app.get('/producto', verificar_token,(req, res) => {

    console.log(req.usuario);

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Producto.find({})
        .sort('descripcion')
        .populate('categoria', 'descripcion')
        .populate('usuario', 'nombre email')
        .skip(desde)
        .limit(limite)
        .exec((err, productoDB) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: err
                });
            }

            Producto.countDocuments({}, (err, total) => {
                res.status(200).json({
                    ok: true,
                    total,
                    productoDB
                });
            });
        });
});

app.get('/producto/:id', verificar_token, (req, res)=>{
    
    let id = req.params.id; 

    Producto.findById(id)
        .populate('categoria', 'descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: err
                });
            }

            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Producto no registrada.'
                });
            }

            res.status(200).json({
                ok: true,
                producto: productoDB
            });
    });

});

app.get('/producto/buscar/:termino', verificar_token, (req, res)=>{

    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i')

    console.log(regex)

    Producto.find({nombre: regex})
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: err
                });
            }
            

            res.status(200).json({
                ok: true,
                producto: productoDB
            });

        })

});

app.post('/producto', verificar_token, (req, res) => {

    let body = req.body;

    let producto = new Producto({
        nombre: req.body.nombre,
        precioUni: req.body.precioUni,  
        descripcion: req.body.descripcion,
        disponible: req.body.disponible, 
        categoria: req.body.categoria, 
        usuario: req.usuario._id
    });

    producto.save((err, productoDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: err
            });
        }

        res.status(200).json({
            ok: true,
            mensaje: 'Producto registrado correctamente.',
            categoria: productoDB
        });
    });

});

app.put('/producto/:id', verificar_token, (req, res)=>{

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'precioUni', 'descripcion', 'disponible', 'categoria']);

    Producto.findByIdAndUpdate(id, body, (err, productoDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: err
            });
        }

        res.json(productoDB);

    });

});

app.delete('/producto/:id', [verificar_token], (req, res) => {

    console.log('Entró')

    let id = req.params.id;

    Producto.findByIdAndUpdate(id, {disponible: false}, { new: true, runValidators: true }, (err, productoDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: err
            });
        }

        res.json(productoDB);

    });

})

module.exports = app;