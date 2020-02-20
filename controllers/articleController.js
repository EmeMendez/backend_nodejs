'use strict'

var validar = require('validator');
var Article = require('../models/article');


var Articlecontroller = {  
    datosCurso : (req, res) =>{
        return res.status(200).send({
            curso: 'Probando node js para backend',
            alumno: 'emelinda mendez',
            url: 'ememmendez.github.io'
        });
    },

    test : (req, res) => {
        return res.status(200).send({
            message :  'Soy la accion para guardar articulos'
        });
    },

    save : (req, res) => {
        var params = req.body; //recoger los parametros por post
        //validar datos (validatos)
        try{
            var validate_title = !validar.isEmpty(params.title);
            var validate_content = !validar.isEmpty(params.content);            
        }
        catch(error){
            return res.status(200).send({
                status: 'error',
                message: 'faltan datos por enviar !!'
            });
        }
        if(validate_title && validate_content){
            var article = new Article();//crear el objecto guardar
            //Asignar valores
            article.title = params.title;
            article.content = params.content;
            article.image = null;
            // guardar el articulo
            article.save((error, articleStored) =>{
                if(error || !articleStored){
                    return res.status(404).send({
                       status : 'error',
                       message : 'El artículo no se ha guardado !!!' 
                    });
                }
            //devolver una respuesta
            return res.status(200).send({
                status : 'success',
                article : articleStored
            });
        });
         }else{
           return res.status(200).send({
               status: 'error',
               message: "Los datos no son validos"
           }); 
        }       
    }
}; //end controller

module.exports= Articlecontroller;


