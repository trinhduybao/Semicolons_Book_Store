let host = "http://localhost:8080/rest/";
const app = angular.module("app", []);

app.controller("ctrl-managerVoucher", function ($scope, $http, $timeout) {
  $scope.form = {};
  $scope.accounts = [];
  $scope.items = [];

  $scope.reset = function () {
    $scope.form = {};
    $scope.key = null;  
  };

  async function getDataManagerVoucher() {
    const response = await fetch('http://localhost:8080/rest/voucherManager');
    const data = await response.json();
    console.log(data);

    if (!$.fn.DataTable.isDataTable('#managervoucherTable')) {
        $('#managervoucherTable').DataTable({
            "data": data,
            "columns": [
                {"data": "id"},
                {"data": "code"},
                {"data": "discountAmount"},
                {"data": "condition"},
                {
                    "data": "validFrom",
                    "render": function (data) {
                        return moment(data).format('HH:mm:ss , DD-MM-YYYY');
                    }
                },    
                {
                    "data": "validTo",
                    "render": function (data) {
                        return moment(data).format('HH:mm:ss , DD-MM-YYYY');
                    }
                },              
                {"data": "createDate"},
                {"render" : function(data, type, row, meta) {
                    return `<div id="editButton" type="submit" th:value="${row.id}" class="btn btn-success" >Chỉnh Sửa</div>
                            <div id="deleteButton" type="submit" type="submit" th:value="${row.id}" onclick="deleteVoucherManager(${row.id})" class="btn btn-danger"">Xoá</div>`
                }}
            ],
            "scrollX": true, 
            "scrollCollapse": true, 
            "pageLength": 10,
            "language": {
                "info": "Hiển thị _START_ đến _END_ trong _TOTAL_ mục",
                "infoEmpty": "Không có sản phẩm nào",
                "infoFiltered": "(được lọc từ tổng số _MAX_ mã giảm giá )",
                "lengthMenu": "Hiện _MENU_ mã giảm giá" ,
                "search": "Tìm kiếm:", 
                "zeroRecords": "Không tìm thấy kết quả",
                "paginate": {
                    "previous": "Trước",
                    "next": "Sau",
                }
                
            }
        });
    } else {
        $('#managervoucherTable').DataTable().clear().rows.add(data).draw();
    }
}



getDataManagerVoucher();


});


// edit
$(document).ready(function() {
    $('body').on('click', '#editButton', function() {
        var voucherId = $(this).attr('th:value'); 
        $.ajax({
            url: 'http://localhost:8080/rest/voucherManager/' + voucherId,
            method: 'GET',

            success: function(response) {
                $('#id').val(response.id);
                $('#code').val(response.code);
                $('#condition').val(response.condition);
                $('#discountAmount').val(response.discountAmount);
                $('#validFrom').val(response.validFrom);
                $('#validTo').val(response.validTo);
                $('#createDate').val(response.createDate);
                
            
                $('#exampleModal').modal('show');

        console.log(response);

            },
            error: function(xhr, status, error) {
                console.error('Lỗi khi lấy thông tin sản phẩm:', error);

            }
        });
    });
});

async function createOrUpdateVoucher() {
    try {
        const responseVoucher = await fetch(`http://localhost:8080/rest/voucherManager`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: document.getElementById("code").value,
                discountAmount: document.getElementById("discountAmount").value,
                condition: document.getElementById("condition").value,
                validFrom: document.getElementById("validFrom").value,
                validTo: document.getElementById("validTo").value,
                createDate: document.getElementById("createDate").value
            })
        });

        if (responseVoucher.ok) {
            console.log("Voucher created or updated successfully");
            Swal.fire({
                title: "Thành công!",
                text: "Voucher đã được tạo hoặc cập nhật thành công.",
                icon: "success"
            }).then(() => {
                window.location.reload();
            });
        } else {
            console.error("Failed to create or update voucher", responseVoucher);
            alert("Đã xảy ra lỗi khi tạo hoặc cập nhật voucher");
        }
    } catch (error) {
        console.error('Error during create or update request:', error);
    }
}
async function updateVoucher(id) {
    var id = document.getElementById("id").value;

    try {
        const responseVoucher = await fetch(`http://localhost:8080/rest/voucherManager/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                code: document.getElementById("code").value,
                discountAmount: document.getElementById("discountAmount").value,
                condition: document.getElementById("condition").value,
                validFrom: document.getElementById("validFrom").value,
                validTo: document.getElementById("validTo").value,
                createDate: document.getElementById("createDate").value
            })
        });

        if (responseVoucher.ok) {
            console.log("Voucher updated successfully");
            Swal.fire({
                title: "Thành công!",
                text: "Voucher đã được cập nhật thành công.",
                icon: "success"
            }).then(() => {
                window.location.reload();
            });
        } else {
            console.error("Failed to update voucher", responseVoucher);
            alert("Đã xảy ra lỗi khi cập nhật voucher");
        }
    } catch (error) {
        console.error('Error during update request:', error);
        Swal.fire({
            title: "Lỗi!",
            text: "Đã xảy ra lỗi khi cập nhật voucher. Vui lòng thử lại sau.",
            icon: "error"
        });
    }
}


async function deleteVoucherManager(id) {
    try {
        const shouldDelete = await Swal.fire({
            title: "Xác nhận xoá",
            text: "Bạn có chắc muốn xoá voucher này?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Xoá",
            cancelButtonText: "Hủy",
        });

        if (shouldDelete.isConfirmed) {
            const response = await fetch(`http://localhost:8080/rest/deletevoucherManager/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                console.log(`Voucher with ID ${id} deleted successfully`);
                await Swal.fire({
                    title: 'Xoá thành công!',
                    text: 'Voucher đã được xoá thành công.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                window.location.reload();
            } else {
                await Swal.fire({
                    title: 'Xoá thất bại!',
                    text: 'Voucher này không được xoá.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                console.error(`Failed to delete category with ID ${id}`);
            }
        }
    } catch (error) {
        console.error('Error during delete request:', error);
    }
}

async function deleteVoucherManagerFormForm(id) {
    var id = document.getElementById("id").value;

    if (id) {
        deleteVoucherManager(id);
    } else {
        console.error('ID is undefined or empty.');
    }
};


  function validateForm() {
    var code = document.getElementById("code").value;
    var condition = document.getElementById("condition").value;
    var discountAmount = document.getElementById("discountAmount").value;
    var validFrom = document.getElementById("validFrom").value;
    var validTo = document.getElementById("validTo").value;
    var createDate = document.getElementById("createDate").value;

    
    var today = new Date().toISOString().split('T')[0]; // Lấy ngày hôm nay


    codeError.innerHTML = "";
    conditionError.innerHTML = "";
    discountAmountError.innerHTML = "";
    validFromError.innerHTML = "";
    validFromError.innerHTML = "";
    validToError.innerHTML = "";
    createDateError.innerHTML = "";

    var isValid = true;

    // Kiểm tra mỗi trường và hiển thị thông báo lỗi nếu cần
    if (code.trim() === "") {
        codeError.innerHTML = "Vui lòng nhập mã khuyến mãi.";
        isValid = false;
    }

    if (condition.trim() === "") {
        conditionError.innerHTML = "Vui lòng nhập điều kiện giảm giá.";
        isValid = false;
    } else if (isNaN(condition)) {
        conditionError.innerHTML = "Điều kiện giảm giá phải là một số.";
        isValid = false;
    } else if(parseFloat(condition) < 0) {
        conditionError.innerHTML = "Điều kiện giảm giá không được là số âm.";
        isValid = false;
    }
    if (discountAmount.trim() === "") {
        discountAmountError.innerHTML = "Vui lòng nhập phần trăm khuyến mãi.";
        isValid = false;
    } else if (isNaN(discountAmount)) {
        discountAmountError.innerHTML = "Phần trăm khuyến mãi phải là một số.";
        isValid = false;
    } else if (parseFloat(discountAmount) <= 0 || parseFloat(discountAmount) >= 100) {
        discountAmountError.innerHTML = "Phần trăm khuyến mãi phải nằm trong khoảng từ 1 đến 99.";
        isValid = false;
    }
    
    if (validFrom.trim() === "") {
        validFromError.innerHTML = "Vui lòng nhập ngày bắt đầu.";
        isValid = false;
    } else if (validFrom < today) {
        validFromError.innerHTML = "Ngày bắt đầu phải trước hoặc bằng ngày hôm nay.";
        isValid = false;
    }
    if (validTo.trim() === "") {
        validToError.innerHTML = "Vui lòng chọn ngày kết thúc.";
        isValid = false;
    } else if (validTo < today) {
        validToError.innerHTML = "Ngày kết thúc phải trước hoặc bằng ngày hôm nay.";
        isValid = false;
    }

    if (createDate.trim() === "") {
        createDateError.innerHTML = "Vui lòng chọn ngày tạo mã.";
        isValid = false;
    } else {
        var selectedDate = new Date(createDate);
        var today = new Date();
        var todayString = today.toISOString().slice(0, 16); // Lấy ngày hôm nay dưới dạng chuỗi yyyy-mm-dd
        var selectedDateString = selectedDate.toISOString().slice(0, 16); // Lấy ngày được chọn dưới dạng chuỗi yyyy-mm-dd
    
        if (selectedDateString !== todayString) {
            createDateError.innerHTML = "Ngày tạo mã phải là ngày hôm nay.";
            isValid = false;
        }
    }if (createDate.trim() === "") {
        createDateError.innerHTML = "Vui lòng chọn ngày tạo mã.";
        isValid = false;
    } else {
        var selectedDate = new Date(createDate);
        var today = new Date();
        var todayString = today.toISOString().slice(0, 16); // Lấy ngày hôm nay dưới dạng chuỗi yyyy-mm-dd
        var selectedDateString = selectedDate.toISOString().slice(0, 16); // Lấy ngày được chọn dưới dạng chuỗi yyyy-mm-dd
    
        if (selectedDateString !== todayString) {
            createDateError.innerHTML = "Ngày tạo mã phải là ngày hôm nay.";
            isValid = false;
        }
    }

    return isValid;
}
  