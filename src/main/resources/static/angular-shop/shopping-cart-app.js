const app = angular.module("shopping-cart-app", []);
app.controller("shopping-cart-ctrl", function($scope, $http){
    $scope.cart = {
		items: [],
		add(id) {
			var item = this.items.find(item => item.id == id);
			if (item) {
				item.qty++;
				this.savaToLocalStorage();
			} else {
				$http.get(`/rest/products/${id}`).then(resp => {
					resp.data.qty = 1;
					console.log(resp.data);
					this.items.push(resp.data);
					this.savaToLocalStorage();
				})
			}
		},//thêm sản phẩm
		remove(id) {
			var index = this.items.findIndex(item => item.id == id);
			this.items.splice(index, 1);
			this.savaToLocalStorage();
		},//xoá sản phẩm
		clear() {
			this.items = [];
			this.savaToLocalStorage();
		},//làm sạch giỏ hàng
		amt_of(item) { },//tính tổng tiền 1 sản phẩm
		get count() {
			return this.items
				.map(item => item.qty)
				.reduce((total, qty) => total += qty, 0);
		},//tính số lượng mặt hàng trong giỏ
		get mount() {
			return this.items
				.map(item => item.qty * item.price)
				.reduce((total, qty) => total += qty, 0);
		},//tổng tiền tất cả
		savaToLocalStorage() {
			var json = JSON.stringify(angular.copy(this.items));
			localStorage.setItem("cart", json);
		},//lưu vào local
		loadFromLocalStorage() {
			var json = localStorage.getItem("cart");
			this.items = json ? JSON.parse(json) : [];
		}
	}
	$scope.cart.loadFromLocalStorage();
})