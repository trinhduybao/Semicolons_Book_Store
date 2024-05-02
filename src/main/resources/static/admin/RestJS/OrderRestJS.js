// let host = "http://localhost:8080/rest/";
// const app = angular.module("app", []);

// app.controller("ctrl-orders", function ($scope, $http, $timeout) {
//   $scope.form = {};
//   $scope.accounts = [];
//   $scope.items = [];

//   $scope.reset = function () {
//     $scope.form = {};
//     $scope.key = null;
//   };

async function getDataOrders() {
  const response = await fetch("http://localhost:8080/rest/orders");
  const data = await response.json();
  console.log(data);

  data.forEach((orders) => {
    orders.fullname = orders.account.firstName + " " + orders.account.lastName;
  });

  if (!$.fn.DataTable.isDataTable("#orderTable")) {
    $("#orderTable").DataTable({
      data: data,
      columns: [
        { data: "id" },
        {
          data: "orderDate",
          render: function (data) {
            return moment(data).format("     DD-MM-YYYY");
          },
        },
        { data: "totalAmount" },
        { data: "address" },
        {
          data: "voucher.discountAmount",
          defaultContent: "<b>Không giảm giá</b>",
        },
        { data: "fullname" },
        { data: "status" },
        {
          render: function (data, type, row, meta) {
            return `<div id="editButton" onclick="getOrderDetails(${row.id})" th:value="${row.id}" class="btn btn-success" >Chỉnh Sửa</div>
                           
                            `;
            // <div id="cancelButton" onclick="cancelOrder(${row.id})" th:value="${row.id}"class="btn btn-danger">Huỷ</div>
          },
        },
      ],
      scrollX: true,
      scrollCollapse: true,
      pageLength: 5,
      language: {
        info: "Hiển thị _START_ đến _END_ trong _TOTAL_ mục",
        infoEmpty: "Không có sản phẩm nào",
        infoFiltered: "(được lọc từ tổng số _MAX_ sản phẩm )",
        lengthMenu: "Hiện _MENU_ sản phẩm",
        search: "Tìm kiếm:",
        zeroRecords: "Không tìm thấy kết quả",
        paginate: {
          previous: "Trước",
          next: "Sau",
        },
      },
    });
  } else {
    $("#orderTable").DataTable().clear().rows.add(data).draw();
  }
}

function getOrderDetails(id) {
  $.ajax({
    url: "/rest/orders/" + id,
    method: "GET",
    success: function (response) {
      if (response) {
        $("#orderId").val(response.id);
        $("#statusOrder").val(response.status);
        $("#ngayDatHang").val(response.orderDate);
        $("#tongTien").val(response.totalAmount);
        $("#diaChi").val(response.address);
        $("#giamGia").val(response.voucher);
        $("#nguoiMua").val(response.account.lastName);
        console.log(response);
      } else {
        console.error("Không tìm thấy đơn hàng");
      }
    },
    error: function (xhr, status, error) {
      console.error("Lỗi khi lấy thông tin đơn hàng:", error);
    },
  });
}

// Hàm xử lý khi nhấn nút "Nhận"
$("#nhanButton").on("click", function (event) {
  event.preventDefault();
  var orderId = document.getElementById("orderId").value;
  var currentStatus = document.getElementById("statusOrder").value;

  var nextStatus;

  if (currentStatus === "Đã đặt hàng") {
    nextStatus = "Người bán đang chuẩn bị hàng";
  } else if (currentStatus === "Người bán đang chuẩn bị hàng") {
    nextStatus = "Đang vận chuyển";
  } else if (currentStatus === "Đang vận chuyển") {
    nextStatus = "Đã giao hàng";
  }

  if (currentStatus === "Đã huỷ") {
    Swal.fire({
      icon: "error",
      title: "Huỷ đơn hàng thất bại",
      text: "Đơn hàng đã được huỷ trước đó!",
    });
    return;
  }

  Swal.fire({
    icon: "success",
    title: "Xác nhận đơn hàng",
    text: "Bạn có chắc chắn muốn xác nhận đơn hàng?",
    showCancelButton: true,
    confirmButtonText: "Xác nhận",
    cancelButtonText: "Huỷ",
  }).then((result) => {
    if (result.isConfirmed) {
      updateOrderStatus(orderId, nextStatus);
      Swal.fire({
        icon: "success",
        title: "Cập nhật trạng thái thành công",
        html: "Trạng thái đơn hàng đã <b>" + nextStatus + "</b> được cập nhật thành công!",
      });
    }
  });
});

// Hàm xử lý khi nhấn nút "Huỷ"
$("#huyButton").on("click", function (event) {
  event.preventDefault();
  var orderId = document.getElementById("orderId").value;
  var currentStatus = document.getElementById("statusOrder").value;

  if (currentStatus === "Đã huỷ") {
    Swal.fire({
      icon: "error",
      title: "Huỷ đơn hàng thất bại",
      text: "Đơn hàng đã được huỷ trước đó!",
    });
    return;
  }

  Swal.fire({
    icon: "warning",
    title: "Huỷ đơn hàng",
    text: "Bạn có chắc chắn muốn huỷ đơn hàng?",
    showCancelButton: true,
    confirmButtonText: "Xác nhận",
    cancelButtonText: "Không, giữ nguyên",
  }).then((result) => {
    if (result.isConfirmed) {
      updateOrderStatus(orderId, "Đã huỷ");

      Swal.fire({
        icon: "success",
        title: "Huỷ đơn hàng thành công",
        text: "Đơn hàng đã được huỷ thành công!",
      });
    }
  });
});

function updateOrderStatus(orderId, newStatus) {
  $.ajax({
    url: "http://localhost:8080/rest/orderStatus/" + orderId,
    method: "PUT",
    data: { status: newStatus },
    success: function (response) {
      console.log("Cập nhật trạng thái đơn hàng thành công");
      window.setTimeout(function () {
        location.reload();
      }, 2000);
    },
    error: function (xhr, status, error) {
      console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
    },
  });
}
// Hàm xử lý khi nhấn nút "Huỷ"
function cancelOrder(orderId) {
  // var table = $('#orderTable').DataTable();
  // var rowData = table.row('#' + orderId).data();

  // if (!rowData) {
  //     console.error("Không tìm thấy hàng với orderId: " + orderId);
  //     return;
  // }

  // var currentStatus = rowData.status;

  // if (currentStatus === "Đã huỷ") {
  //     Swal.fire({
  //         icon: 'error',
  //         title: 'Huỷ đơn hàng thất bại',
  //         text: 'Đơn hàng đã được huỷ trước đó!',
  //     });
  //     return;
  // }

  Swal.fire({
    icon: "warning",
    title: "Huỷ đơn hàng",
    text: "Bạn có chắc chắn muốn huỷ đơn hàng?",
    showCancelButton: true,
    confirmButtonText: "Xác nhận",
    cancelButtonText: "Không, giữ nguyên",
  }).then((result) => {
    if (result.isConfirmed) {
      updateOrderStatus(orderId, "Đã huỷ");
      Swal.fire({
        icon: "success",
        title: "Huỷ đơn hàng thành công",
        text: "Đơn hàng đã được huỷ thành công!",
      });
    }
  });
}

getDataOrders();

// });
