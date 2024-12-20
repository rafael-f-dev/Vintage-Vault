const app      = require('express')()
require("dotenv").config()
const path = require('path');
const express = require('express');
const port     = process.env.PORT || 4040

//==========================================================================
app.use(require('cors')())
app.use(require("express").urlencoded({extended: true}))
app.use(require("express").json())

app.use(express.static(path.join(__dirname, '..', 'vintage-vault-client', 'build')));

async function connectingToDB  () {
  try {
    await require("mongoose").connect(process.env.MONGO, {
    
    });
    console.log("Connected to the DB ✅");
  } catch (error) {
    console.log("ERROR: Your DB is not running, start it up ☢️");
  }
}
connectingToDB()


//==========================================================================
app.use('/api/products',require('./routes/products.js'))
app.use('/users',require('./routes/users.js'))
app.use('/email',require('./routes/email.js'))
app.use('/payment', require('./routes/payment.js'))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'vintage-vault-client', 'build', 'index.html'));
});
//==========================================================================
app.listen(port, () => console.log("Listening on port: " + port));