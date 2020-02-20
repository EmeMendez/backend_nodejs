'use strict'

//cargar modulos de node para crear el servidor
var express = require('express');
var bodyParser = require('body-parser');

//ejecutar express
var app = express();

//cargar ficheros rutas

var article_routes  = require('./routes/articleRoute');

//cargar middlewares
//algo que se ejecuta antes de cargar usa ruta
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//CORS para permitir peticiones desde el front end


//añadir prefijos a rutas / cargar rutas

app.use('/api', article_routes);



//exportar modulo (fichero actual)
module.exports = app;


