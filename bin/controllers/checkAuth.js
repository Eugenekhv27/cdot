var randtoken = require('../../node_modules/rand-token');
var url = require('url');
var qs = require("querystring");

var tokens =[];
var check = function(req,res){
	var checkToken = false;
	var checkAuth = false;
	var checkLogout = false;
	var currentURL = req.url;
  	var paramString = url.parse(currentURL).query;
  	getParams = qs.parse(paramString);
	tokens.some(function(item){
	if(item.toString() == req.session.token.toString() ){
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

var equal = function(userLogin, userPassword){
	if((userPassword == "admin" && userLogin == "admin") || (userPassword == "user" && userLogin == "user")) {
		return true;
	}else{
		return false;
	}
}

var getToken = function(){
	var token = randtoken.generate(16);
	tokens.push(token);
	return token;
}



module.exports.check = check;
module.exports.equal = equal;
module.exports.getToken = getToken;