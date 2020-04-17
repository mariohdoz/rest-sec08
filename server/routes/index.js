const express = require('express');

const app = express();

app.use(require('./usuarioRoute'));
app.use(require('./loginRoute'));

// app.get('/', (req, res) => {
//     res.json('Hello World')
// });


module.exports = app;