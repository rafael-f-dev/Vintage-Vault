const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true },
    firstname: { type: String, required: false },
    lastname: { type: String, required: false },
    phonenumber: {type: Number, required: false },
    address: {type: String, required: false },
});

module.exports = mongoose.model("users", userSchema);