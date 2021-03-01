const mongoose = require("mongoose");

const schema = mongoose.Schema({

    createdAt: {
        type : Date,
        default :  Date.now
    },
    description: String,
    amount: Number,
    movementType: {
        type: mongoose.Schema.ObjectId,
        //ref: ""
        required: false
    },
    to: {
        type : mongoose.Schema.ObjectId,
        ref : "Customer",
        required : false
    },
});

module.exports = mongoose.model("Movement", schema);

