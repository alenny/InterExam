var appModule = angular.module('ieApp', []);

appModule.controller('EatController', function($scope, $http) {
    $scope.restaurants = [];
    $scope.recommended = {};
    $scope.isManager = false;
    $scope.isManagerCodeInvalid = false;

    var classes = ['alert-success', 'alert-warning', 'alert-info', 'alert-danger'];    
    
    function getRestaurantClass(idx) {
        return 'alert ' + classes[idx % classes.length];
    }
    
    function checkIsManager() {
        $http({
            url: '/eat/ismanager',
            method: 'GET'
        }).success(function(data) {
            $scope.isManager = data['result'];
        });
    }

    function getAllRestaurants() {
        $http({
            url: '/eat/restaurants',
            method: 'GET'
        }).success(function (data) {
            $scope.restaurants = data.reverse();
            for (var i = 0; i < $scope.restaurants.length; ++i) {
                $scope.restaurants[i].styleClass = getRestaurantClass(i);
            }
        });
    }

    $scope.verifyManagerCode = function() {
        if (!$scope.managerCode) {
            return;
        }
        $http({
            url: '/eat/verifymanagercode/' + $scope.managerCode,
            method: 'GET'
        }).success(function(data) {
            $scope.isManager = data['result'];
            $scope.isManagerCodeInvalid = !data['result'];
        });
        $scope.managerCode = '';
    };
        
    $scope.addRestaurant = function () {
        if (!$scope.newRestaurantName) {
            return;
        }
        $http({
            url: '/eat/restaurants',
            method: 'POST',
            data: { name: $scope.newRestaurantName }
        }).success(function() {
            getAllRestaurants();
        });
        $scope.newRestaurantName = '';
    };
    
    $scope.removeRestaurant = function (id) {
        $http({
            url: '/eat/restaurants/' + id,
            method: 'DELETE'
        }).success(function() {
            getAllRestaurants();
        });
    };
    
    $scope.recommendOne = function () {
        if (!$scope.restaurants) {
            return;
        }
        var idx = Math.floor(Math.random() * $scope.restaurants.length);
        $scope.recommended = $scope.restaurants[idx];
    };

    checkIsManager();
    getAllRestaurants();
});
