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

        // Gửi yêu cầu đặt hàng lên server
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
            alert("Đặt hàng thành công!");

            // Xóa dữ liệu trong giỏ hàng
            clearCart();

            // Chuyển hướng người dùng về trang mua sắm
            window.location.href = "/product/list";
          })
          .catch(function (error) {
            console.error("Đã xảy ra lỗi khi đặt hàng:", error);
            alert("Đã xảy ra lỗi khi đặt hàng!");
            console.log("Data to be sent:", JSON.stringify(orderData));
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  // var productIdfb = 1;

  // $http
  //   .get("http://localhost:8080/rest/feedbacks/" + productIdfb)
  //   .then(function (response) {
  //     // Gán dữ liệu phản hồi cho $scope.feedbacks
  //     $scope.feedbacks = response.data;
  //     console.log("Data received:", $scope.feedbacks);
  //   })
  //   .catch(function (error) {
  //     // Xử lý lỗi nếu có
  //     console.error("Error fetching feedbacks:", error);
  //   });

    // $http.get('http://localhost:8080/rest/feedbacks')
    // .then(function (response) {
    //     // Gán dữ liệu phản hồi cho $scope.feedbacks
    //     $scope.feedbacks = response.data;
    //     console.log("Data received:", $scope.feedbacks);

    //     // Tính toán số lượng đánh giá cho mỗi số sao
    //     var ratings = {};
    //     $scope.feedbacks.forEach(function(feedback) {
    //         if (ratings[feedback.rate]) {
    //             ratings[feedback.rate]++;
    //         } else {
    //             ratings[feedback.rate] = 1;
    //         }
    //     }); 

    //     // Hiển thị số lượng đánh giá cho mỗi số sao trên giao diện
    //     $scope.ratings = [];
    //     for (var i = 5; i >= 1; i--) {
    //         var ratingCount = ratings[i] || 0;
    //         $scope.ratings.push({
    //             stars: i,
    //             count: ratingCount
    //         });
    //     }
    // })
    // .catch(function (error) {
    //     // Xử lý lỗi nếu có
    //     console.error('Error fetching feedbacks:', error);
    // });
    // $http.get('http://localhost:8080/rest/feedbacks')
    //     .then(function (response) {
    //         // Gán dữ liệu phản hồi cho $scope.feedbacks
    //         $scope.feedbacks = response.data;
    //         console.log("Data received:", $scope.feedbacks);

    //         // Tính tổng số điểm đánh giá
    //         var totalRating = $scope.feedbacks.reduce(function(total, feedback) {
    //             return total + feedback.rate;
    //         }, 0);

    //         // Tính điểm đánh giá trung bình
    //         $scope.averageRating = totalRating / $scope.feedbacks.length;
    //     })
    //     .catch(function (error) {
    //         // Xử lý lỗi nếu có
    //         console.error('Error fetching feedbacks:', error);
    //     });

  function clearCart() {
    localStorage.removeItem("cart");
  }

  $scope.cart.loadFromLocalStorage();
});

// async function getFeedbacks() {
//     const response = await fetch('http://localhost:8080/rest/feedbacks');
//     const dataItems = await response.json();
//     console.log(dataItems);
// }
