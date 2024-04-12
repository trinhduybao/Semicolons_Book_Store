const app = angular.module("checkout-cart-app", []);

app.controller("checkout-cart-ctrl", function($scope, $http) {
    $scope.cart = {
        items: [],
        add(id) {
            // Kiểm tra id sản phẩm hợp lệ
            if (!id) {
                console.error("ID sản phẩm không hợp lệ");
                return;
            }

            var item = this.items.find(item => item.id == id);
            if (item) {
                // Kiểm tra hợp lệ về số lượng sản phẩm
                if (item.qty < item.maxQty) { // Giả sử maxQty là số lượng tối đa của sản phẩm
                    item.qty++;
                    this.saveToLocalStorage();
                } else {
                    console.error("Số lượng sản phẩm đã vượt quá số lượng tối đa");
                }
            } else {
                $http.get(`/rest/products/${id}`).then(resp => {
                    if (resp.data) {
                        resp.data.qty = 1;
                        console.log(resp.data);
                        this.items.push(resp.data);
                        this.saveToLocalStorage();
                    } else {
                        console.error("Không tìm thấy sản phẩm với ID đã cung cấp");
                    }
                }).catch(error => {
                    console.error("Lỗi khi lấy thông tin sản phẩm từ máy chủ:", error);
                });
            }
        },
        remove(id) {
            var index = this.items.findIndex(item => item.id == id);
            this.items.splice(index, 1);
            this.saveToLocalStorage();
        },
        clear() {
            this.items = [];
            this.saveToLocalStorage();
        },
        amt_of(item) {},
        get count() {
            return this.items.map(item => item.qty).reduce((total, qty) => total += qty, 0);
        },
        get count() {
            return this.items.map(item => item.qty * item.price).reduce((total, qty) => total += qty, 0);
        },
        saveToLocalStorage() {
            var json = JSON.stringify(angular.copy(this.items));
            localStorage.setItem("cart", json);
        },
        loadFromLocalStorage() {
            var json = localStorage.getItem("cart");
            this.items = json ? JSON.parse(json) : [];
        }
    };

    $scope.address = "123 asd"; // Khai báo biến address và gán giá trị mặc định
    $scope.voucherId = 1; // Khai báo biến voucherId và gán giá trị mặc định
    $scope.id = 1; // Khai báo biến id và gán giá trị mặc định
    
$scope.placeOrder = function() {
    var currentDate = new Date(); // Tạo một đối tượng Date mới, đại diện cho thời gian hiện tại
var currentDateTime = currentDate.toISOString(); // Chuyển đổi đối tượng Date thành chuỗi ISO để lấy cả ngày và giờ

    var orderData = {
        orderDate: currentDateTime, // Sử dụng thời gian hiện tại đã được chuyển đổi thành chuỗi
        totalAmount: $scope.cart.count,
        status: "Đã đặt hàng",
        address: $scope.address,
        voucherId: $scope.voucherId,
        accountId: $scope.id
    };
    

    $http.post('http://localhost:8080/rest/place-order', orderData)
        .then(function(response) {
            console.log("Đặt hàng thành công:", response.data);
            alert("Đặt hàng thành công!");
        })
        .catch(function(error) {
            console.error("Đã xảy ra lỗi khi đặt hàng:", error);
            alert("Đã xảy ra lỗi khi đặt hàng!");
        });
};



    $scope.cart.loadFromLocalStorage();
});


fetch('/current')
    .then(response => response.json())
    .then(user => {
        // Xử lý dữ liệu người dùng
        console.log(user);
    })
    .catch(error => {
        console.error('Error:', error);
    });



