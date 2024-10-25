const express = require('express'),
  router      = express.Router(),
  controller  = require('../controllers/payment.js');


router.post('/create-checkout-session', controller.create_checkout_session)
router.get('/checkout-session', controller.checkout_session);


module.exports = router