var express = require('express');
var auth = require('../bin/controllers/checkAuth');
var url = require('url');
var qs = require("querystring");
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  		/*var currentURL = req.url;
  		var paramString = url.parse(currentURL).query;
  		getParams = qs.parse(paramString);
  		if(getParams.logout != 1 ){
  			if(req.session.auth ){				
			  if(auth.check(req.session.token)){
			  	req.session.token = auth.getToken();	
			  	res.render('index');
			  }else{
		  		res.render('login', {title: "Авторизация"});
			  }
			}else{
			  	res.render('login', {title: "Авторизация"});
			  }
	  	}else{
	  		req.session.destroy();
	  		res.redirect("/");
	  	}*/

	  	if(auth.check(req,res)){	  		
	  		req.session.token = auth.getToken();
	  		auth.getUserInfo(req.session.login, function(userInfo){
	  			res.render('index', {fname: userInfo.fname, lname: userInfo.lname});
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

		//req.session.auth = true;

	
	
	



router.get('/singup', function(req,res){
	res.render('login', {title: "Авторизация"})
})

module.exports = router;
