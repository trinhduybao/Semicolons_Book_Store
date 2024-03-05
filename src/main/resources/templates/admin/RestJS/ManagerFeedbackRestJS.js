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
                {"render" : function(data, type, row, meta) {
                    return `
                    
                    <a  class="btn btn-success" ">Hiên</a>
                    <a  class="btn btn-danger" ">Ẩn</a>
  

                
                    `
                }}
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