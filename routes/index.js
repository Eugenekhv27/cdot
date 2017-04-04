var express = require('express');
var url = require('url');
var qs = require("querystring");
var auth = require('../bin/controllers/checkAuth');
var chat = require('../bin/controllers/chatController');
var router = express.Router();



router.get('/', function(req, res, next) {
	  	if(auth.check(req,res)){	  		
	  		req.session.token = auth.getToken();
	  		auth.getUserInfo(req.session.login, function(userInfo){
	  			res.render('index', {fname: userInfo.fname, lname: userInfo.lname, rights: userInfo.rights});
	  		})	
			

	  	}else{
	  		res.redirect('/singup');
	  	}
  		
  	
});
	

router.post('/login', function(req,res){

	auth.equal(req.body.login, req.body.password, function(check){
		if(check)
		{
			req.session.auth = true;
			req.session.token = auth.getToken();
			req.session.login = req.body.login;
			console.log(req.session.id)
			res.redirect("/")
			res.end();
	}else{
			console.log("Im here")
			res.render('login', {title: "Авторизация", authfalse:1})
	}

	})
});


router.get('/getChat', function(req,res){

		var id = qs.parse(url.parse(req.url).query).id;
		if(id == undefined){
			chat.getChat(function(result){
			res.send(result)

		})

		}
	

})


router.get('/userEdit', function(req,res){
	if(auth.check(req,res)){	  		
	  		req.session.token = auth.getToken();
	  			auth.getUserInfo(req.session.login, function(userInfo){
	  				res.render('users', {fname: userInfo.fname, lname: userInfo.lname, rights: userInfo.rights});
		  		})				  		
	  	}else{
	  		res.redirect('/singup');
	  	}

})

router.get('/getUsers',function(req,res){
	auth.getUsers(function(users){
		
		res.end(JSON.stringify(users))

	})
})


/*router.post('/getChat', function(req,res){
		
		chat.checkChat(req.body.lmId,function(data){
			console.log("В роуте")
			console.log(JSON.stringify(data))
			res.send(JSON.stringify(data));
			res.end();
			
		})

})*/

router.put('/putChat', function(req,res){


		var login = req.session.login
		
		auth.getUserInfo(login, function(userInfo){

				chat.putMessage(req.body, userInfo.id,function(str){
				console.log(login + " Отправил сообщение: " + req.body.message)					
				res.end();
			})

		})
		
		
})


router.get('/getChatm', function(req,res){
	var id = qs.parse(url.parse(req.url).query).id;
			console.log("Пользователь " + req.session.login + " Ожидает сообщения")
			
			chat.checkChat(req,id,function(data){
			console.log("Пользователь " + req.session.login + " Получил последние 10 сообщений")
			res.end(JSON.stringify(data))
		})
})
		

	
	
	



router.get('/singup', function(req,res){
	res.render('login', {title: "Авторизация"})
})

module.exports = router;
