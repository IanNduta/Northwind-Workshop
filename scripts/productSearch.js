"use strict";
const categorySearch = document.getElementById("categorySearch");
const productSelected = document.getElementById("productSelected");

window.onload = function () {
    // console.log("hi");
    populateTheDropdownWithCategory();
    categorySearch.onchange = onChangeCategorySearch;
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

function onChangeCategorySearch(categoryData) {
    // console.log(categorySearch.value);
    const categoryApi = "http://localhost:8081/api/categories";

    fetch(categoryApi)
        .then(response => response.json())
        .then(data => {

            for (let categorySelected of data) {
                if (categorySelected.categoryId == categorySearch.value) {
                    console.log(categorySelected.name);
                }
            }
        })

}

function creatCategoryTable(){
    
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