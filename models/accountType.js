const mongoose = require('mongoose');

module.exports = mongoose.model("AccountType", mongoose.Schema({
    name: String,
    alias: String,
}));

