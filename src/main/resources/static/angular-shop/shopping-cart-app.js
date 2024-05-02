const app = angular.module("shopping-cart-app", []);
app.controller("shopping-cart-ctrl", function ($scope, $http) {
 
  
  $scope.cart = {
    items: [],
    add(id) {
      var item = this.items.find((item) => item.id == id);
      if (item) {
        item.qty++;
        this.savaToLocalStorage();
      } else {
        $http.get(`/rest/products/${id}`).then((resp) => {
          resp.data.qty = 1;
          console.log(resp.data);
          this.items.push(resp.data);
          this.savaToLocalStorage();
        });
      }
    }, //thêm sản phẩm
    remove(id) {
      var index = this.items.findIndex((item) => item.id == id);
      this.items.splice(index, 1);
      this.savaToLocalStorage();
    }, //xoá sản phẩm
    clear() {
      this.items = [];
      this.savaToLocalStorage();
    }, //làm sạch giỏ hàng
    amt_of(item) {}, //tính tổng tiền 1 sản phẩm
    get count() {
      return this.items
        .map((item) => item.qty)
        .reduce((total, qty) => (total += qty), 0);
    }, //tính số lượng mặt hàng trong giỏ
    get mount() {
      return this.items
        .map((item) => item.qty * item.price)
        .reduce((total, qty) => (total += qty), 0);
    }, //tổng tiền tất cả
    savaToLocalStorage() {
      var json = JSON.stringify(angular.copy(this.items));
      localStorage.setItem("cart", json);
    }, //lưu vào local
    loadFromLocalStorage() {
      var json = localStorage.getItem("cart");
      this.items = json ? JSON.parse(json) : [];
    },
  };
  $scope.placeOrder = function () {
    // Sử dụng fetch API để lấy thông tin tài khoản và địa chỉ từ máy chủ
    fetch("/current")
      .then((response) => response.json())
      .then((user) => {
        // Lấy thông tin tài khoản và địa chỉ từ dữ liệu user
        var accountId = user.id;
        var address = user.address.address;
  
        // Tạo dữ liệu đơn hàng
        var currentDate = new Date();
        var formattedDate = currentDate
          .toISOString()
          .slice(0, 19)
          .replace("T", " ");
  
        var cartItems = JSON.parse(localStorage.getItem("cart"));
  
        var productList = cartItems.map(function (item) {
          return {
            count: item.count,
            productId: item.id,
            quantity: item.qty,
            count: item.price,
          };
        });
  
        console.log(productList);
  
        var orderData = {
          orderDate: formattedDate,
          totalAmount: $scope.cart.mount,
          status: "Đã đặt hàng",
          address: address,
          voucherId: $scope.voucherId,
          accountId: accountId,
          items: productList,
        };
  
        $http
          .post(
            "http://localhost:8080/rest/place-order",
            JSON.stringify(orderData),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(function (response) {
            console.log("Đặt hàng thành công:", response.data);

            cartItems.forEach(function (item) {
              var productId = item.id;
              var newQuantity = item.quantity - item.qty;
              console.log("newQuantity: ", newQuantity);
              $http.put("http://localhost:8080/rest/update-stock/" + productId + "?newQuantity=" + newQuantity)
              .then(function (response) {
                console.log("Cập nhật trạng thái đơn hàng thành công");
              })
              .catch(function (error) {
                console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
              });          
            });
              

            Swal.fire({
              icon: "success",
              title: "Đặt hàng thành công",
              text: "Cảm ơn bạn đã đặt hàng!",
            }).then(() => {
              clearCart();
  
              window.location.href = "/product/list";
            });
          })
          .catch(function (error) {
            console.error("Đã xảy ra lỗi khi đặt hàng:", error);
            Swal.fire({
              icon: "error",
              title: "Đã xảy ra lỗi",
              text: "Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sau.",
            });
            console.log("Data to be sent:", JSON.stringify(orderData));
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  

   $scope.fetchOrderDetails = function(event) {
    var orderId = event.currentTarget.getAttribute('value');

    $http.get('http://localhost:8080/rest/orderDetail/order/' + orderId)
        .then(function(response) {
          console.log("Order ID:", orderId);

            var orderDetails = response.data;
            var orderDetailsHtml = '';

            console.log(orderDetails);

            orderDetails.forEach(function(orderDetail, index) {
              orderDetailsHtml += `
                  <div class="order-detail">
                      <p><strong>Sản phẩm ${index + 1}:</strong> ${orderDetail.product.name}</p>
                      <img src="/customer/img/books/${orderDetail.product.thumbnailImage}" alt="Thumbnail Image" style="width: 100px; height: auto;" />
                      <p><strong>Số lượng:</strong> ${orderDetail.quantity}</p>
                      <p><strong>Giá:</strong> ${orderDetail.price}</p>
                      <!-- Thêm các thông tin khác của sản phẩm nếu cần -->
                  </div>
              `;
          });

            $('#orderDetailsModal .modal-body').html(orderDetailsHtml);
            $('#orderDetailsModal').modal('show');
        })
        .catch(function(error) {
            console.error('Error fetching order details:', error);
        });

        
};






  function clearCart() {
    localStorage.removeItem("cart");
  }

  $scope.cart.loadFromLocalStorage();
});



async function updateAccountt(id) {
  var id = document.getElementById("id").value;
  var email = document.getElementById("email").value;
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var address = document.getElementById("address").value;

  if (!email || !firstName || !lastName || !address) {
    alert("Vui lòng điền đầy đủ thông tin vào các trường!");
    return;
  }

  try {
    let requestBody = {
      id: id,
      email: email,
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      address: address,
    };

    if (confirm("Bạn có chắc chắn muốn cập nhật tài khoản không?")) {
      const responseAccount = await fetch(
        `http://localhost:8080/rest/accounts/` + id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (responseAccount.ok) {
        console.log("Account updated successfully");
        window.location.reload();
      } else {
        console.error("Failed to update account", responseAccount);
        alert("Đã xảy ra lỗi khi cập nhật tài khoản");
      }
    }
  } catch (error) {
    console.error("Error during update request:", error);
  }
}
