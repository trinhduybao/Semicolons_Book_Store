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
            window.location.reload();
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

        const responseVoucher = await fetch(`http://localhost:8080/rest/voucherManager/` + id , {
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
        console.log(responseVoucher);

        if (responseVoucher.ok) {   
            console.log("Voucher updated successfully");
            window.location.reload();
        } else {
            console.error("Failed to update voucher", responseVoucher);
            alert("Đã xảy ra lỗi khi cập nhật voucher");
        }
    } catch (error) {
        console.error('Error during update request:', error);
    }
}



async function deleteVoucherManager(id) {
   
    try {
        const response = await fetch(`http://localhost:8080/rest/deletevoucherManager/${id}`, {
            method: 'DELETE'
        });
  
        if (response.ok) {
            console.log(`Voucher with ID ${id} deleted successfully`);

      window.location.reload();
  
        } else {
            console.error(`Failed to delete vourcher with ID ${id}`);
        }
    } catch (error) {
        console.error('Error during delete request:', error);
    }
  }
  async function deleteVoucherManagerFormForm(id) {
      
    var id = document.getElementById("id").value;

  
    if (id) {
        deleteVoucherManager(id);
      window.location.reload();
  
  } else {
      console.error('ID is undefined or empty.');
  }
  };
  