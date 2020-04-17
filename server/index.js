require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../public')));

// Se importan rutas
app.use( require('./routes/index') );

// Conección BD
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err, resp) => {
    if (err) throw err;
    console.log("Base de datos conectada.");
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando desde el puerto ${ process.env.PORT }`);
});