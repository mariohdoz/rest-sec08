require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json('Hello World')
});

// Se importan rutas de usuario
app.use( require('./routes/usuarioRoute') );

// Conección BD  
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err, resp) => {
    if (err) throw err;
    console.log("Base de datos conectada.");
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando desde el puerto ${ process.env.PORT }`);
});