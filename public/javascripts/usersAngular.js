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
			var elem;
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
})