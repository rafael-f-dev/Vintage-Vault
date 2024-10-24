const app      = require('express')()
require("dotenv").config()
const port     = process.env.PORT || 4040

app.use(require("express").urlencoded({extended: true}))
app.use(require("express").json())

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
app.use(require('cors')())
//==========================================================================
app.use('/products',require('./routes/products.js'))
app.use('/users',require('./routes/users.js'))
app.use('/email',require('./routes/email.js'))
//==========================================================================
app.listen(port, () => console.log("Listening on port: " + port));