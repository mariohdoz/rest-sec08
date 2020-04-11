const express = require('express');
const bodyParser = require('body-parser');

require('./config/config');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json('Hello World')
});


app.get('/usuario', (req, res) => {
    res.json('get usuario')
});

app.post('/usuario', (req, res) => {

    let body = req.body;

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });
    }else {
        res.json({
            persona: body
        });
    }

});

app.put('/usuario/:id', (req, res) => {

    let id = req.params.id;

    res.json({id})
});

app.delete('/usuario', (req, res) => {
    res.json('delete usuario')
});


app.listen(process.env.PORT, () => {
    console.log(`Escuchando desde el puerto ${ process.env.PORT }`);
});