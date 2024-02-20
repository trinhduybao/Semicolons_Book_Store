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
            "pageLength": 10
        });
    } else {
        $('#accountTable').DataTable().clear().rows.add(data).draw();
    }
}


getDataAccounts();


});


