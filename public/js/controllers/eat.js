function EatController($scope, $http) {
    $scope.restaurants = [];
    $scope.recommended = {};
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
    $scope.recommendOne = function () {
        if (!$scope.restaurants) {
            return;
        }
        var idx = Math.floor(Math.random() * $scope.restaurants.length);
        $scope.recommended = $scope.restaurants[idx];
        $('#recommendedRestaurant').addClass('in');
    };
}

function getAllRestaurants($scope, $http) {
    $http({
        url: '/eat/restaurants',
        method: 'GET',
    }).success(function (data) {
        $scope.restaurants = data.reverse();
    });
}

