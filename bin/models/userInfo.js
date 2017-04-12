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


	var getUsers = function(callback){
		connection.query('SELECT * FROM users', function(err,res,fields){
			if(err){
				console.log(err);
			}else{
				callback(res)
			}

		})
	}

	var updUser = function(id,fname,lname,rights,callback){
		connection.query('UPDATE users SET fname=' + "\"" + fname + "\"" + ",lname=" + "\"" + lname + "\"" + ",rights=" + "\"" + rights + "\"" + "WHERE id=" + "\"" + id + "\"", function(err,res,fields){
			if(err){
				console.log(err);
			}else{
				callback(true);
			}
		})
	}
	var delUser = function(id,callback){
		connection.query('DELETE FROM chat WHERE id_user=' + "\"" + id + "\"" , function(err,res,fields){
			if(err){
				console.log(err);
			}else{
				connection.query('DELETE FROM users WHERE id=' + "\"" + id + "\"" , function(err,res,fields){
			if(err){
				console.log(err);
			}else{
				callback(true);
			}
		})
			}
		})
	}

	


module.exports.getPass = getPass;
module.exports.updUser = updUser;
module.exports.delUser = delUser;
module.exports.getUsers = getUsers;
module.exports.getUserInfo = getUserInfo;
