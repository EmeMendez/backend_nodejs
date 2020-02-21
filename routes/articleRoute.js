'use strict'


var express = require('express');
var articleController = require('../controllers/articleController');

var router = express.Router();

router.post('/test-de-controlador-post',articleController.datosCurso);
router.get('/test-de-controlador-get',articleController.test);


router.post('/save-article',articleController.save);
router.get('/articles/:last?', articleController.getArticles);
router.get('/article/:id',articleController.getArticle);
router.put('/article/:id',articleController.update);
router.delete('/article/:id',articleController.delete);
module.exports = router;