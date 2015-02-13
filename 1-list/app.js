
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

    $scope.showDetails = function(item) {
        $scope.selectedProduct = item;
    };
};