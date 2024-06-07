"use strict";


const searchOption = document.getElementById("searchOption");

//todo: what is this?  two different names used, productselected, but with an id of categorysearch.
const categorySearch = document.getElementById("categorySearch");

window.onload = function () {
    // console.log("hi");
    populateTheDropdownWithCategory();

    //todo: there is no dropdown with products so this name doesn't make sense.
    populateDropdownProductSelections()


    searchOption.onchange = onChangeSearchOption;

    //todo: there is no dropdown that has produts so both the below productSelected and onChangeProductSelected are misnamed
    categorySearch.onchange = onChangeCategorySearch;
}

// populates the category search dropdown with categories
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

//todo:  there is no dropdown with prodcuts in it so this is misnamed.
function populateDropdownProductSelections() {
    let firstOption = document.createElement("option");
    let secondOption = document.createElement("option");
    firstOption.value = "View all";
    firstOption.innerHTML = "View all"

    secondOption.value = "Search by category";
    secondOption.innerHTML = "Search by category";

    searchOption.append(firstOption, secondOption);
}

//todo:  there is no "selection" of a product happening except when someone clicks on a hyperlink in the table, but that won't need an event handler.

//checks to see which search option was selected
function onChangeSearchOption() {
    clearTable();
    console.log(categorySearch.value);

    const categoryApi = "http://localhost:8081/api/products";

    fetch(categoryApi)
        .then(response => response.json())
        .then(data => {
            // console.log(data);

            for(let product of data){
                if (searchOption.value == "View all") {
                    // console.log("hi");
                    // console.log(product);
                    createProductsTable(product);
                    categorySearch.style.display = "none";
                    //todo: the below function should be passed a product, and creates a product table - so both "creatCategoryTable" and "cateogrySelected" are not good names in this context

                }
                else {
                    console.log("hi");
                    categorySearch.style.display = "block";
                }
            }


            // for (let categorySelected of data) {

            // }
        })

}

//when user selects a category from the dropdown, it creates a url using the selected value from the dropdown category.
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

            fetchSelectsProductApi(productApi);

        })
}

//todo: is this getting all products, or only products in a specific category - naming could be more specific to remote that ambiguity
//gets uses the new url with the category id in it to search through the products api to find products with matchin id then creates a table.
function fetchSelectsProductApi(productUrl) {

    fetch(productUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            //todo: categorySelected misnamed, this shouldn't be a category if the product api returns an array of products
            for (let productSelected of data) {
                //todo: below function misnamed
                createProductsTable(productSelected);
            }
        })
}

//todo: there is no table to display categories, only a table to display products, so this should have a name that reflects that. also it should be passed a product not a cateogryItem
function createProductsTable(productItem) {

    //todo: again, this is for products not categories
    const productsTable = document.getElementById("productsTable");

    let row = productsTable.insertRow(-1)

    let cell = row.insertCell(0);
    cell.innerHTML = productItem.productId;

    let cell1 = row.insertCell(1);
    cell1.innerHTML = productItem.productName;

    let cell3 = row.insertCell(2);
    cell3.innerHTML = productItem.unitPrice;

    let cell4 = row.insertCell(3);
    cell4.innerHTML = productItem.unitsInStock;

    let cell5 = row.insertCell(4);
    cell5.innerHTML = productItem.supplier;
}

function clearTable() {
    //todo: needs new name.
    const productsTable = document.getElementById("productsTable");
    productsTable.innerHTML = '';
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