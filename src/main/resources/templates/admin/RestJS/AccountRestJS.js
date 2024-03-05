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
                {"data": "address"}
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


