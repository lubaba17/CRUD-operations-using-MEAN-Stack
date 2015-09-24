
var app = angular.module('myApp', []);

/*$scope- glue between application controller and the 'view'
 *'view' here is index.html file
 * $http - argument for AppCtrl function 
 */
app.controller('AppCtrl', function($scope, $http){
	console.log("Hello World from console");

//Function to refresh the page
var refresh = function() {
	$http.get('/organization').success(function(response){
		console.log("I got the data I requested");

		//It will put the data into our html file in our browser
		$scope.organization = response;
			$scope.contact= "";
	});
}

	refresh();

	//Function to add details of the employee 
	$scope.addContact = function(){
		console.log($scope.contact);

		//$scope.contact is the data to be sent to the server
		//success(..)- test to make sure that the controller receives the new data from the database
		$http.post('/organization', $scope.contact).success(function(response){
			//Prints the response the the console log
			console.log(response);
			//Refresh the entire organization list
			refresh();
		});
	};

	//Function to remove the details of the employee with that particular id
	//arg is the id the of employee we want to remove
	$scope.remove = function(id){
		console.log(id);

		//Sensing $http.delete request to the server
		 //arg of the delete method is the url of the id that we want to delete
		$http.delete('/organization/' + id).success(function(response){
			refresh();
		});
	};

	//Edit function to edit the employee details
	//id- id of the employee we want to edit
	$scope.edit = function(id){
		console.log(id);
		//success(..)- code for the response that we received
		$http.get('/organization/' + id).success(function(response){

			//Respond by putting the response into the input boxes that have the contact ng-model
			$scope.contact = response;
		});
	}


	//Function to update the edited information of the employees
	$scope.update = function(id){
		console.log($scope.contact._id);

		//PUT request to the send the data to the server to get updated
		//$scope.contact._id- url of the contact in the box
		//$scope.contact- contains all the employee details to be sent to the server
		$http.put('/organization/' + $scope.contact._id, $scope.contact).success(function(response){
			refresh();
		});
	};

	//Function to clear the input boxes before we add a contact
	$scope.deselect = function(){
		$scope.contact = "";
	}
});  


























