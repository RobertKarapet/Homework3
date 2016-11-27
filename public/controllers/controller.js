var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


    var refresh = function() {
        $http.get('/hw3db').success(function(response) {
            console.log("I got the data I requested");
            $scope.hw3db = response;
            $scope.contact = "";
        });
    };

    refresh();

    $scope.addContact = function() {
        console.log($scope.contact);
        $http.post('/hw3db', $scope.contact).success(function(response) {
            console.log(response);
            refresh();
        });
    };

    $scope.remove = function(id) {
        console.log(id);
        $http.delete('/hw3db/' + id).success(function(response) {
            refresh();
        });
    };

    $scope.edit = function(id) {
        console.log(id);
        $http.get('/hw3db/' + id).success(function(response) {
            $scope.contact = response;
        });
    };

    $scope.update = function() {
        console.log($scope.contact._id);
        $http.put('/hw3db/' + $scope.contact._id, $scope.contact).success(function(response) {
            refresh();
        });
    };

    $scope.deselect = function() {
        $scope.contact = "";
    };

}]);
