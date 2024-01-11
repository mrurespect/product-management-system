
var productNameInput =document.getElementById("productNameInput");
var productPriceInput =document.getElementById("productPriceInput");
var productcategorieInput =document.getElementById("productcategorieInput");
var productdescriptionInput =document.getElementById("productdescriptionInput");
var productContainer=[];
if (localStorage.getItem("products")!=null){
     //there's an existing data
    productContainer=JSON.parse(localStorage.getItem("products"));
    displayProduct();
}
function addProduct(){
    if (!validateProductName()){
        window.alert("invalid product Name");
        return;
    }
    if (!validateProductPrice()){
        window.alert("invalid product Price");
        return;
    }
    var product={
        name:productNameInput.value,
        price:productPriceInput.value,
        categorie:productcategorieInput.value,
        description:productdescriptionInput.value
    }
    productContainer.push(product);
    localStorage.setItem("products",JSON.stringify(productContainer));
    clearForm();
    displayProduct();
        
}
function clearForm(){
    productNameInput.value="";
    productPriceInput.value="";
    productcategorieInput.value="";
    productdescriptionInput.value="";
}
function displayProduct(text){
    var str='';
    
    for (let i = 0; i <productContainer.length ; i++) {
        if (text!==undefined){  // only for search 
            var name =productContainer[i].name.toLowerCase(); // to lower to make the search non sentitive to upper or lower we make all the element lower
            if (!name.includes(text.toLowerCase()))continue;  // if the name does not contains the element ,it wont be added to str
        }
        str+=`<tr>
            <td>${i}</td>
            <td>${productContainer[i].name}</td>
            <td>${productContainer[i].price}</td>
            <td>${productContainer[i].categorie}</td>
            <td>${productContainer[i].description}</td>
            <td><button class="btn btn-sm btn-outline-danger" onclick="deleteProduct(${i});">Delete</button></td>
            <td><button class="btn btn-sm btn-outline-success" onclick="">update</button></td>
        </tr>`;
    }
    /* what we have done here it a bad idea in front of the performance because every time we click on the button the 
     loop will start from 0 to 1m for example and recreate all the table ; innerHTML overight all existion elements*/
    document.getElementById("tableBody").innerHTML=str;
}
function deleteProduct(index){
    productContainer.splice(index,1);
    localStorage.setItem("products",JSON.stringify(productContainer));
    displayProduct();
}
function validateProductName(){
    var regex=/^[A-Z][a-z]{3,8}$/;
    return regex.test(productNameInput.value);
}
function validateProductPrice(){
    var regex=/^\d/;  // all positif ,dont accept negatif numbers
    return regex.test(productPriceInput.value);
}