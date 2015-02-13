
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

    // An alternative method to listen to variable changes,
    // rather than calling functions from the HTML.
    $scope.$watch('minPrice', function() {
       // $scope.updateResults();
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
};