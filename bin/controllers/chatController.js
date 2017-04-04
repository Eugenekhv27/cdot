var chatM = require('../models/chatModel');

var getChat = function(callback){
/*	var a = [
	{fname: "User1", lname:"user1", time: "12:05", msg: "Hello World, my name is Eugene1" },
	{fname: "User2", lname:"user2", time: "12:06", msg: "Hello World, my name is Eugene2" },
	{fname: "User3", lname:"user3", time: "12:07", msg: "Hello World, my name is Eugene3" },
	{fname: "User4", lname:"user4", time: "12:08", msg: "Hello World, my name is Eugene4" }
	]
	return a;*/
	chatM.getAllMessage(function(result){

		callback(result)

	});
}


var checkChat = function(req,lmid, callback){
		chatM.checkChat(req,lmid, function(data){
			
			callback(data);
		})

}

var putMessage = function(msg, id, callback){
	chatM.putMessage(msg,id, function(str){
		callback(str)
	})
}



module.exports.getChat = getChat;
module.exports.checkChat = checkChat;
module.exports.putMessage = putMessage;