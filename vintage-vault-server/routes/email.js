const express = require('express'),
  router      = express.Router(),
  controller  = require('../controllers/email.js');


router.post('register', controller.register)


module.exports = router