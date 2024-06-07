"use strict";


window.onload = () =>{

    const urlParams = new URLSearchParams(location.search);
    let productId = -1;
    if(urlParams.has("productId") === true){
        productId = urlParams.get("productId");
    }




    const pageProductId = document.getElementById("pageProductId");

    pageProductId.innerHTML = "Product Id is #" + productId;
    console.log(productId);

    const productName = document.getElementById("productName");
    const productStock = document.getElementById("productStock");
    const  productPrice = document.getElementById("productPrice");
    const  productSupplier = document.getElementById("productSupplier");

    fetch("http://localhost:8081/api/products")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log(data[0].productId);
        for(let product of data){
            if(product.productId == productId){
                console.log(product.categoryId);
                productName.innerHTML = "Name: " + product.productName;
                productStock.innerHTML = "How Much We got In stock: #" + product.unitsInStock;
                productPrice.innerHTML = "Product Price $" + product.unitPrice;
                productSupplier.innerHTML = "The product supplier " + product.supplier;
            }
        }
    })


};

// productName
// productStock
// productPrice
// productSupplier