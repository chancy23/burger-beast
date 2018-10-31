//require the connection to our DB from the connection file on this same directory
var connection = require("./connection.js");

//create the methods that will query, update, and/or add info to our DB

var orm = {
    //method to retrieve all burgers to display in our index.handlebars page. need the table and cb func as arguments
    selectAll: function(table, cb){
        //create a var for our query string, input the table param to know what table to query from the models file
        var queryString = "SELECT * FROM " + table + ";";
        //query the DB connection
        connection.query(queryString, function(err, result){
            if (err) throw err;
            //display the result, once that function is called (in controller I think)
            cb(result);
        });
    },
    //method for updating the DB when the Devour button is clicked (updateOne)
    updateOne: function(table, colValObj, condition, cb){
        //UPDATE table SET object{devoured: true} WHERE id=?
        //create string
        var queryString = "UPDATE " + table + "SET " + colValobj + "WHERE " + condition + ";";
        //query the DB to update the burger was devoured (true)
        connection.query(queryString, function(err, result){
            if (err) throw err;
            // cb function to udpate the page with burger now on the right side
            cb(result);
        });
    },
    //method to add a new burger to the DB (insertOne)
    insertOne: function(table, colVal, cb){

    }
    
}

//export so can be used by our models file(s)
module.exports = orm;