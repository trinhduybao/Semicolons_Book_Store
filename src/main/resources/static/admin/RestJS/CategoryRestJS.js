let host = "http://localhost:8080/rest/";
const app = angular.module("app", []);

app.controller("ctrl", function ($scope, $http, $timeout) {
  $scope.form = {};
  $scope.categories = [];
  $scope.items = [];

  $scope.reset = function () {
    $scope.form = {};
    $scope.key = null;  
  };




//   $scope.loadData = function () {
//     $http.get(host + "category").then(function (response) {
//       $scope.categories = response.data;
//       console.log("Categories loaded:", $scope.categories);
//     });

//     $http.get(host + "items").then(function (response) {
//       $scope.items = response.data;
//       console.log("Items loaded:", $scope.items);
//     });
//   };

  
$scope.updateCategory = function (event) {
    event.preventDefault();
    var id = document.getElementById("id").value;

    if (!id) {
        document.getElementById("errorMessageName").innerText = "Vui lòng chọn một mục để sửa.";
        return false; 
    } else {
        document.getElementById("errorMessageName").innerText = "";
    }

    if (!validateForm()) {
        return;
    }

    var id = document.getElementById("id").value;
    var name = document.getElementById("nameCategory").value;
    var item = document.getElementById("idCategory").value;

    var data = {
        id: id,
        name: name,
        item: {
            id: item
        }
    };
    var jsonData = JSON.stringify(data);
    
    Swal.fire({
        title: "Bạn có chắc chắn muốn cập nhật danh mục này không?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Cập nhật",
        cancelButtonText: "Hủy"
    }).then((result) => {
        if (result.isConfirmed) {
            var url = `${host}category/${id}`;
            $http.put(url, jsonData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                console.log('Update successful:', response.data);
                Swal.fire(
                    'Cập nhật thành công!',
                    '',
                    'success'
                ).then(() => {
                    window.location.reload();
                });
            })
            .catch(function (error) {
                console.error('Update failed:', error);
                Swal.fire(
                    'Cập nhật thất bại!',
                    '',
                    'error'
                );
            });
        }
    });
};



//   // Load initial data
//   // $scope.loadData();
//   $scope.reset();
});
async function getDataItems() {
  const response = await fetch('http://localhost:8080/rest/items');
  const dataItems = await response.json();
  console.log(dataItems);
  
  let options = '<option value="" selected disabled >Vui lòng chọn danh mục</option>';
  
  dataItems.forEach((item) => {
    options += `<option value="${item.id}" >${item.name}</option>`; 
  });

  document.getElementById("idCategory").innerHTML = options;

}   


async function getDataCategories() {
  const response = await fetch('http://localhost:8080/rest/category');
  const data = await response.json();
  console.log(data);
  
  let tab = '';
  data.forEach((category) => {
      tab += `<tr>
                  <td>${category.name}</td>
                  <td>${category.name}</td>
                  <td>
                      <button class="btn btn-primary" onclick="editCategory(${category.id})">Chỉnh Sửa</button>
                      <button class="btn btn-danger" onclick="deleteCategory(${category.id})">Xoá</button>
                  </td>
              </tr>`;
  });
  document.getElementById("tbody").innerHTML = tab;
  if (!$.fn.DataTable.isDataTable('#categoryTable')) {

  $(`#categoryTable`).DataTable({
      "data" : data,
      
      "columns" : [
          { "data" : "item.name" },
          { "data" : "name" },
          { 
              "data" : "id",
              "render" : function(data, type, row, meta) {
                  return `<button class="btn btn-primary" onclick="editCategory(${row.id})">Chỉnh Sửa</button>
                          <button class="btn btn-danger" onclick="deleteCategory(${row.id})">Xoá</button>`
              }
          }
      ],
      "pageLength": 5,
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
      
  })
}
}

async function deleteCategory(id) {
    try {
        const result = await Swal.fire({
            title: 'Bạn chắc chắn muốn xoá danh mục này?',
            text: 'Hành động này sẽ không thể hoàn tác!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xoá',
            cancelButtonText: 'Hủy'
        });

        if (result.isConfirmed) {
            const response = await fetch(`http://localhost:8080/rest/delete/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                    console.log(`Category with ID ${id} deleted successfully`);
                    await Swal.fire({
                        title: 'Xoá thành công!',
                        text: 'Danh mục đã được xoá thành công.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    window.location.reload();
                } else {
                    await Swal.fire({
                        title: 'Xoá thất bại!',
                        text: 'Danh mục này không được xoá.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    console.error(`Failed to delete category with ID ${id}`);
                }
        }
    } catch (error) {
        console.error('Error during delete request:', error);
    }
}


async function deleteCategoryFromForm(id) {
    var id = document.getElementById("id").value;

    if (!id) {
        document.getElementById("errorMessageName").innerText = "Vui lòng chọn một mục để xoá.";
        return false;
    } else {
        document.getElementById("errorMessageName").innerText = "";
    }

    try {
        if (id) {
            await deleteCategory(id);
            window.location.reload();
        } else {
            console.error('ID is undefined or empty.');
        }
    } catch (error) {
        console.error('Error during delete request:', error);
    }
}


async function editCategory(id) {
    
  try {
      const response = await fetch(`http://localhost:8080/rest/category/${id}`, {
          method: 'GET'

      }); 
          if (response.ok) {
          const data = await response.json();
          console.log(data);
          document.getElementById("id").value = data.id;
          document.getElementById("nameCategory").value = data.name;
          document.getElementById("idCategory").value = data.item.id;
      } else {
          console.error(`Failed to edit category with ID ${id}`);
      }
  } catch (error) {
      console.error('Error during edit request:', error);
  }
}

// document.getElementById("btnCreate").addEventListener("click", function(event) {
//   event.preventDefault(); // Ngăn chặn sự kiện mặc định
// });
document.getElementById("btnUpdate").addEventListener("click", function(event) {
  event.preventDefault(); // Ngăn chặn sự kiện mặc định
});
// document.getElementById("btnDelete").addEventListener("click", function(event) {
//   event.preventDefault(); // Ngăn chặn sự kiện mặc định
// });

async function createCategory() {
    if (!validateForm()) {
        return;
    }
    {
        try {
            const response = await fetch(`http://localhost:8080/rest/category`, {
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
                const responseData = await response.json();
                const addCategory = responseData.name; 
                console.log("Category created successfully");
                Swal.fire({
                    title: "Danh mục mới được thêm thành công!",
                    html: `Danh mục <strong>${addCategory}</strong> đã được thêm mới thành công!`,
                    icon: "success",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.reload();
                    }
                  });

            } else {
                console.error("Failed to create category");
                alert("Đã có item này!");
            }
        } catch (error) {
            console.error('Error during create request:', error);
        }
    }
  
}



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

function checkIfItemExists(name) {
    return fetch(`http://localhost:8080/exists?name=${encodeURIComponent(name)}`)
        .then(response => response.json())
        .catch(error => console.error('Error checking item existence:', error));
}



getDataCategories();
getDataItems();
