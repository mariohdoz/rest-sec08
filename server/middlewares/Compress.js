const compression = require('compression');
const express = require("express");

const app = express();

app.use(compression({ filter: shouldCompress }));

function shouldCompress(req, res ) {
 
    if (req.headers['x-no-compression']) {
        console.log('No se comprimió');
        return false;
    }

    return compression.filter(req, res);

}

module.exports.app = {
    shouldCompress
}