var randtoken = require('../../node_modules/rand-token');
var url = require('url');
var md5 = require("md5");
var user = require('../models/userInfo');
var qs = require("querystring");
var mysql = require("mysql");

var tokens =[];
var check = function(req,res){
	var checkToken = false;
	var checkAuth = false;
	var checkLogout = false;
	var currentURL = req.url;
  	var paramString = url.parse(currentURL).query;
  	getParams = qs.parse(paramString);
	tokens.some(function(item){
	if(item.toString() == req.session.token){
		console.log("Процесс проверки токена...")
		checkToken = true;
		}
	});
	if(req.session.auth){
		console.log("Процесс проверки авторизации...")
		checkAuth = true;
	}
	if(getParams.logout == 1){
		console.log("Уничтожение сессии")
		req.session.destroy();
		checkLogout = false;		
	}else{
		checkLogout = true;
	}

	if(checkToken && checkLogout && checkAuth){
		console.log("Проверка прошла успешно!")
		return true;
	}else{
		
		return false;
	}	
}

var equal = function(userLogin, userPassword,callback){

	var check = false;
	user.getPass(userLogin, function(pass){

		if(pass != false){
		
			if( md5(userPassword) == pass){

				check = true;
				callback(check)
			}else{
				check = false;
				callback(check);
			}

		}else{
			check = false;
							console.log("HUUUTYY3");
			callback(check)
		}
		
	})

	
}

var getToken = function(){
	var token = randtoken.generate(16);
	tokens.push(token);
	return token;
}


var getUserInfo = function(login,callback){

	user.getUserInfo(login, function(userInfo){
		callback(userInfo);
	})

}

module.exports.check = check;
module.exports.equal = equal;
module.exports.getToken = getToken;
module.exports.getUserInfo = getUserInfo;