'use strict'


var express = require('express');
var articleController = require('../controllers/articleController');

var router = express.Router();

router.post('/test-de-controlador-post',articleController.datosCurso);
router.get('/test-de-controlador-get',articleController.test);


router.post('/save-article',articleController.save);


module.exports = router;