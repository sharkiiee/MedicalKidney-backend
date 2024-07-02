const mongoose = require("mongoose");

mongoose.connect("YOUR DBcompass URL");

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    kidneys: [{type: Object}]
})

const Users = mongoose.model("user",userSchema);

module.exports = {Users};