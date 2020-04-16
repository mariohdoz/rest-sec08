// ====================== //
//    Verificar Token     //
// ====================== //

const jwt = require('jsonwebtoken');

let verificar_token = (req, res, next) => {

    let token = req.get('Authorization');

    jwt.verify(token, process.env.SEED, (err, decode) => {

        if(err){
            return res.status(401).json({
                ok: false,
                mensaje: 'Token no válido'
            });
        }

        req.usuario = decode.usuario;

        next();
    }); 
};

// ====================== //
//  Verificar Admin ROl   //
// ====================== //

let verificar_admin_role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    }else{ 
        return res.json({
            ok: false,
            mensaje: 'Usuario no posee perfil correspondiente'
        });
    }
};


module.exports = {
    verificar_token,
    verificar_admin_role
}