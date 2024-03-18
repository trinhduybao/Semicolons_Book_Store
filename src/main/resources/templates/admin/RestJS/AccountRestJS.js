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
  function formatBanStatus(data) {
    if (data === true) { 
        return '<button type="button" class="btn btn-sm btn-toggle active" data-toggle="button" aria-pressed="true" autocomplete="off"><div class="handle"></div></button>';
    } else { 
        return '<button type="button" class="btn btn-sm btn-toggle active" data-toggle="button" aria-pressed="false" autocomplete="on"><div class="handle"></div></button>';
    }
}





  async function getDataAccounts() {
    const response = await fetch('http://localhost:8080/rest/accounts');
    const data = await response.json();
    console.log(data);

    // Thêm cột fullname vào dữ liệu
    data.forEach((account) => {
        account.fullname = account.firstName + ' ' + account.lastName;
    });

    if (!$.fn.DataTable.isDataTable('#accountTable')) {
        $('#accountTable').DataTable({
            "data": data,
            "columns": [
                {"data": "id"},
                {"data": "username"},
                {"data": "email"},
                {"data": "fullname"}, 
                {"data": "address"},
                {
                    "data": "ban",
                    "render": function (data, type, row, meta) {
                        var id = row.id; // Lấy giá trị ID từ hàng
                        var checkedAttribute = data ? 'checked' : ''; // Nếu data là true, checkbox sẽ được check
                
                        // Thêm sự kiện onclick và gọi hàm confirmChange
                        return '<label class="toggleBtn">' +
                                '<input type="checkbox" id="checkbox_' + id + '" ' + checkedAttribute + ' >' +
                                '<span class="slider">' +
                                '<i class="fas fa-power-off toggle-text"></i>' +
                                '</span>' +
                                '</label>';
                    }
                }
                 
                
            ],
            "pageLength": 10,
            "language": {
                "info": "Hiển thị _START_ đến _END_ trong _TOTAL_ mục",
                "infoEmpty": "Không có sản phẩm nào",
                "infoFiltered": "(được lọc từ tổng số _MAX_ sản phẩm )",
                "lengthMenu": "Hiện _MENU_ sản phẩm" ,
                "search": "Tìm kiếm:", 
                "zeroRecords": "Không tìm thấy kết quả",
                "paginate": {
                    "previous": "Trước",
                    "next": "Sau",
                }
                
            }
        });
    } else {
        $('#accountTable').DataTable().clear().rows.add(data).draw();
    }
}


getDataAccounts();


});

$(document).ready(function() {
    var modalOpen = false; // Biến để theo dõi trạng thái của modal

    $('#accountTable').on('click', 'input[type="checkbox"]', function() {
        var checkbox = $(this);
        var previousState = checkbox.prop('checked');
        var id = checkbox.attr('id').replace('checkbox_', ''); // Lấy id của checkbox

        $('#confirmationModal').css('display', 'block');
        modalOpen = true; // Đặt trạng thái modal là đang mở

        var message = previousState ? "Bạn có chắc chắn muốn mở tài khoản này không?" : "Bạn có chắc chắn muốn khóa tài khoản này không?";
        $('#confirmMessage').text(message);

        $('#confirmYes').click(function() {
            // Tạm thời vô hiệu hóa checkbox
            checkbox.prop('disabled', true);

            var isChecked = checkbox.prop('checked');
            $.ajax({
                url: 'http://localhost:8080/rest/updateBan/' + id,
                method: 'put',
                data: {id: id, ban: isChecked},
                success: function(response) {
                    console.log('Dữ liệu đã được cập nhật thành công!');
                    checkbox.prop('disabled', false); // Kích hoạt lại checkbox sau khi cập nhật thành công
                    $('#confirmationModal').css('display', 'none');
                    modalOpen = false; // Đặt trạng thái modal là đã đóng
                },
                error: function(xhr, status, error) {
                    console.error('Lỗi: ' + error);
                    checkbox.prop('disabled', false); // Kích hoạt lại checkbox nếu có lỗi
                    $('#confirmationModal').css('display', 'none');
                    modalOpen = false; // Đặt trạng thái modal là đã đóng
                }
            });
        });

        $('#confirmNo, .close').click(function() {
            $('#confirmationModal').css('display', 'none');
            modalOpen = false; // Đặt trạng thái modal là đã đóng
        });
    });

    // Ngăn chặn sự kiện click trên checkbox khi modal đang hiển thị
    $('#confirmationModal').on('shown.bs.modal', function() {
        modalOpen = true;
    });

    $('#confirmationModal').on('hidden.bs.modal', function() {
        modalOpen = false;
    });
});

// $(document).ready(function() {
//     $('#accountTable').on('click', 'input[type="checkbox"]', function() {
//         var isChecked = $(this).prop('checked');
//         var rowData = $('#accountTable').DataTable().row($(this).closest('tr')).data();
//         var id = rowData.id; 
//         var checkbox = $(this);
//         var previousState = checkbox.prop('checked');
        
//         // Hiển thị modal
//         $('#confirmationModal').css('display', 'block');
        
//         // Thiết lập nội dung thông báo
//         var message = isChecked ? "Bạn có chắc chắn muốn khóa tài khoản này không?" : "Bạn có chắc chắn muốn mở tài khoản này không?";
//         $('#confirmMessage').text(message);
        
//         // Xác nhận khi nhấn Yes
//         $('#confirmYes').click(function() {
//             // Gửi yêu cầu AJAX để cập nhật cơ sở dữ liệu
//             $.ajax({
//                 url: 'http://localhost:8080/rest/updateBan/' + id,
//                 method: 'put',
//                 data: {id: id, ban: isChecked},
//                 success: function(response) {
//                     console.log('Dữ liệu đã được cập nhật thành công!');
//                 },
//                 error: function(xhr, status, error) {
//                     console.error('Lỗi: ' + error);
//                 }
//             });
            
//             // Ẩn modal sau khi xác nhận
//             $('#confirmationModal').css('display', 'none');
//         });
        
//         // Từ chối khi nhấn No
//         $('#confirmNo, .close').click(function() {
//             // Ẩn modal
//             $('#confirmationModal').css('display', 'none');
            
//         });
//     });
// });

