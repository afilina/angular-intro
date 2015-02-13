var app = angular.module('myApp', ['ngResource']);

app.controller('ProductsCtrl', function($scope, $resource) { 
    
    $scope.query = '';
    $scope.minPrice = 1;
    $scope.maxPrice = 20;
    $scope.cart = {
        'products': [],
        'total': 0
    };
    $scope.showCart = false;

    var url = 'http://api.shop.dev/v1.0/products';
    $resource(url).get({}, function(response) {
        $scope.products = response.data;
    });

    $scope.showDetails = function(item) {
        $scope.selectedProduct = item;
    };

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

    $scope.addToCart = function(product) {
        var existsInCart = false;
        for (var i = 0; i < $scope.cart.products.length; i++) {
            var item = $scope.cart.products[i];
            if (item.id == product.id) {
                item.qty += 1;
                existsInCart = true;
            }
        }
        if (!existsInCart) {
            $scope.cart.products.push({
                'id': product.id,
                'name': product.name,
                'stock': product.stock,
                'price': product.price,
                'qty': 1,
            });
        }
        $scope.updateCartTotal();
        $scope.showCart = true;
    }

    $scope.updateCartTotal = function() {
        var total = 0;
        for (var i = $scope.cart.products.length - 1; i >= 0; i--) {
            var item = $scope.cart.products[i];
            if (item.qty == 0) {
                $scope.cart.products.splice(i, 1);
                continue;
            }
            if (item.qty == null) {
                item.qty = 1;
            }
            total += item.qty * item.price;
        }
        $scope.cart.total = Math.round(total * 100) / 100;
        if ($scope.cart.products.length == 0) {
            $scope.showCart = false;
        }
    }
});
