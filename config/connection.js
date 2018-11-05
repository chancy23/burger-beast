//dependencies
var mysql = require("mysql");

//create a connection to mysql and to JawsDB if deployed
var connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else {
    connection = mysql.createConnection({
        name: "localhost",
        port: 8889,
        user: "root",
        password: "root",
        database: "burgers_db"
    });
};

//connect to connection
connection.connect(function(err){
    if (err) {
        console.log("there was a problem connection to the DB" + err.stack);
        return;
    }
    else {
        console.log("connected with ID " + connection.threadId);
    }
});

//export the connection so it can be used in the ORM file
module.exports = connection;
