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
                {"data": "category.item.name"},
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
                "infoEmpty": "Không có sản phẩm nào",
                "infoFiltered": "(được lọc từ tổng số _MAX_ sản phẩm )",
                "lengthMenu": "Hiện _MENU_ sản phẩm" ,
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

  async function createOfUpdateProduct() {
    if (!validateForm()) {
        return;
    }
    {
        try {
            const response = await fetch(`http://localhost:8080/rest/productManager`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: document.getElementById("nameCategory").value,
                    item: {
                        id: document.getElementById("idCategory").value
                    }
                })
            });
            if (response.ok) {
                console.log("Category created successfully");
                window.location.reload();
                // Refresh or update your data after successful creation
            } else {
                console.error("Failed to create category");
                alert("Đã có item này!");
            }
        } catch (error) {
            console.error('Error during create request:', error);
        }
    }
  
}



getDataManagerProduct();
getDataItems();
getDataCategories();

});


$(document).ready(function() {
    // Khởi tạo DataTables
    var table = $('#productTable').DataTable({
        // Cấu hình DataTables
    });

    // Xử lý sự kiện click trên nút button "Thêm sản phẩm"
    $('#addProductButton').click(function() {
        $('#addProductModal').modal('show');
    });

    // Xử lý khi submit form thêm sản phẩm
    $('#addProductForm').submit(function(e) {
        e.preventDefault(); // Ngăn chặn gửi form mặc định

        // Lấy thông tin sản phẩm từ form
        var productName = $('#productName').val();
        // Lấy thông tin các trường khác

        // Thêm sản phẩm vào DataTables
        table.row.add([
            productName,
            // Thêm các thông tin sản phẩm khác vào đây
        ]).draw(false); // Vẽ lại bảng

        // Đóng modal sau khi thêm sản phẩm thành công
        $('#addProductModal').modal('hide');

        // Đặt lại các trường trong form
        $('#productName').val('');
        // Đặt lại các trường khác
    });
});
