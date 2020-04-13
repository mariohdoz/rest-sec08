const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema; 

let rolesValidos = {
    values: ['USER_ROLE', 'ADMIN_ROLE'],
    message: '{VALUE} no es un rol válido'
}

let usuarioSchema = new Schema({
    nombre:  {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String, 
        unique: true,
        uniqueCaseInsensitive: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true 
    },
    google: {
        type: Boolean,
        default: false
    } 
});

usuarioSchema.methods.toJSON = function () {
    let user = this;
    let objectUser = user.toObject();
    delete objectUser.password;

    return objectUser;
}

usuarioSchema.plugin(uniqueValidator, { message: 'Error, el campo {PATH} es único'});

module.exports = mongoose.model('Usuario', usuarioSchema);
