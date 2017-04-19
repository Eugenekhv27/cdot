var user = require('../models/studentsModel');
var mysql = require("mysql");


var getSudentsInfo = function(startIndex,amount,fio,group,year,pay,callback ){
	console.log("Amount:" + amount)

	user.getSudentsInfo(startIndex,amount,fio,group,year,pay,function(res,co){
		callback(res,co);
	})
	
}

var getCount = function(callback){
	user.getCount(function(x){
		callback(x);
	})
}

var getGroups = function(callback){
	user.getGroups(function(x){
		callback(x);
	})
}

var editStudent = function(options,callback){


	user.editStudent(options,function(back){
		callback(back)
	})
}

var addStudent = function(options,callback){


	user.addStudent(options,function(back){
		callback(back)
	})
}

var delStud = function(options,callback){


	user.delStud(options,function(back){
		callback(back)
	})
}




module.exports.editStudent = editStudent
module.exports.delStud = delStud
module.exports.addStudent = addStudent
module.exports.getSudentsInfo = getSudentsInfo;
module.exports.getCount = getCount;
module.exports.getGroups = getGroups;
