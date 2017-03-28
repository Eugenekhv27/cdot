var express = require('express');
var auth = require('../bin/controllers/checkAuth')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  		
  	if(req.session.auth){

				
			  if(auth.check(req.session.token)){
			  		req.session.token = auth.getToken();			  		
				  	res.render('index');
			  }else{
			  		res.render('login', {title: "Авторизация"});
			  }
	}else{
			  		res.render('login', {title: "Авторизация"});
			  }
});
	

router.post('/login', function(req,res){
	if(auth.equal(req.body.login, req.body.password)){
		//req.session.auth = true;
		req.session.auth = true;
		req.session.token = auth.getToken();
		res.redirect("/")
		res.end();
	}else{
		res.render('login', {title: "Авторизация", authfalse:1})
	}
	
	
})

module.exports = router;
