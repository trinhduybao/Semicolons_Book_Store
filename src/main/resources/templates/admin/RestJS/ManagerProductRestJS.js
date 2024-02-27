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
                    return `<div id="editButton" type="submit" th:value="${row.id}" class="btn btn-primary" >Chỉnh Sửa</div>
                            <div id="deleteButton" type="submit" type="submit" th:value="${row.id}" onclick="deleteProductManager(${row.id})" class="btn btn-primary"">Xoá</div>`
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
      options += `<option value="${category.id}">${category.name}</option>`; 
    });
  
    document.getElementById("idCategories").innerHTML = options;
}




getDataManagerProduct();
getDataItems();
getDataCategories();

});


function validateForm() {
    var name = document.getElementById("id").value;
    var name = document.getElementById("nameCategory").value;
    var item = document.getElementById("idCategory").value;

    var isValid = true; 

    if (!item) {
        document.getElementById("errorMessageItem").innerText = "Vui lòng chọn một mục.";
        return false; 
    } else {
        document.getElementById("errorMessageItem").innerText = "";
    }

    if (!name) {
        document.getElementById("errorMessageName").innerText = "Vui lòng điền tên.";
        return false; 
    } else {
        document.getElementById("errorMessageName").innerText = "";
    }
    


    return isValid;
}
// lọc theo danh mục

$(document).ready(function() {
    $('#idItems').change(function() {
        var itemId = $(this).val(); 

        $.ajax({
            url: 'http://localhost:8080/byItemId/' + itemId, 
            method: 'GET',
            data: { itemId: itemId },
            success: function(response) {
                console.log(response);
                $('#idCategories').empty();

                response.forEach(function(category) {
                    $('#idCategories').append('<option value="' + category.id + '">' + category.name + '</option>');
                });
            },
            error: function(xhr, status, xerror) {
                console.error('Error:', error);
            }
        });
    });
});

// edit
$(document).ready(function() {
    $('body').on('click', '#editButton', function() {
        var productId = $(this).attr('th:value'); 
        $.ajax({
            url: 'http://localhost:8080/rest/productManager/' + productId,
            method: 'GET',

            success: function(response) {
                $('#id').val(response.id);
                $('#idItems').val(response.category.item.id);
                $('#idCategories').val(response.category.id);
                $('#nameProduct').val(response.name);
                $('#priceProduct').val(response.price);
                $('#supplier').val(response.supplier);
                $('#inputPublisher').val(response.publisher);
                $('#inputPublishedDate').val(response.publishedDate);
                $('#author').val(response.author);
                $('#page-count').val(response.pageCount);
                $('#description').val(response.description);
                $('#weight').val(response.weight);
                $('#size').val(response.size);
                $('#quantity').val(response.quantity);
                $('#brand').val(response.brand);
                $('#madeIn').val(response.madeIn);
                $('#Origin').val(response.origin);
                $('#color').val(response.color);  
                $('#material').val(response.material);  
                $('#currentImageName').val(response.thumbnailImage);  

            
                $('#exampleModal').modal('show');

        console.log(response);

            },
            error: function(xhr, status, error) {
                console.error('Lỗi khi lấy thông tin sản phẩm:', error);

            }
        });
    });
});


async function createOrUpdateProduct() {
    try {
        const categoryId = document.getElementById("idCategories").value;
        const imageFile = document.getElementById("imageProduct").files[0];
        const imageName = imageFile.name;

        if (!imageFile) {
            alert("Vui lòng chọn hình ảnh");
            return;
        }

        const formData = new FormData();
        formData.append("file", imageFile);

        const responseUpload = await fetch(`http://localhost:8080/api/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!responseUpload.ok) {
            console.error("Failed to upload image", responseUpload);
            alert("Đã xảy ra lỗi khi tải lên hình ảnh");
            return;
        }

        const responseProduct = await fetch(`http://localhost:8080/rest/productManager`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: document.getElementById("nameProduct").value,
                price: document.getElementById("priceProduct").value,
                supplier: document.getElementById("supplier").value,
                publisher: document.getElementById("inputPublisher").value,
                author: document.getElementById("author").value,
                publishedDate: document.getElementById("inputPublishedDate").value,
                pageCount: document.getElementById("page-count").value,
                description: document.getElementById("description").value,
                weight: document.getElementById("weight").value,
                size: document.getElementById("size").value,
                quantity: document.getElementById("quantity").value,
                brand: document.getElementById("brand").value,
                madeIn: document.getElementById("madeIn").value,
                origin: document.getElementById("Origin").value,
                color: document.getElementById("color").value,
                material: document.getElementById("material").value,
                category: {
                    id : categoryId
                },
                thumbnailImage: imageName
              
            })
        });

        if (responseProduct.ok) {
            console.log("Product created or updated successfully");
            window.location.reload();
        } else {
            console.error("Failed to create or update product", responseProduct);
            alert("Đã xảy ra lỗi khi tạo hoặc cập nhật sản phẩm");
        }
    } catch (error) {
        console.error('Error during create or update request:', error);
    }
}



async function updateProduct(id) {
    try {
        const categoryId = document.getElementById("idCategories").value;
        const imageFile = document.getElementById("imageProduct").files[0];
        const imageName = imageFile ? imageFile.name : document.getElementById("currentImageName").value;
        var id = document.getElementById("id").value;

        const formData = new FormData();
        if (imageFile) {
            formData.append("file", imageFile);
        }

        const responseProduct = await fetch(`http://localhost:8080/rest/productManager/` + id , {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                name: document.getElementById("nameProduct").value,
                price: document.getElementById("priceProduct").value,
                supplier: document.getElementById("supplier").value,
                publisher: document.getElementById("inputPublisher").value,
                author: document.getElementById("author").value,
                publishedDate: document.getElementById("inputPublishedDate").value,
                pageCount: document.getElementById("page-count").value,
                description: document.getElementById("description").value,
                weight: document.getElementById("weight").value,
                size: document.getElementById("size").value,
                quantity: document.getElementById("quantity").value,
                brand: document.getElementById("brand").value,
                madeIn: document.getElementById("madeIn").value,
                origin: document.getElementById("Origin").value,
                color: document.getElementById("color").value,
                material: document.getElementById("material").value,
                category: {
                    id : categoryId
                },
                thumbnailImage: imageName 
              
            })
        });

        if (responseProduct.ok) {   
            console.log("Product updated successfully");
            if (imageFile) {
                const responseUpload = await fetch(`http://localhost:8080/api/upload`, {
                    method: 'POST',
                    body: formData,
                });
            }
            window.location.reload();
        } else {
            console.error("Failed to update product", responseProduct);
            alert("Đã xảy ra lỗi khi cập nhật sản phẩm");
        }
    } catch (error) {
        console.error('Error during update request:', error);
    }
}




function handleFileSelect(event) {
    const fileList = event.target.files; 
    const fileName = fileList[0].name; 
    console.log("Tên tệp: ", fileName);
}

async function deleteProductManager(id) {
   
    try {
        const response = await fetch(`http://localhost:8080/rest/deleteProductManager/${id}`, {
            method: 'DELETE'
        });
  
        if (response.ok) {
            console.log(`Category with ID ${id} deleted successfully`);
            // Refresh or update your data after successful deletion
          //   updateDataCategories();
      window.location.reload();
  
            //   getDataCategories();
        } else {
            console.error(`Failed to delete category with ID ${id}`);
        }
    } catch (error) {
        console.error('Error during delete request:', error);
    }
  }
  async function deleteProductManagerFormForm(id) {
      
    var id = document.getElementById("id").value;
  
    // if (!id) {
    //   alert("Vui lòng chọn một mục để xoá.");
    //   return false; 
//   } else {
//       document.getElementById("errorMessageName").innerText = "";
//   }
  
    if (id) {
      // Gọi hàm deleteCategory để xóa dữ liệu
      deleteProductManager(id);
      window.location.reload();
  
  } else {
      // Hiển thị thông báo hoặc xử lý khác nếu id không có giá trị
      console.error('ID is undefined or empty.');
  }
  };
  
