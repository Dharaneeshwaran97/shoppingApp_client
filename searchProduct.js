// import { AuthAPI } from "./authApi";

const { ProductAPI } = require("./ProductApi");

const { AuthAPI } = require("./authApi");
var filters = { brandName: ["Samsung", "Apple", "RealMe"], ram: [4.5, 3], price: { min: 1000, max: 10000 }, sortBy: 'price' };

var userLogin = { email: "admin@gmail.com", password: "pass123" };
const productAPI = new ProductAPI();

//to get all product details
productAPI.getAllProducts().then(response => {
    return response.data;

});

//to get all brandname in products
productAPI.getAllBrandName().then(response => {
    return response.data;
})

// search user input based fetch tha products
productAPI.searchProducts(filters).then(response => {
    return response;
})

// check valid user or not
const authAPI = new AuthAPI;
authAPI.login(userLogin).then(response => {
    return response;

});

// let returnValues = productAPI.getAllProducts();

// let returnValues = await productAPI.getAllProducts();