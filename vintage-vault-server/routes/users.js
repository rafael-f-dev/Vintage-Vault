const express = require('express'),
  router      = express.Router(),
  controller  = require('../controllers/user.js');

  router.post("/register",controller.register);
  
  router.post("/login",controller.login);

  router.post("/verify_token",controller.verify_token);

  router.post("/delete", controller.delete);

  router.post("/update/:userId", controller.update);

  router.get("/get/:id", controller.getUser);


  module.exports = router