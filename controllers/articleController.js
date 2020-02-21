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
    },
    getArticles:(req,res) =>{
        Article.find({}).sort('-_id').exec((err, articles) =>{
            
            if(err){
                return res.status(500).send({
                    status : 'error',
                    message: 'error al devolver articulos !!!'
                });
            }//end if

            if(!articles){
                return res.status(404).send({
                    status : 'error',
                    message: 'No hay articulos para mostrar !!!'
                });
            }//end if
        
            return res.status(200).send({
                status: 'success',
                articles
            });//end return 200

        });
    },
    getArticle: (req,res) =>{
        //recoger el id de la url
        var article_id = req.params.id;
        if(!article_id || article_id == null){
            return res.status(404).send({
                status:'error',
                message: 'no existe el article'
            });
        }

        //comprobar que existe
        Article.findById(article_id,(err,article)=>{
            if(err || !article){
                return res.status(404).send({
                    status : 'error',
                    message: 'no existe el articulo!!!'
                });                
            }

        //byscar el article
            return res.status(200).send({
                status : 'success',
                article
            });           
        });
    },
    update: (req,res) =>{
        //get article id but the url
        var article_id = req.params.id;
        //get data by put
        var params = req.body;
        //validate data
        try{
            var validate_title = !validar.isEmpty(params.title);
            var validate_content = !validar.isEmpty(params.content);
            
        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'faltan datos por enviar update'
            });
        }
        if(validate_title && validate_content){
                    //find and update
            Article.findByIdAndUpdate({_id: article_id}, params,{new:true}, (err,articleUpdate)=>{
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'error al actualizar'
                    });                    
                 } 
                 if(!articleUpdate){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el artículo'
                    });                      
                 }

                 return res.status(200).send({
                     status: 'success',
                     articleUpdate
                 });
                 
                
                });
            
        }else{
            return res.status(404).send({
                status: 'error',
                article : 'se ha producido un error'
            });
        }

       
    }
}; //end ArticleController

module.exports= Articlecontroller;


