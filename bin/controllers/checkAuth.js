var randtoken = require('../../node_modules/rand-token');
console.log("checkAuth work");
var tokens =[];
var check = function(token){
	var checkToken = false;
	tokens.some(function(item){
		if(item.toString() == token.toString() ){
			console.log("here 1")
			checkToken = true;
		}

	});

	if(checkToken){
		console.log("here 2")
		return true;
	}else{
		
		return false;
	}	
}

var equal = function(userLogin, userPassword){
	if(userPassword == "admin" && userLogin == "admin"){
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