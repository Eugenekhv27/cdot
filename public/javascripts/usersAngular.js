var usersApp = angular.module("usersApp", []);

usersApp.controller("usersController", function($scope, $http){


	$scope.loadUsers = function(){
		$scope.editPanel = false;
		$http.get("/getUsers").then(function(data){
			$scope.usersMiddle = data.data;
			for (var i = 0; i < $scope.usersMiddle.length; i++) {

				switch($scope.usersMiddle[i].rights){
					case "rwd": $scope.usersMiddle[i].rights = "Третий уровень доступа"; break;
					case "rw0": $scope.usersMiddle[i].rights = "Второй уровень доступа"; break;
					case "r00": $scope.usersMiddle[i].rights = "Первый уровень доступа"; break;
				}
			};
			$scope.users = $scope.usersMiddle;

		})
	}

	$scope.setEditPanelTrue = function(){
		$scope.deletePanel = false;
			var elem;
			elem = angular.element(document.querySelector(".deleteUserButton"));
			elem.text("Удалить")
			elem.removeClass("list-group-item-info");
		if($scope.editPanel){
			elem = angular.element(document.querySelector(".editUserButton"));
			elem.text("Редактировать")
			elem.removeClass("list-group-item-info");
			$scope.editPanel = false;
		}else{
			elem = angular.element(document.querySelector(".editUserButton"));
			elem.text("Отмена редактирования")
			elem.addClass("list-group-item-info");
			$scope.editPanel = true;
		}
		
	}

	$scope.userEdit = function(id,fname,lname,rights){
		$scope.successUPD = false;
		var modalID = angular.element(document.querySelector(".modalEditID"));
		modalID.text(id)
		var modalFname = angular.element(document.querySelector(".modalEditFname")).children();
		modalFname = modalFname[0];
		modalFname.value = fname
		var modalLname = angular.element(document.querySelector(".modalEditLname")).children();
		modalLname = modalLname[0];
		modalLname.value = lname
		var modalRights = angular.element(document.querySelector(".modalEditRights")).children();
		if(rights == "Третий уровень доступа"){
			modalRights[0][0].selected = true;	
		}else if(rights == "Второй уровень доступа"){
			modalRights[0][1].selected = true;	
		}else{
			modalRights[0][2].selected = true;	
		}
		
		

	}

	$scope.updUser = function (){
		var modalID = angular.element(document.querySelector(".modalEditID"));
		modalID = modalID.text()
		var modalFname = angular.element(document.querySelector(".modalEditFname")).children();
		modalFname = modalFname[0].value;
		var modalLname = angular.element(document.querySelector(".modalEditLname")).children();
		modalLname = modalLname[0].value
		var modalRights = angular.element(document.querySelector(".modalEditRights")).children();				
		if(modalRights[0][0].selected){
			modalRights = "rwd";
		}else if(modalRights[0][1].selected){
			modalRights = "rw0";
		}else{
			modalRights = "r00";
		}

		var button = angular.element(document.querySelector(".button-to-push-user")); 

		button.text("Загрузка...");
		$http.get("/updUser?id=" + modalID + "&fname="+modalFname + "&lname="+modalLname + "&rights=" + modalRights).then(function(data){
			$scope.successUPD = true;
			button.text("Сохранить изменения");
			location.reload()

		})
	}


		$scope.delUser = function(id){
			$http.get("/delUser?id=" + id).then(function(data){
				location.reload()
				
		})
		}

		$scope.setDeletePanelTrue = function(){
			$scope.editPanel = false;
			var elem;
			elem = angular.element(document.querySelector(".editUserButton"));
			elem.text("Редактировать")
			elem.removeClass("list-group-item-info");
		if($scope.deletePanel){
			elem = angular.element(document.querySelector(".deleteUserButton"));
			elem.text("Удалить")
			elem.removeClass("list-group-item-info");
			$scope.deletePanel = false;
		}else{
			elem = angular.element(document.querySelector(".deleteUserButton"));
			elem.text("Отмена удаления")
			elem.addClass("list-group-item-info");
			$scope.deletePanel = true;
		}
		
	}
})