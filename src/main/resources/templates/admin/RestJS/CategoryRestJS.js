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
    
    var url = `${host}category/${id}`;
    $http.put(url, jsonData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(function (response) {
        console.log('Update successful:', response.data);
        window.location.reload();
    })
    .catch(function (error) {
        console.error('Update failed:', error);
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
  
  let options = '<option value="" selected disabled >Vui Lòng Chọn Danh Mục</option>';
  
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
      "pageLength": 5 
      
  })
}
}

async function deleteCategory(id) {
    if (!validateForm()) {
        return;
    }
  try {
      const response = await fetch(`http://localhost:8080/rest/delete/${id}`, {
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
async function deleteCategoryFromForm(id) {
    
  var id = document.getElementById("id").value;

  if (!id) {
    document.getElementById("errorMessageName").innerText = "Vui lòng chọn một mục để xoá.";
    return false; 
} else {
    document.getElementById("errorMessageName").innerText = "";
}

  if (id) {
    // Gọi hàm deleteCategory để xóa dữ liệu
    deleteCategory(id);
    window.location.reload();

} else {
    // Hiển thị thông báo hoặc xử lý khác nếu id không có giá trị
    console.error('ID is undefined or empty.');
}
};

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
          console.log("Category created successfully");
          window.location.reload();
          // Refresh or update your data after successful creation
      } else {
          console.error("Failed to create category");
      }
  } catch (error) {
      console.error('Error during create request:', error);
  }
}

// async function updateCategory() {
//   try {
//       const response = await fetch(`http://localhost:8080/rest/category/${id}`, {
//           method: 'PUT',
//           headers: {
//               'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//               name: document.getElementById("nameCategory").value,
//               item: {
//                   id: document.getElementById("idCategory").value
//               }
//           }),
//           mode: 'no-cors',

          
//       });
      
//       if (response.ok) {
//           console.log("Category updated successfully");
//           window.location.reload();
//           // Refresh or update your data after successful creation
//       } else {
//           console.error("Failed to update category");
//       }
//   } catch (error) {
//       console.error('Error during update request:', error);
//   }
// }

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



getDataCategories();
getDataItems();
