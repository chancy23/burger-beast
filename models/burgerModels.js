//dependencies, need to get the orm file
var orm = require("../config/orm.js");

//our burger data object
//this is how we call the orm methods that will query the DB so we can send our data to the controller

var burger = {
    // method to get all burgers in the db
    selectAll: function(cb){
        // call the associated orm method and input the paramters (table and cb) cb will call the function in the controller to render index page
        orm.selectAll("burgers", function(res){
            cb(res);
        });
    },
    // method to update the burger onces its been devoured, pass in the paramters we set up in orm, minus table since we specify table in the orm method call
    updateOne: function(colValObj, condition, cb){
        orm.updateOne("burgers", colValObj, condition, function(res){
            cb(res);
        });
    },
    // method to add a new burger
    insertOne: function(col, val, cb){
        orm.insertOne("burgers", col, val, function(res){
            cb(res);
        });
    }
};

//export the object to the controller
module.exports = burger;