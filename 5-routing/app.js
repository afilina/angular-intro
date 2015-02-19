var app = angular.module('myApp', ['ngResource', 'ngRoute']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/list', {
        templateUrl: 'list.html',
        controller: 'ProductsListCtrl'
      }).
      when('/detail/:id', {
        templateUrl: 'detail.html',
        controller: 'ProductsDetailCtrl'
      }).
      otherwise({
        redirectTo: '/list'
      });
  });

app.controller('ProductsListCtrl', function($scope, $resource) { 
    $scope.query = '';
    $scope.minPrice = 1;
    $scope.maxPrice = 20;

    var url = 'http://demoapi.foolab.ca/v1.0/products';
    $resource(url).get({}, function(response) {
        $scope.products = response.data;
    });

    $scope.updateResults = function() {
        for (var i = 0; i < $scope.products.length; i++) {
            var product = $scope.products[i];
            product.hidden = true;
            var matchesQuery = $scope.query == '' || product.name.toLowerCase().indexOf($scope.query) >= 0;
            var matchesPrice = product.price >= $scope.minPrice && product.price <= $scope.maxPrice;
            if (matchesQuery && matchesPrice) {
                product.hidden = false;
            }
        };
    }
});

app.controller('ProductsDetailCtrl', function($scope, $resource, $routeParams) { 
    console.log($routeParams);
    var url = 'http://demoapi.foolab.ca/v1.0/products/'+$routeParams.id;
    $resource(url).get({}, function(response) {
        $scope.product = response.data;
    });
});