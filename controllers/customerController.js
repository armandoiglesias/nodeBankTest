const Customer = require("../models/customer");
const CustomerAccount = require("../models/customerAccount");


exports.getCustomers = async (req, res, next) => {
    let customers = await Customer.find();
    res.send(customers);
}
exports.getCustomersAccount = async (req, res, next) => {
    let customers = await CustomerAccount.find();
    res.send(customers);
}



exports.postCustomerAccount =  (req, res, next) => {
    const { customerId } = req.body;
    return CustomerAccount.findOne({
        customer : customerId
    }).then( account =>{
        console.log(account);
        return res.send(account);
    } );
    
}



