const express = require('express'),
  router      = express.Router(),
  controller  = require('../controllers/controllers.js');


router.get('/', controller.findAll);

router.post('/add', controller.insert);

router.post('/delete', controller.delete);

router.post('/update', controller.update);

module.exports = router