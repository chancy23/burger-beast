//dependencies (getting the models data) and express to use routes
var burger = require("../models/burgerModels.js");
var express = require("express");

var router = express.Router();

//get for getting the data to display in our index page
router.get("/", function(req, res){
    //call our method from the burger file for showing all burgers, use a function (this is where are cb functions will show up finally) to render it
    burger.selectAll(function(data){
        var burgerObj = {
            burgers: data
        };
        console.log(burgerObj);
        res.render("index", burgerObj);
    });
});

//put method for updating the db when burger is devoured
router.put("/api/burgers/:id", function(req, res){
    //define the condition using the id selected
    var condition = "id = " + req.params.id;
    // call the burger method to update, passing in the change (now devoured to true), the condition and our functiont to call when data is returned
    burger.updateOne({devoured: req.body.devoured}, condition, function(result){
        //if no changed rows data doesn't exist
        if (result.changedRows === 0){
             return res.status(404).end();
        }
        else {
            res.status(200).end();
        }
    });
});

//post method to add burger to the db
router.post("/api/burgers", function(req, res){
    //call the method and pass in the col name, and the new value for that col
    console.log("req", req.body.burger_name);
    //req.body.burger_name returns the value that was input
    //req.body is the full key/value object pair

    //shouldn't i have the column name in here first? however when I do, it stops the function and gives an error saying the value is not a colmn
    burger.insertOne("burger_name", req.body.burger_name, function(result){
       
        console.log("router post method called");
        console.log('the result: ' + result);
         //send back the id of the new burger as confirmation it was added
        res.json({id: result.insertId});
        //console.log({id: result.insertId});
    });
});


// export to server file
module.exports = router;

