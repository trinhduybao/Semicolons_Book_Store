let host = "http://localhost:8080/rest/";
const app = angular.module("app", []);

app.controller("ctrl-product", function ($scope, $http, $timeout) {
    $scope.items = [];


});
async function getDataItems() {
    const response = await fetch('http://localhost:8080/rest/items');
    const dataItems = await response.json();
    console.log(dataItems);

    let options = '<option value="" selected disabled >Vui Lòng Chọn Danh Mục Sản Phẩm</option>';

    dataItems.forEach((item) => {
        options += `<option value="${item.id}" >${item.name}</option>`;
    });
    document.getElementById("idItem").innerHTML = options;
}
getDataItems();

function showHideInputs() {
    var selectedValue = document.getElementById("idItem").value;
    var thuonghieu = document.getElementById("thuonghieu");
    var sanxuattai = document.getElementById("sanxuattai");
    var nguongoc = document.getElementById("nguongoc");
    var mausac = document.getElementById("mausac");
    var vatlieu = document.getElementById("vatlieu");
    var nhaxuatban = document.getElementById("nhaxuatban");
    var tacgia = document.getElementById("tacgia");
    var ngayxuatban = document.getElementById("ngayxuatban");
    var sotrang = document.getElementById("sotrang");
    var mieuta = document.getElementById("mieuta");

    // Hiển thị hoặc ẩn các input tùy thuộc vào giá trị đã chọn
    if (selectedValue === "1") { // Nếu chọn Văn Phòng Phẩm
        thuonghieu.style.display = "block";
        sanxuattai.style.display = "block";
        nguongoc.style.display = "block";
        mausac.style.display = "block";
        vatlieu.style.display = "block";
        nhaxuatban.style.display = "none";
        tacgia.style.display = "none";
        ngayxuatban.style.display = "none";
        sotrang.style.display = "none";
        mieuta.style.display = "none";
    } else if (selectedValue === "2" || selectedValue === "3") { // Nếu chọn Sách Trong Nước hoặc Foreign Books
        thuonghieu.style.display = "none";
        sanxuattai.style.display = "none";
        nguongoc.style.display = "none";
        mausac.style.display = "none";
        vatlieu.style.display = "none";
        nhaxuatban.style.display = "block";
        tacgia.style.display = "block";
        ngayxuatban.style.display = "block";
        sotrang.style.display = "block";
        mieuta.style.display = "block";
    }
}