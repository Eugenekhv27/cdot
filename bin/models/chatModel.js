var mysql = require("mysql");


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'cdot'
});


connection.connect();



var getAllMessage = function(callback){
	connection.query('SELECT chat.id, message, time, fname, lname FROM chat, users LIMIT 10', function(err,res,fields){	
		if(err){
			console.log(err); callback(false)
		}else if(res.length == 0){		
		callback(false)

		}else{
			callback(res)
		}
		
		});
}


module.exports.getAllMessage = getAllMessage;