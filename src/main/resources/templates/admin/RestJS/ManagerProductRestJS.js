let host = "http://localhost:8080/rest/";
const app = angular.module("app", []);

app.controller("ctrl-managerProduct", function ($scope, $http, $timeout) {
  $scope.form = {};
  $scope.accounts = [];
  $scope.items = [];

  $scope.reset = function () {
    $scope.form = {};
    $scope.key = null;  
  };

  async function getDataManagerProduct() {
    const response = await fetch('http://localhost:8080/rest/productManager');
    const data = await response.json();
    console.log(data);

    if (!$.fn.DataTable.isDataTable('#managerproductTable')) {
        $('#managerproductTable').DataTable({
            "data": data,
            "columns": [
                {"data": "name"},
                {"data": "price"},
                {"data": "author"},
                {
                    "data": "publishedDate",
                    "render": function (data) {
                        return moment(data).format('DD-MM-YYYY');
                    }
                },                
                {"data": "quantity"},
                {"data": "category.name"},
                {"render" : function(data, type, row, meta) {
                    return `<button class="btn btn-primary" onclick="editProduct(${row.id})">Chỉnh Sửa</button>
                            <button class="btn btn-danger" onclick="deleteProduct(${row.id})">Xoá</button>`
                }}
            ],
            "scrollX": true, 
            "scrollCollapse": true, 
            "pageLength": 10,
            "language": {
                "info": "Hiển thị _START_ đến _END_ trong _TOTAL_ mục",
                "lengthMenu": "Hiện _MENU_ Sản Phẩm" ,
                "search": "Tìm kiếm:", 
                "paginate": {
                    "previous": "Trước",
                    "next": "Sau",
                }
                
            }
        });
    } else {
        $('#managerproductTable').DataTable().clear().rows.add(data).draw();
    }
}

async function getDataItems() {
    const response = await fetch('http://localhost:8080/rest/items');
    const dataItems = await response.json();
    console.log(dataItems);
    
    let options = '<option value="" selected disabled >Vui lòng chọn danh mục sản phẩm</option>';
    
    dataItems.forEach((item) => {
      options += `<option value="${item.id}" >${item.name}</option>`; 
    });
  
    document.getElementById("idItems").innerHTML = options;
  
  }


  async function getDataCategories() {  
    const response = await fetch('http://localhost:8080/rest/category');
    const getDataCategories = await response.json();
    console.log(getDataCategories);
    
    let options = '<option value="" selected disabled >Vui lòng chọn loại sản phẩm</option>';
    
    getDataCategories.forEach((category) => {
      options += `<option value="${category.id}" >${category.name}</option>`; 
    });
  
    document.getElementById("idCategories").innerHTML = options;
  
  }

getDataManagerProduct();
getDataItems();
getDataCategories();

});

