var mysql = require("mysql");


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'cdot'
});


connection.connect();



	

	var getPass = function(login, callback){

		connection.query('SELECT * FROM users WHERE login =' + "\"" + login + "\"", function(err,res,fields){	
		if(err){
			console.log(err); callback(false)
		}else if(res.length == 0){		
		callback(false)

		}else{
			callback(res[0].password)
		}
		
		});
	
	}

	var getUserInfo = function(login,callback){
		connection.query('SELECT * FROM users WHERE login =' + "\"" + login + "\"", function(err,res,fields){	
		if(err){
			console.log(err); callback(false)
		}else if(res.length == 0){		
		callback(false)

		}else{
			callback(res[0])
		}
		
		});
	
	}

	


module.exports.getPass = getPass;
module.exports.getUserInfo = getUserInfo;