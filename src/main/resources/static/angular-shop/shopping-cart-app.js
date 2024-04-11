const app = angular.module("shopping-cart-app", []);

app.controller("shopping-cart-ctrl", function($scope, $http) {
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
        get mount() {
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

    $scope.cart.loadFromLocalStorage();
});
