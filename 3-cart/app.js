
function ProductsCtrl($scope) {
    var json =  {
        "data": [{
            "id": "product-1",
            "name": "Skyrim",
            "description": "Short product description.",
            "image": "http:\/\/upload.wikimedia.org\/wikipedia\/en\/1\/15\/The_Elder_Scrolls_V_Skyrim_cover.png",
            "price": 19.99,
            "stock": 10
        }, {
            "id": "product-2",
            "name": "Civilization V",
            "description": "Short product description.",
            "image": "http:\/\/upload.wikimedia.org\/wikipedia\/en\/5\/5c\/CIVILIZATION-V-FRONT-OF-BOX.jpg",
            "price": 15.99,
            "stock": 0
        }, {
            "id": "product-3",
            "name": "I, Robot",
            "description": "Short product description.",
            "image": "http:\/\/upload.wikimedia.org\/wikipedia\/en\/3\/3b\/Movie_poster_i_robot.jpg",
            "price": 4.99,
            "stock": 15
        }],
        "pagination": {
            "page": 1,
            "count": 3
        }
    };
    $scope.products = json.data;
    $scope.query = '';
    $scope.minPrice = 1;
    $scope.maxPrice = 20;
    $scope.cart = {
        'products': [],
        'total': 0
    };
    $scope.showCart = false;

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
};