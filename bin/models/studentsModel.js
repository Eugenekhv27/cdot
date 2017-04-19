var mysql = require("mysql");


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'cdot'
});


connection.connect();


var getSudentsInfo = function(startIndex,amount,fio,group,year,pay,callback ){

	var getFIO = function(){
		if(fio == undefined || fio == 'undefined' || fio.length == 0 ){
			return "";
		}else{
			
			return " AND fio=" + "\"" + fio + "\""
		}
	}

	var getYears = function(){
		if(year == undefined || year == 'undefined' || year.length == 0 ){
			return "";
		}else{
			
			return " AND god_postup=" + "\"" + year + "\""
		}
	}

		if((fio == undefined || fio == 'undefined' || fio.length == 0) && (group == undefined || group == 'undefined' || group.length == 0 ) && (year == undefined || year == 'undefined' || year.length == 0) && (pay == undefined || pay == 'undefined' || pay.length == 0)){
			
			connection.query('SELECT id,fio,dr, (SELECT gruppa FROM grup WHERE id = id_grup ) as grup, email, god_postup, zachotka, sostoyanie, oplata FROM stud LIMIT '  + startIndex  + ","  + amount , function(err,res,fields){
				if(err){console.log(err)}else{	
					var result = res;				
					connection.query('SELECT COUNT(*) as count FROM stud',function(err,res,fields){
						callback(result,res[0].count)
					})
				}
			})
		}else{
			if(group != undefined && group.length > 0 && group != 'undefined'){
				console.log("GP :", group);
				connection.query('SELECT id FROM grup WHERE gruppa=' + "\"" + group + "\"", function(err,res,fields){
				if(err){console.log(err)}else{					
					g_id = res[0].id
					connection.query('SELECT id,fio,dr, (SELECT gruppa FROM grup WHERE id = id_grup ) as grup, email, god_postup, zachotka, sostoyanie, oplata FROM stud WHERE id_grup='  + g_id  + getFIO() + getYears() +   ' LIMIT '  + startIndex  + ","  + amount, function(err,res,fields){
						
						var result = res;
						connection.query('SELECT COUNT(*) as count FROM stud WHERE id_grup='  + g_id  + getFIO() + getYears(),function(err,res,fields){
							
							callback(result,res[0].count)
						})

					})
				}
			})
			}else{

						connection.query('SELECT id,fio,dr, (SELECT gruppa FROM grup WHERE id = id_grup ) as grup, email, god_postup, zachotka, sostoyanie, oplata FROM stud WHERE id > 0' + getFIO() + getYears() +   ' LIMIT '  + startIndex  + ","  + amount, function(err,res,fields){
						
						var result = res;
						connection.query('SELECT COUNT(*) as count FROM stud WHERE id > 0' + getFIO() + getYears(),function(err,res,fields){
							
							callback(result,res[0].count)
						})

					})


			}

		}

	
		

}


var getCount = function(callback){

		connection.query('SELECT COUNT(*) as count FROM stud' , function(err,res,fields){
		if(err){console.log(err)}else{			
			callback(res);
		}
	})

}

var getGroups = function(callback){

		connection.query('SELECT gruppa FROM grup' , function(err,res,fields){
		if(err){console.log(err)}else{			
			callback(res);
		}
	})

}

var editStudent = function(options,callback){

	connection.query('SELECT id FROM grup WHERE gruppa=' + "\"" + options.grup + "\"" , function(err,res,fields){
		
		grid = res[0].id;

		{
			connection.query('UPDATE stud SET fio=' + "\"" + options.fio + "\"" + ",dr=" + "\"" + options.dr + "\"" + ",id_grup=" + "\"" + grid + "\"" + ",email=" + "\"" + options.email + "\"" + ",god_postup=" +  options.god_postup + ",zachotka=" + "\"" + options.zachotka + "\"" + ",sostoyanie=" + "\"" + options.sostoyanie + "\""  + " WHERE id=" + "\"" + options.id + "\"", function(err,res,fields){
				if(err){
					console.log(err)
				}else{
					callback("Студент изменен!");
				}
			})
		}
		
	})
	
	
}


module.exports.editStudent = editStudent
module.exports.getSudentsInfo = getSudentsInfo;
module.exports.getCount = getCount;
module.exports.getGroups = getGroups;