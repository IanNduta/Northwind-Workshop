"use strict";
const categorySearch = document.getElementById("categorySearch");
const productSelected = document.getElementById("productSelected");

window.onload = function () {
    // console.log("hi");
    populateTheDropdownWithCategory();
    populateDropdownProductSelected()
    categorySearch.onchange = onChangeCategorySearch;
    productSelected.onchange = onChangeProductSelected;
}

function populateTheDropdownWithCategory() {
    const categoryApi = "http://localhost:8081/api/categories";

    fetch(categoryApi)
        .then(response => response.json())
        .then(data => {

            //loops throught the array and creates new options 
            for (let category of data) {
                // console.log(category.name);
                let newOptions = document.createElement("option");
                newOptions.value = category.categoryId;
                newOptions.innerHTML = category.name;

                categorySearch.appendChild(newOptions);

            }

        })

}
function populateDropdownProductSelected() {
    let firstOption = document.createElement("option");
    let secondOption = document.createElement("option");
    firstOption.value = "View all";
    firstOption.innerHTML = "View all"

    secondOption.value = "Search by category";
    secondOption.innerHTML = "Search by category";

    productSelected.append(firstOption, secondOption);
}

function onChangeProductSelected() {
    clearTable();
    console.log(productSelected.value);

    const categoryApi = "http://localhost:8081/api/categories";

    fetch(categoryApi)
        .then(response => response.json())
        .then(data => {

            for (let categorySelected of data) {
                if (productSelected.value == "View all") {
                    console.log("hi");
                    creatCategoryTable(categorySelected);
                }
                else {
                    console.log("hi");
                    categorySearch.style.display = "block";
                }
            }
        })

}

function onChangeCategorySearch() {
    // console.log(categorySearch.value);
    clearTable();
    const categoryApi = "http://localhost:8081/api/categories";

    fetch(categoryApi)
        .then(response => response.json())
        .then(data => {

            let categoryIdSelected;
            for (let categorySelected of data) {
                if (categorySelected.categoryId == categorySearch.value) {
                    categoryIdSelected = categorySelected.categoryId
                    console.log(categoryIdSelected);
                }
            }
            let productApi = "http://localhost:8081/api/products/bycategory/" + categoryIdSelected;
            console.log(productApi);

            fetchProductApi(productApi);

        })
}

function fetchProductApi(productUrl) {

    fetch(productUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            for (let categorySelected of data) {
                creatCategoryTable(categorySelected);
            }

        })
}

function creatCategoryTable(categoryItem) {
    const categoryTable = document.getElementById("categoryTable");

    let row = categoryTable.insertRow(-1)

    let cell = row.insertCell(0);
    cell.innerHTML = categoryItem.productId;

    let cell1 = row.insertCell(1);
    cell1.innerHTML = categoryItem.productName;

    let cell3 = row.insertCell(2);
    cell3.innerHTML = categoryItem.unitPrice;

    let cell4 = row.insertCell(3);
    cell4.innerHTML = categoryItem.unitsInStock;

    let cell5 = row.insertCell(4);
    cell5.innerHTML = categoryItem.supplier;
}

function clearTable() {
    const categoryTable = document.getElementById("categoryTable");
    categoryTable.innerHTML = '';
}























































// console.log(data[1].categoryId);
// for(let i = 0; i < data.length)

// for(let i = 0 ; i < data.length ; i++){
//     console.log(data[i].categoryId);
// }

// for(let i = 0 ; i < data.length ; i++){
//     let category = data[i];
//     console.log(category.categoryId);
// }

// for (let categorySelected of data) {
//     if (categorySelected.categoryId == categorySearch.value) {
//         creatCategoryTable(categorySelected);
//     }
// }