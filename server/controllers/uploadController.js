'use strict';

exports.cargar_archivo = (req, res) => {
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: {
                msg: 'Sin documento para cargar.'}
        });
    }

    let archivo = req.files.archivo;
    let extensiones_permitidas = ['image/png', 'image/jpg', 'image/jpeg'];

    if (extensiones_permitidas.indexOf(archivo.mimetype) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Extensión no soportada'
        });
    }

    archivo.mv(`uploads/${req.files.archivo.name}`, (err) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: err
            });
        }

        res.status(200).json({
            ok: true,
            mensaje: 'Documento cargado.'
        });

    });
};