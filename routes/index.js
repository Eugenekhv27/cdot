var express = require('express');
var auth = require('../bin/controllers/checkAuth')
var url = require('url');
var qs = require("querystring");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  		var currentURL = req.url;
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
	  	}
  		
  	
});
	

router.post('/login', function(req,res){
	if(auth.equal(req.body.login, req.body.password)){
		//req.session.auth = true;
		req.session.auth = true;
		req.session.token = auth.getToken();
		console.log(req.session.id)
		res.redirect("/")
		res.end();
	}else{
		res.render('login', {title: "Авторизация", authfalse:1})
	}
	
	
})

module.exports = router;
