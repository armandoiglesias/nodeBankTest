const AccountType = require("../models/accountType");
const Customer = require("../models/customer");

exports.postLogin = ( req, res, next )=>{
    const {  Rut, Pwd } = req.body;

    Customer.findOne({ rut : Rut }).then( user =>{
        if(user == null){
            return res.send( {
                user: null,
                result: false
            });
        }else{
            if( user.pwd == Pwd ){
                return res.send( {
                    user,
                    result : true
                });
            }
                return res.send( {
                    user: null,
                    result: false
                });
            
        }
    } );

}

exports.postAddCustomer = (req, res, next) => {
    console.log(req.body);
    const { FullName, Rut, Email, Pwd } = req.body;

    let _accountType;
    let _customer;

    Customer.findOne({
        rut: Rut
    }).then(user => {
        console.log(user);
        if (user != null) {
            return Promise.reject(
                {
                    "result": false,
                    "message": "Cliente ya se encuentra registrado"
                }
            );
        }

        return Promise.resolve();

    }).then(() => {

        const customer = new Customer({
            fullName: FullName,
            rut: Rut,
            email: Email,
            pwd: Pwd
        });

        return customer.save()
    })
    .then((customer) => {
        _customer = customer;
        return AccountType.find().then(data => {
            _accountType = data[0];
            return Promise.resolve();
        });
    })
    .then(() => {

        const cc = new CustomerAccount({
            customer: _customer._id,
            accountType: _accountType._id,
            accountNumber: "00001-" + _customer.rut,
            availableAmount: 0,
            movement: [],
        });

        return cc.save();
    })
    .then(ac => {
        res.send({
            result: true,
            message: "Registrado exitosamente"
        });
    }).catch(err => {
        res.send({
            "result": false,
            "message": "Cliente ya se encuentra registrado"
        });
    });


}

