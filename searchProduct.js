
const { ProductAPI } = require("./ProductApi");
const { AuthAPI } = require("./authApi");
const { ProductOrderAPI } = require("./productOrder");
var filters = { brandName: ["Samsung", "Apple", "RealMe"], ram: [4.5, 3], price: { min: 1000, max: 10000 }, sortBy: 'price' };

const productAPI = new ProductAPI();
var email = "admin@gmail.com"; var password = "pass123"
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
authAPI.login(email, password).then(response => {
    return response;

});

const productOrderAPI = new ProductOrderAPI;

let orderDetails = { qty: 1, productId: 1, userId: 1 };
// order the product
productOrderAPI.orderProduct(orderDetails).then(response => {
    // console.log(response);
    return "Order Placed";

}).catch(err => {
    console.log(err.message);
    throw err

});

// cancel order
var cancelOrderId = 7;
productOrderAPI.orderCancel(cancelOrderId).then(response => {
    return "Order Cancelled Successfully";

}).catch(err => {
    console.log(err);
    throw err;
});

// let returnValues = productAPI.getAllProducts();

// let returnValues = await productAPI.getAllProducts();