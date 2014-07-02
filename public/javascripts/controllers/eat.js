function EatController($scope, $http) {
    $scope.restaurants = [];
    getAllRestaurants($scope, $http);
    $scope.addRestaurant = function() {
        if (!$scope.newRestaurantName) {
            return;
        }
        $http({
            url: '/eat/restaurants',
            method: 'POST',
            data: { name: $scope.newRestaurantName }
        }).success(function() {
            getAllRestaurants($scope, $http);
        });
        $scope.newRestaurantName = '';
    };
    $scope.removeRestaurant = function (id) {
        $http({
            url: '/eat/restaurants/' + id,
            method: 'DELETE'
        }).success(function() {
            getAllRestaurants($scope, $http);
        });
    };
}

function getAllRestaurants($scope, $http) {
    $http({
        url: '/eat/restaurants',
        method: 'GET',
    }).success(function (data) {
        $scope.restaurants = data;
    });
}