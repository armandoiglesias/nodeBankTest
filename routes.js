const express = require("express");
const customer = require("./models/customer");
const movementType = require("./models/movementType");
const accountType = require("./models/accountType");
const router = express.Router();

const customerController = require("./controllers/customerController");
const loginController = require("./controllers/loginController");

router.get("/", ( req,res )=>{
    res.send("Hola Mundo");
});

router.get("/Customers", customerController.getCustomers );

router.get("/movementTypes",  async (req, res )=>{
    const mt = await movementType.find({});
    res.send(mt);
});

router.get("/accountTypes", async (req, res )=>{
    const mt =await  accountType.find({});
    res.send(mt);
});

router.post("/customer",loginController.postAddCustomer);


router.get("/customersAccount",customerController.getCustomersAccount);

router.delete("/customer", (req, res, next)=>{
    customer.deleteMany().then( () => res.send(true));
});

router.post( "/login", loginController.postLogin );

router.post( "/customerAccount", customerController.postCustomerAccount );

module.exports = router;