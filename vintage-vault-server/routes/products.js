const express = require('express'),
  router      = express.Router(),
  controller  = require('../controllers/product.js');


router.get('/', controller.findAll);

router.get('/:category', controller.findCategory)

router.get('/id/:id', controller.findID)

router.post('/add', controller.insert);

router.post('/delete', controller.delete);

router.post('/update', controller.updateName);

module.exports = router