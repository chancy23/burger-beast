var connection = require("./connection.js");

// Helper function to convert object key/value pairs to SQL syntax
// used when updating a DB item, where youa have to name the key and the value (ie {burger_name: "cheesburger"})
function objToSql(ob) {
    var arr = [];
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    };

    // translate array of strings to a single comma-separated string
    return arr.toString();
};


// each of the methods we will use on our db
var orm = {
    //method to retrieve all burgers to display in our index.handlebars page
    selectAll: function (table, cb) {
        //create a var for our query string, input the table param to know what table to query from the models file
        var queryString = "SELECT * FROM " + table + ";";
        connection.query(queryString, function (err, result) {
            if (err) {
                console.log("Error in ORM" + err);
            }
            //display the result, once that function is called (in controller)
            else {
                cb(result);
            }
        });
    },
    // method for updating the DB when the Devour button is clicked
    updateOne: function (table, colValObj, condition, cb) {
        var queryString = "UPDATE " + table + " SET " + objToSql(colValObj) + " WHERE " + condition + ";";
        //query the DB to update the burger was devoured (true)
        connection.query(queryString, function (err, result) {
            if (err) throw err;
            // cb function to udpate the page with burger now on the right side
            cb(result);
        });
    },
    // method to add a new burger to the DB
    insertOne: function (table, col, val, cb) {
        //Note: when a single value just use the quesiton mark in the query string, not a parameter
        //when more than one, use the helper function to insert multiple
        var queryString = "INSERT INTO " + table + " (" + col + ") VALUES (?)";
        //why do we add the argument "val" here?
        connection.query(queryString, val, function (err, result) {
            if (err) throw err;
            //cb function to update the page after data is removed (result)
            cb(result);
        });
    }
};

//export so can be used by our models file(s)
module.exports = orm;