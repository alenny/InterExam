var appModule = angular.module('ieApp', []);

appModule.controller('EatController', function($scope, $http) {
    $scope.restaurants = [];
    $scope.recommended = {};

    var classes = ['alert-success', 'alert-warning', 'alert-info', 'alert-danger'];    
    
    function getRestaurantClass(idx) {
        return 'alert ' + classes[idx % classes.length];
    }
    
    function getAllRestaurants() {
        $http({
            url: '/eat/restaurants',
            method: 'GET',
        }).success(function (data) {
            $scope.restaurants = data.reverse();
            for (var i = 0; i < $scope.restaurants.length; ++i) {
                $scope.restaurants[i].styleClass = getRestaurantClass(i);
            }
        });
    }
        
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
    
    getAllRestaurants();
});
