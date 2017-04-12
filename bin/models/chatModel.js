var mysql = require("mysql");
var events = require('events')
var url = require('url')


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'cdot'
});


connection.connect();

var myEmitter = new events.EventEmitter();



var getAllMessage = function(callback){
	connection.query('SELECT id, message, time, (SELECT fname FROM users WHERE id = chat.id_user ) as fname, (SELECT lname FROM users WHERE id = chat.id_user ) as lname FROM chat ORDER BY chat.id DESC LIMIT 10', function(err,res,fields){	
		if(err){
			console.log(err); callback(false)
		}else if(res.length == 0){		
		callback(false)

		}else{
			callback(res)
		}
		
		});
}

var putMessage = function(message, id, callback){

connection.query('INSERT INTO `chat` (`id`, `id_user`, `message`, `time`) VALUES (NULL, ' + id +' , \' ' + message.message +' \', \' ' + message.time +' \')', function(err,res,fields){
	if(err){console.log(err)}else{callback("200"); myEmitter.emit('push'); }

})

}

var checkChat = function(req,lmid, callback1){
	var lmID;
	var whileCheck;
	

myEmitter.once('someEvent', function() {

	if(lmID == lmid){
		console.log("Дублирование")
	}else {
	lmID = lmid;
	whileCheck = true;	
	f(callback1);
	

	}
	
});



var f = function(callback){

connection.query('SELECT id, message, time, (SELECT fname FROM users WHERE id = chat.id_user ) as fname, (SELECT lname FROM users WHERE id = chat.id_user ) as lname FROM chat ORDER BY chat.id DESC LIMIT 10', function(err,res,fields){
		
		if(err)	{
			
			console.log(err); 
			whileCheck = false;			

		}else if(res.length == 0){
			
			
			console.log(false)
			whileCheck = false;
			
		}else if(res.length != 0){
			
			for (var i = 0; i < res.length; i++) {
				console.log("Сравнение: " + res[i].id + ":" + lmID)
				if(res[i].id > lmID){
					
					callback(res)
					whileCheck = false;
					
					i = res.length;

				}
			};
			
			
			
			
		}else{
		
			
		}
	});



}



	
		
	/*connection.query('SELECT chat.id, message, time, fname, lname FROM chat, users LIMIT 10', function(err,res,fields){
		
		if(err)			{
			console.log("1")
			console.log(err); callback(false);
			whileCheck = false;
			callback("res")

		}else if(res.length == 0){
			console.log("2")
			callback("ыввыв")
			console.log(false)
			whileCheck = false;
			
		}else if(res.length != 0){
			console.log("3")
			for (var i = 0; i < res.length; i++) {
				if(res[i].id > lmid){
					callback("вывы")
					whileCheck = false;
					console.log("Прошлоа");
				}
			};
			callback("test")
			
			
			
		}else{
			console.log("4")
			callback("qwe")
		}
	});*/



}


module.exports.getAllMessage = getAllMessage;
module.exports.checkChat = checkChat;
module.exports.putMessage = putMessage;