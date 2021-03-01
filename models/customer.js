const mongoose = require("mongoose");

const schema = mongoose.Schema({
        fullName: String,
        rut: String,
        email : String,
        pwd : String,
        //id: Number,
});

module.exports = mongoose.model("Customer", schema);