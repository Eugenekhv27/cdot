var cdotApp = angular.module("cdotApp", []);

var chatModel = [];

cdotApp.controller("chatController", function ($scope, $http) {

	$scope.chatList = chatModel;
	$scope.loadAllChat = function(){
		 $http.get("/getChat").then(function(response) {
		 	for (var i = 0; i < response.data.length; i++) {
		 		$scope.chatList.push(response.data[i])
		 	}        	
    });

    



	}

	$scope.addItem = function(){
		$scope.chatList.push({fname: "11User1", lname:"11user1", time: "1112:05", message: "11Hello World, my name is Eugene1" })
	}


});