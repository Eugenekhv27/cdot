var md5 = require("md5");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'cdot'
});


connection.connect();

connection.query('SELECT * FROM users', function(err,res,fields){
	
	console.log(JSON.stringify(res[0]));
});

