const mongoose = require('mongoose');

module.exports = mongoose.model("MovementType", mongoose.Schema({
    description : String
}) );