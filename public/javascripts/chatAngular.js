var cdotApp = angular.module("cdotApp", []);

var chatModel=[]

cdotApp.controller("chatController", function ($scope, $http, $timeout) {

	$scope.chatList = chatModel;
	var lastM;
	$scope.loadAllChat = function(x){
		var check = false;
		if(x == undefined){
			$http.get("/getChat").then(function(response) {
		 	for (var i = 0; i < response.data.length; i++) {
		 		$scope.chatList.push(response.data[i])
		 	} 
		 	$scope.chatList.reverse();
		 	$scope.lastM = 0;
			check = true;	
			for (var i = 0; i < $scope.chatList.length; i++) {
				$scope.lastM = $scope.chatList[i].id;
			};   
			$scope.loadAllChat($scope.lastM)
			
			
			
    });
			
		}else{
			lastM = 0;
			var check2 = false;
				
			for (var i = 0; i < $scope.chatList.length; i++) {
				lastM = $scope.chatList[i].id;
			};


			$http.get("/getChatm?id=" +lastM).then(function(data){
				
				$scope.chatList = [];
				$scope.chatList = data.data;
				$scope.chatList.reverse()
				$scope.loadAllChat(lastM)				
			})			
		}
	}

	$scope.addItem = function(msg){		
		var name = ((angular.element(document.querySelector(".userName")).text()).split(' '));
		var date = new Date();
		var minutes = date.getMinutes();
		var hours = date.getHours();	
		var seconds = date.getSeconds();		
		var time = hours.toString() + ":" +  minutes.toString() + ":" + seconds.toString();
		var message = {fname: name[1], lname:name[0], time: time, message: msg };
		$scope.chatList.push({fname: name[1], lname:name[0], time: time, message: msg })
					$http.put("/putChat", message).then(function(data){				
			})
	}
});