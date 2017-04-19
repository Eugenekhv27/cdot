var setActive = function(elem){
	var elems = document.getElementsByClassName("pagination-item");
	for (var i = 0; i < elems.length; i++) {
		elems[i].classList.remove("active");

	};
	if(elem != undefined){
		elem.classList.add("active");
	}
	
}
var usersApp = angular.module("studentsApp", []);

usersApp.controller("studentsController", function($scope, $http){

$scope.studentsModel = [];
$scope.pug =[];
$scope.options = {}


$scope.updStudent = function(id,fio,dr,grup,email,god_postup,zachotka,sostoyanie){

	if(grup == undefined || grup == 'undefined' || grup == ""){
		grup = $scope.editOptions.grup
	}
		pushOptions = {
			id : id,
			fio:fio,
			dr: dr,
			grup: grup,
			email: email,
			god_postup: god_postup,
			zachotka: zachotka,
			sostoyanie: sostoyanie
		}
		console.log(pushOptions)

		$http.post("/editStudent", pushOptions).then(function(data){
			function hideM(){
				$("#editStudent").modal('hide');
				$scope.loadStudents($scope.options.sIndex, $scope.options.amount, $scope.options.fio, $scope.options.gruppa, $scope.options.year);
			}

			setTimeout(hideM, 1000);
		})

}

	$scope.openEdit = function(id,fio,dr,grup,email,god_postup,zachotka,sostoyanie){
		
		
		var elem = document.getElementsByClassName("editGrupItem");
		for (var i = 0; i < elem[0].options.length; i++) {
			if(grup == elem[0].options[i].value){elem[0].options[i].selected = true}
		};
		
		$scope.editOptions = {
			id : id,
			fio:fio,
			dr: dr,
			grup: grup,
			email: email,
			god_postup: god_postup,
			zachotka: zachotka,
			sostoyanie: sostoyanie
		}
		$("#editStudent").modal('show');
	}

	$scope.selectPage = function(sIndex){
		
		sIndex = sIndex * 30 - 30;

		$scope.loadStudents(sIndex, $scope.options.amount, $scope.options.fio, $scope.options.gruppa, $scope.options.year)

	}
	$scope.loadStudents = function(sIndex, amount, fio, gruppa, year){
		setActive(undefined);
		
		$scope.options = {
			sIndex: sIndex,
			amount: amount,
			fio: fio,
			gruppa: gruppa,
			year: year
		}

		console.log($scope.options)

		
		
		var loader = angular.element(document.querySelector(".loader"));
		$scope.amount = amount;
		$scope.studentsModel = [];
		loader.css('display', 'block')
		if($scope.options.sIndex != undefined && $scope.options.amount != undefined){
			$http.get("/getStudents?sIndex=" + $scope.options.sIndex + "&amount=" + $scope.options.amount + "&fio=" + $scope.options.fio + "&gruppa=" + $scope.options.gruppa + "&year=" + $scope.options.year).then(function(data){
				$scope.studentsModel = [];
				loader.css('display', 'none')
				for (var i = 0; i < data.data.result.length; i++) {
					$scope.studentsModel.push({id: data.data.result[i].id, fio: data.data.result[i].fio, dr: data.data.result[i].dr, grup:  data.data.result[i].grup, email: data.data.result[i].email, god_postup: data.data.result[i].god_postup, zachotka: data.data.result[i].zachotka, sostoyanie: data.data.result[i].sostoyanie, oplata: data.data.result[i].oplata})
					
				};

				$scope.groups = data.data.groups	
				$scope.count = data.data.count[0]
				$scope.cou = data.data.cou;
				
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
				$scope.options.amount = 30;
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