let host = "http://localhost:8080/rest/";
const app = angular.module("app", []);

app.controller("ctrl", function ($scope, $http, $timeout) {
  $scope.form = {};
  $scope.accounts = [];
  $scope.items = [];

  $scope.reset = function () {
    $scope.form = {};
    $scope.key = null;
  };

  async function getDataAccounts() {
    const response = await fetch("http://localhost:8080/rest/accounts");

    const data = await response.json();
    console.log(data);

    data.forEach((account) => {
      account.fullname = account.firstName + " " + account.lastName;
    });

    if (!$.fn.DataTable.isDataTable("#accountTable")) {
      $("#accountTable").DataTable({
        data: data,
        columns: [
          { data: "id" },
          { data: "username" },
          { data: "email" },
          { data: "fullname" },
          { data: "address" },
          {
            data: "ban",
            render: function (data, type, row, meta) {
              var id = row.id;
              var checkedAttribute = data ? "checked" : "";

              return (
                '<label class="toggleBtn">' +
                '<input type="checkbox" id="checkbox_' +
                id +
                '" ' +
                checkedAttribute +
                " >" +
                '<span class="slider">' +
                '<i class="fas fa-power-off toggle-text"></i>' +
                "</span>" +
                "</label>"
              );
            },
          },
          {
            render: function (data, type, row, meta) {
              return `<div id="editButton" th:value="${row.id}" class="btn btn-success" >Chỉnh Sửa</div>
                    <div id="deleteButton" onclick="deleteAccount(${row.id})" class="btn btn-danger">Xoá</div>
                    `;
            },
          },
        ],
        pageLength: 10,
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
      $("#accountTable").DataTable().clear().rows.add(data).draw();
    }
  }

  getDataAccounts();
});

// update trạng thai ban của account
$(document).ready(function () {
  var modalOpen = false;

  $("#accountTable").on("click", 'input[type="checkbox"]', function () {
    var checkbox = $(this);
    var previousState = checkbox.prop("checked");
    var id = checkbox.attr("id").replace("checkbox_", "");

    $("#confirmationModal").modal("show");
    modalOpen = true;

    var message = previousState
      ? "Bạn có chắc chắn muốn khóa tài khoản này không?"
      : "Bạn có chắc chắn muốn mở tài khoản này không?";
    $("#confirmMessage").text(message);

    $("#confirmYes").click(function () {
      checkbox.prop("disabled", true);

      var isChecked = checkbox.prop("checked");

      $.ajax({
        url: "http://localhost:8080/rest/updateBanAccount/" + id,
        method: "put",
        data: { id: id, ban: isChecked },
        success: function (response) {
          console.log("Dữ liệu đã được cập nhật thành công!");
          checkbox.prop("disabled", false);
          $("#confirmationModal").modal("hide");
          modalOpen = false;
        },
        error: function (xhr, status, error) {
          console.error("Lỗi: " + error);
          checkbox.prop("disabled", false);
          $("#confirmationModal").modal("hide");
          modalOpen = false;
        },
      });
    });

    // Hủy bỏ việc cập nhật và đóng modal
    $("#confirmNo, .close").click(function () {
      $("#confirmationModal").modal("hide");
      modalOpen = false;
    });
  });

  // Xử lý sự kiện khi modal được mở hoặc đóng
  $("#confirmationModal").on("shown.bs.modal", function () {
    modalOpen = true;
  });

  $("#confirmationModal").on("hidden.bs.modal", function () {
    modalOpen = false;
  });

  $(window).on("beforeunload", function () {
    if (modalOpen) {
      return "Modal đang mở. Bạn có chắc chắn muốn rời khỏi trang này không?";
    }
  });
});

// Xử lý sự kiện chỉnh sửa
$(document).ready(function () {
  $("body").on("click", "#editButton", function () {
    var accountId = $(this).attr("th:value");
    $.ajax({
      url: "http://localhost:8080/rest/accounts/" + accountId,
      method: "GET",
      success: function (response) {
        $("#accountId").val(response.id);
        $("#username").val(response.username);
        $("#email").val(response.email);
        $("#password").val(response.password);
        $("#firstName").val(response.firstName);
        $("#lastName").val(response.lastName);
        $("#address").val(response.address);

        $("#accountModal").modal("show");
      },
      error: function (xhr, status, error) {
        console.error("Lỗi khi lấy thông tin tài khoản:", error);
      },
    });
  });
});


function deleteAccount(id) {
  $.ajax({
    url: "http://localhost:8080/rest/deleteAccounts/" + id,
    method: "DELETE",
    success: function (response) {
      console.log("Đã xoá tài khoản thành công!");
      getDataAccounts();
    },
    error: function (xhr, status, error) {
      console.error("Lỗi khi xoá tài khoản:", error);
    },
  });
}
async function updateAccount(id) {
  var id = document.getElementById("accountId").value;
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var address = document.getElementById("address").value;
  var password = document.getElementById("password").value;

  if (!username || !email || !firstName || !lastName || !address) {
    alert("Vui lòng điền đầy đủ thông tin vào các trường!");
    return;
  }

  try {
    let requestBody = {
      id: id,
      username: username,
      email: email,
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

async function addNewUser() {
  try {
    const username = document.getElementById("newUsername").value;
    const email = document.getElementById("newEmail").value;
    const password = document.getElementById("newPassword").value;
    const firstName = document.getElementById("newFirstName").value;
    const lastName = document.getElementById("newLastName").value;
    const address = document.getElementById("newAddress").value;

    // const roles = document.getElementById("roles").value;


    if (
      !username ||
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !address
    ) {
      alert("Vui lòng điền đầy đủ thông tin vào các trường!");
      return;
    }

    if (!isValidEmail(email)) {
        alert("Địa chỉ email không hợp lệ. Vui lòng nhập đúng định dạng.");
        return;
    }

    const response = await fetch("http://localhost:8080/rest/accounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        address: address,
      }),
    });

    if (response.ok) {
      const responseData = await response.json();
      // const addedUserId = responseData.id; 

      // const setRole = await fetch(`http://localhost:8080/rest/authority`, {
      //   method: 'POST',
      //   body: Json.stringify({
      //     roleID: roles,
      //     authority: "ROLE_USER"
      //   })

      console.log("User created successfully:", addedUsername);
      
      
      Swal.fire({
        title: "Người dùng mới được thêm thành công!",
        html: `Tên người dùng <strong>${addedUsername}</strong> đã được thêm mới thành công!`,
        icon: "success",
      });

      document.getElementById("newUsername").value = "";
      document.getElementById("newEmail").value = "";
      document.getElementById("newPassword").value = "";
      document.getElementById("newFirstName").value = "";
      document.getElementById("newLastName").value = "";
      document.getElementById("newAddress").value = "";
      
    } else {
      console.error("Failed to create user");
    }
  } catch (error) {
    console.error("Error during user creation:", error);
  }
}

function isValidEmail(newEmail) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(newEmail);
}
