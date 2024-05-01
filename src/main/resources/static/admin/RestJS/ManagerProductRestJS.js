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
                    return `<div id="editButton" type="submit" th:value="${row.id}" class="btn btn-success" >Chỉnh Sửa</div>
                            <div id="deleteButton" type="submit" type="submit" th:value="${row.id}" onclick="deleteProductManager(${row.id})" class="btn btn-danger"">Xoá</div>`
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

/// ẩn bớt không cần thiết

// document.getElementById('idItems').addEventListener('change', function() {
//     var selectedItem = this.value;

//     // Ẩn hoặc hiển thị các trường nhập liệu dựa trên lựa chọn của danh mục sản phẩm
//     if (selectedItem === 1) {
//         document.getElementById('dNameProduct').style.display = 'none';

//     } else {
//         document.getElementById('dPriceProduct').style.display = 'none';

//     }
// });



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
        const productName = document.getElementById("nameProduct").value;
        const categoryId = document.getElementById("idCategories").value;
        const imageFile = document.getElementById("imageProduct").files[0];
        const imageName = imageFile.name;

        if (!imageFile) {
            alert("Vui lòng chọn hình ảnh");
            return;
        }

        // Kiểm tra xem tên sản phẩm đã tồn tại chưa
        const responseCheck = await fetch(`http://localhost:8080/rest/productManager/check?name=${productName}`);
        if (!responseCheck.ok) {
            console.error("Failed to check product name", responseCheck);
            alert("Đã xảy ra lỗi khi kiểm tra tên sản phẩm");
            return;
        }
        const isNameExist = await responseCheck.json();

        if (isNameExist) {
            alert("Tên sản phẩm đã tồn tại. Vui lòng chọn tên khác.");
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
                name: productName,
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
            alert("Sản phẩm đã được thêm mới thành công!");
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

        const shouldUpdate = await Swal.fire({
            title: "Xác nhận cập nhật",
            text: "Bạn có chắc muốn cập nhật sản phẩm này?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Cập nhật",
            cancelButtonText: "Hủy",
        });

        if (shouldUpdate.isConfirmed) {
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
                Swal.fire({
                    title: "Sản phẩm đã được cập nhật thành công!",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            } else {
                console.error("Failed to update product", responseProduct);
                alert("Đã xảy ra lỗi khi cập nhật sản phẩm");
            }
        }
    } catch (error) {
        console.error('Error during update request:', error);
    }
}



function handleFileSelect(event) {
    const files = event.target.files; 
    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const fileSizeInMB = file.size / (1024 * 1024); 

        if (fileSizeInMB > 5) {
            alert('Tệp vượt quá kích thước cho phép (5MB):', file.name);
            event.target.value = '';
        }

        if (!file.type.match('image.*')) {
            alert('Tệp không phải là hình ảnh:', file.name);
            event.target.value = '';
        }
    }
}


async function deleteProductManager(id) {
    try {
        const shouldDelete = await Swal.fire({
            title: "Xác nhận xoá",
            text: "Bạn có chắc muốn xoá sản phẩm này?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Xoá",
            cancelButtonText: "Hủy",
        });

        if (shouldDelete.isConfirmed) {
            const response = await fetch(`http://localhost:8080/rest/deleteProductManager/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                console.log(`Product with ID ${id} deleted successfully`);
                console.log(`Category with ID ${id} deleted successfully`);
                await Swal.fire({
                    title: 'Xoá thành công!',
                    text: 'Sản phẩm đã được xoá thành công.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                window.location.reload();
            } else {
                await Swal.fire({
                    title: 'Xoá thất bại!',
                    text: 'Sản phẩm này không được xoá.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                console.error(`Failed to delete product with ID ${id}`);
            }
        }
    } catch (error) {
        console.error('Error during delete request:', error);
    }
}

async function deleteProductManagerFormForm(id) {
    var id = document.getElementById("id").value;

    if (id) {
        deleteProductManager(id);
    } else {
        console.error('ID is undefined or empty.');
    }
};



  async function validateForm() {

    var currentDate = new Date();


    var idIitem = document.getElementById('idItems').value;
    var idCategories = document.getElementById('idCategories').value;
    var productName = document.getElementById('nameProduct').value;
    var productPrice = document.getElementById('priceProduct').value;
    var supplier = document.getElementById('supplier').value;
    var inputPublisher = document.getElementById('inputPublisher').value;
    var author = document.getElementById('author').value;
    
    var inputPublishedDate = document.getElementById('inputPublishedDate').value;
    var currentDate = new Date();
    var publishedDate = new Date(inputPublishedDate);

    var pageCount = document.getElementById('page-count').value;
    var description = document.getElementById('description').value;
    var weight = document.getElementById('weight').value;
    var size = document.getElementById('size').value;
    var quantity = document.getElementById('quantity').value;
    var brand = document.getElementById('brand').value;
    var madeIn = document.getElementById('madeIn').value;
    var origin = document.getElementById('Origin').value;
    var color = document.getElementById('color').value;
    var material = document.getElementById('material').value;
    var imageProduct = document.getElementById('imageProduct').value;

    var errors = false;

    document.getElementById('itemError').innerHTML = '';
    document.getElementById('categoriesError').innerHTML = '';
    document.getElementById('productNameError').innerHTML = '';
    document.getElementById('productPriceError').innerHTML = '';
    document.getElementById('supplierError').innerHTML = '';
    document.getElementById('inputPublisherError').innerHTML = '';
    document.getElementById('authorError').innerHTML = '';
    document.getElementById('publishedDateError').innerHTML = '';
    document.getElementById('pageCountError').innerHTML = '';
    document.getElementById('descriptionError').innerHTML = '';
    document.getElementById('weightError').innerHTML = '';
    document.getElementById('sizeError').innerHTML = '';
    document.getElementById('quantityError').innerHTML = '';
    document.getElementById('brandError').innerHTML = '';
    document.getElementById('madeInError').innerHTML = '';
    document.getElementById('originError').innerHTML = '';
    document.getElementById('colorError').innerHTML = '';
    document.getElementById('materialError').innerHTML = '';
    document.getElementById('imageProductError').innerHTML = '';


        if (idIitem.trim() === '') {
        document.getElementById('itemError').innerHTML = 'Vui lòng chọn sản phẩm';
        errors = true;
    }
    if (idCategories.trim() === '') {
        document.getElementById('categoriesError').innerHTML = 'Vui lòng chọn danh mục';
        errors = true;
    }
    if (productName.trim() === '') {
        document.getElementById('productNameError').innerHTML = 'Vui lòng nhập tên sản phẩm';
        errors = true;
    }

    if (productPrice.trim() === '') {
        document.getElementById('productPriceError').innerHTML = 'Vui lòng nhập giá sản phẩm';
        errors = true;
    } else if (isNaN(productPrice)) {
        document.getElementById('productPriceError').innerHTML = 'Giá sản phẩm phải là một số';
        errors = true;
    }

    if (supplier.trim() === '') {
        document.getElementById('supplierError').innerHTML = 'Vui lòng nhập tên nhà phát hành';
        errors = true;
    }

    if (inputPublisher.trim() === '') {
        document.getElementById('inputPublisherError').innerHTML = 'Vui lòng nhập tên nhà xuất bản';
        errors = true;
    }

    if (author.trim() === '') {
        document.getElementById('authorError').innerHTML = 'Vui lòng nhập tên tác giả';
        errors = true;
    }

    if (inputPublishedDate.trim() === '') {
        document.getElementById('publishedDateError').innerHTML = 'Vui lòng chọn ngày xuất bản';
        errors = true;
    }
   
    if (publishedDate > currentDate) {
        document.getElementById('publishedDateError').innerHTML = 'Ngày xuất bản không thể lớn hơn ngày hiện tại';
        errors = true;
    }

    if (pageCount.trim() === '') {
        document.getElementById('pageCountError').innerHTML = 'Vui lòng nhập số trang';
        errors = true;
    }

    if (description.trim() === '') {
        document.getElementById('descriptionError').innerHTML = 'Vui lòng nhập mô tả';
        errors = true;
    }

    if (weight.trim() === '') {
        document.getElementById('weightError').innerHTML = 'Vui lòng nhập cân nặng';
        errors = true;
    }

    if (size.trim() === '') {
        document.getElementById('sizeError').innerHTML = 'Vui lòng nhập kích cỡ sản phẩm';
        errors = true;
    }

    if (quantity.trim() === '') {
        document.getElementById('quantityError').innerHTML = 'Vui lòng nhập số lượng';
        errors = true;
    }

    if (brand.trim() === '') {
        document.getElementById('brandError').innerHTML = 'Vui lòng chọn thương hiệu';
        errors = true;
    }

    if (madeIn.trim() === '') {
        document.getElementById('madeInError').innerHTML = 'Vui lòng chọn nơi sản xuất';
        errors = true;
    }

    if (origin.trim() === '') {
        document.getElementById('originError').innerHTML = 'Vui lòng chọn nguồn gốc';
        errors = true;
    }

    if (color.trim() === '') {
        document.getElementById('colorError').innerHTML = 'Vui lòng chọn màu sắc';
        errors = true;
    }

    if (material.trim() === '') {
        document.getElementById('materialError').innerHTML = 'Vui lòng chọn chất liệu';
        errors = true;
    }

    if (imageProduct.trim() === '') {
        document.getElementById('imageProductError').innerHTML = 'Vui lòng chọn hình ảnh sản phẩm';
        errors = true;
    }

    if (errors) {
        return false;
    }

    return true;
}
