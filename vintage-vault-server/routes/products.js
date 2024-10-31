const express = require('express'),
  router      = express.Router(),
  controller  = require('../controllers/product.js');


router.get('/', controller.findAll);

router.get('/categories', controller.findCategories);

router.get('/categoryId', controller.findCategory);

router.get('/id/:id', controller.findID);

router.post('/add', controller.insert);

router.post('/delete', controller.delete);

router.post('/update', controller.updateStock);

router.post('/image', controller.updateImage);

module.exports = router