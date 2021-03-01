const mongoose = require('mongoose');

const schema = mongoose.Schema({
    customer : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Customer",
        required: true
    },
    accountType: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "AccountType",
        required : true
    },
    movement:{
        type: [ mongoose.SchemaTypes.ObjectId],
        ref : "Movement",
        required: false
    } ,
    availableAmount: Number,
    createdAt: {
        type: Date,
        default :  Date.now
    },
    accountNumber : String,
});

module.exports = mongoose.model("CustomerAccount", schema )