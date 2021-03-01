const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');

const movementType = require('./models/movementType');
const accountType = require('./models/accountType');

const mongoose = require('mongoose');

const routes = require("./routes");

const MONGO_DB_URI = "mongodb://192.168.99.100:27017/bank";

const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded());

app.use(express.json());

async function seedData()  {
    let movementTypeData = await movementType.find();
    if( movementTypeData.length == 0 ){
        
        new movementType({
            description : "Income"
        }).save();

        new movementType({
            description : "Withdraw"
        }).save();

        new movementType({
            description : "Transfer"
        }).save();
        
    }

    //accountType.deleteMany({});
    let accountTypeData = await accountType.find();
    if( accountTypeData.length == 0 ){
        
        new accountType({
            name : "Saving"
        }).save();

        new accountType({
            name : "Checking"
        }).save();
        
    }
}

app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });

mongoose
	.connect(MONGO_DB_URI, { useNewUrlParser: true })
	.then(() => {

        seedData();

        app.use("/api", routes);
		app.listen(5000, () => {
			console.log("Server has started!")
		})
	})