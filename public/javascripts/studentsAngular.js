// Сделать "Показано x из y"
var usersApp = angular.module("studentsApp", []);

usersApp.controller("studentsController", function($scope, $http){

$scope.studentsModel = [];
$scope.pug =[];

	$scope.loadStudents = function(sIndex, amount, fio, gruppa, year, pay){
		var loader = angular.element(document.querySelector(".loader"));
		$scope.amount = amount;
		$scope.studentsModel = [];
		loader.css('display', 'block')
		if(sIndex != undefined && amount != undefined){
			$http.get("/getStudents?sIndex=" + sIndex + "&amount=" + amount + "&fio=" + fio + "&gruppa=" + gruppa + "&year=" + year + "&pay=" + pay).then(function(data){
				$scope.studentsModel = [];
				loader.css('display', 'none')
				for (var i = 0; i < data.data.result.length; i++) {
					$scope.studentsModel.push({id: data.data.result[i].id, fio: data.data.result[i].fio, dr: data.data.result[i].dr, grup:  data.data.result[i].grup, email: data.data.result[i].email, god_postup: data.data.result[i].god_postup, zachotka: data.data.result[i].zachotka, sostoyanie: data.data.result[i].sostoyanie, oplata: data.data.result[i].oplata})
					
				};

				$scope.groups = data.data.groups	
				$scope.count = data.data.count[0]
				$scope.cou = data.data.cou;
				console.log(data.data.cou)
				var pag = 0;
				function isInteger(num) {
  					return (num ^ 0) === num;
				}
				
				
				$scope.pug = [];
				pag = data.data.cou / amount;
				
				if(pag % 10 != 0 && pag != 1){
					if(!isInteger(pag)){
						pag = pag +1;
					}
					
				}
				for (var i = 1; i <=pag; i++) {
					$scope.pug.push(i);
				};

			})
			

		}else{
			$http.get("/getStudents?sIndex=0&amount=30").then(function(data){
				$scope.studentsModel = [];
				$scope.amount = 30;
				loader.css('display', 'none')
				for (var i = 0; i < data.data.result.length; i++) {
					$scope.studentsModel.push({id: data.data.result[i].id, fio: data.data.result[i].fio, dr: data.data.result[i].dr, grup:  data.data.result[i].grup, email: data.data.result[i].email, god_postup: data.data.result[i].god_postup, zachotka: data.data.result[i].zachotka, sostoyanie: data.data.result[i].sostoyanie, oplata: data.data.result[i].oplata})
				
				};
				$scope.groups = data.data.groups	
				$scope.count = data.data.count[0]
				$scope.cou = data.data.cou;
				var pag = 0;				
				$scope.pug = [];
				pag = data.data.cou / 30;				
				if(pag % 10 != 0 && pag != 1){
					
					pag = pag +1;
				}
				for (var i = 1; i <=pag; i++) {
					$scope.pug.push(i);
				};

			})

		}



	}




})