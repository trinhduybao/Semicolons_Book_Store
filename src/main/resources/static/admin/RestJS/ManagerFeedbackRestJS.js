let host = "http://localhost:8080/rest/";
const app = angular.module("app", []);

app.controller("ctrl-managerFeedback", function ($scope, $http, $timeout) {
  $scope.form = {};
  $scope.accounts = [];
  $scope.items = [];

  $scope.reset = function () {
    $scope.form = {};
    $scope.key = null;  
  };

  async function getDataManagerFeedback() {
    const response = await fetch('http://localhost:8080/rest/feedbacks');
    const data = await response.json();
    console.log(data);

    if (!$.fn.DataTable.isDataTable('#managerfeedbackTable')) {
        $('#managerfeedbackTable').DataTable({
            "data": data,
            "columns": [
                {"data": "id"},
                {"data": "rate"},
                {"data": "content"},
                {
                    "data": "createDate",
                    "render": function (data) {
                        return moment(data).format('HH:mm:ss , DD-MM-YYYY');
                    }
                },                              
                {"data": "account.id"},
                {"data": "product.id"},  
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
            "scrollX": true, 
            "scrollCollapse": true, 
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
        $('#managerfeedbackTable').DataTable().clear().rows.add(data).draw();
    }
}



getDataManagerFeedback();

});

$(document).ready(function() {
    var modalOpen = false; // Biến để theo dõi trạng thái của modal

    $('#managerfeedbackTable').on('click', 'input[type="checkbox"]', function() {
        var checkbox = $(this);
        var previousState = checkbox.prop('checked');
        var id = checkbox.attr('id').replace('checkbox_', ''); // Lấy id của checkbox

        $('#confirmationModal').css('display', 'block');
        modalOpen = true; // Đặt trạng thái modal là đang mở

        var message = previousState ? "Bạn có chắc chắn muốn ẩn đánh giá này không?" : "Bạn có chắc chắn muốn hiện đánh giá này không?";
        $('#confirmMessage').text(message);

        $('#confirmYes').click(function() {
            // Tạm thời vô hiệu hóa checkbox
            checkbox.prop('disabled', true);

            var isChecked = checkbox.prop('checked');
            $.ajax({
                url: 'http://localhost:8080/rest/updateBanFeedback/' + id,
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