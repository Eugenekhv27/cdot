var express = require('express');
var url = require('url');
var qs = require("querystring");
var auth = require('../bin/controllers/checkAuth');
var chat = require('../bin/controllers/chatController');
var students = require('../bin/controllers/studentsController');
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


router.post('/editStudent', function(req,res){
	
	students.editStudent(req.body,function(){
		res.end("success");
	})

})

router.get('/students', function(req,res){

		  	if(auth.check(req,res)){	  		
	  		req.session.token = auth.getToken();
	  		auth.getUserInfo(req.session.login, function(userInfo){
	  			res.render('students', {fname: userInfo.fname, lname: userInfo.lname, rights: userInfo.rights});
	  		})	
			

	  	}else{
	  		res.redirect('/singup');
	  	}
  		

})

router.get('/getStudents',function(req,res){
		sIndex = qs.parse(url.parse(req.url).query).sIndex;
		amount = qs.parse(url.parse(req.url).query).amount;
		fio = qs.parse(url.parse(req.url).query).fio;
		group = qs.parse(url.parse(req.url).query).gruppa;
		year = qs.parse(url.parse(req.url).query).year;
		pay = qs.parse(url.parse(req.url).query).pay;
		//console.log(sIndex + amount + fio + group + year + pay)
		students.getSudentsInfo(sIndex,amount,fio,group,year,pay,function(result,co){
			students.getCount(function(count){
				students.getGroups(function(gp){
					res.send({result: result, count:count, groups: gp, cou : co });	
				})
			})
			
		})
})


router.get("/updUser", function(req,res){
	var id = qs.parse(url.parse(req.url).query).id;
	var fname = qs.parse(url.parse(req.url).query).fname;
	var lname = qs.parse(url.parse(req.url).query).lname;
	var rights = qs.parse(url.parse(req.url).query).rights;
	auth.updUser(id,fname,lname,rights,function(x){
		console.log(x)
		res.end();
	})
	

})

router.get("/delUser", function(req,res){
	var id = qs.parse(url.parse(req.url).query).id;
	auth.delUser(id, function(x){
		res.end();
	})
})
	

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
