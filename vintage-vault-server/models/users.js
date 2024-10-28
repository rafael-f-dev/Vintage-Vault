const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true },
    firstname: { type: String, required: false },
    lastname: { type: String, required: false },
    phonenumber: {type: Number, required: false },
    city: {type: String, required: false},
    postalcode: {type: String, required: false},
    billingaddress: {type: String, required: false },
    deliveryaddress: {type: String, required: false },
});

module.exports = mongoose.model("users", userSchema);