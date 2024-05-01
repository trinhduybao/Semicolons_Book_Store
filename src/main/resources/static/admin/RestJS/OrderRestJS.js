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
    const response = await fetch('http://localhost:8080/rest/orders');
    const data = await response.json();
    console.log(data);
    
    data.forEach((orders) => {
        orders.fullname = orders.account.firstName + ' ' + orders.account.lastName;
    });

    
    if (!$.fn.DataTable.isDataTable('#orderTable')) {
        $('#orderTable').DataTable({
            "data": data,
            "columns": [
                {"data": "id"},
                {
                    "data": "orderDate",
                    "render": function (data) {
                        return moment(data).format('     DD-MM-YYYY');
                    }
                },                  
                {"data": "totalAmount"},
                {"data": "address"},
                { 
                    "data": "voucher.discountAmount",
                    "defaultContent": "<b>Không giảm giá</b>" 
                },
                {"data": "fullname"},  
                {"data": "status"},                            
                {"render" : function(data, type, row, meta) {
                    return `
                    
                    <a  class="btn btn-success" ">Chỉnh sửa</a>
                    <a  class="btn btn-danger" ">Xoá</a>
  

                
                    `
                }}
            ],
            "scrollX": true, 
            "scrollCollapse": true, 
            "pageLength": 5 ,
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
        $('#orderTable').DataTable().clear().rows.add(data).draw();
    }
}


getDataOrders();

// });