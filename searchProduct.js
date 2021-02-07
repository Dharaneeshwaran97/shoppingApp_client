
const { ProductAPI } = require("./ProductApi");
const { AuthAPI } = require("./authApi");
const { ProductOrderAPI } = require("./productOrder");
var filters = { brandName: ["Samsung", "Apple", "RealMe"], ram: [4.5, 3], price: { min: 1000, max: 10000 }, sortBy: 'price' };

const productAPI = new ProductAPI();
var email = "admin@gmail.com";
var password = "pass123";
var role = "ADMIN";
//to get all product details
productAPI.getAllProducts().then(response => {
    if (response.data) {
        return response.data;
    } else {
        throw new Error("Not able to fetch product details");
    }
});

// get all active products only
productAPI.getActiveProducts().then(response => {
    return response;
})

//to change products status active to inactive
var orderId = 2;
var status = false;
productAPI.checkValidProduct(orderId, status).then(response => {
    console.log("Products Status Changed");
}).catch(err => {
    console.log(err.message);
    throw err;
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
const authAPI = new AuthAPI();
authAPI.login(email, password, role).then(response => {
    return response;

}).catch(err => {
    console.log(err.message);
    throw err

});

const productOrderAPI = new ProductOrderAPI();

let orderDetails = { qty: 3, productId: 3, userId: 3 };
// order the product
productOrderAPI.orderProduct(orderDetails).then(response => {
    console.log("Order Placed");
}).catch(err => {
    console.log(err.message);
    throw err;
});

// cancel order
var cancelOrderId = 6;
productOrderAPI.orderCancel(cancelOrderId).then(response => {
    return "Order Cancelled Successfully";

}).catch(err => {
    console.log(err);
    throw err;
});

// get userId based all order
var userId = 1;
productOrderAPI.myOrders(userId).then(response => {
    return response;
}).catch(err => {
    throw err;

});

// to register new user
const { UserAPI } = require("./userApi");
const userAPI = new UserAPI();
var userDetails = { name: "Dharani", email: "dharani@gmail.com", password: "dharani@90" };
userAPI.newUserRegister(userDetails).then(response => {
    console.log(response);
}).catch(err => {
    throw err;
});

//to get user id based user details
var userId = 10;
userAPI.getUserDetail(userId).then(response => {
    return response
}).catch(err => {
    throw err;
})

// to get all users
userAPI.getUsers().then(response => {
    if (response) {
        return response.data;
    } else {
        throw new Error("Not able to fetch the data");
    }
});

//to add a new product
var productDetails = { name: "redmi note", brandName: "RedMi", ram: 3, price: 15000 };
productAPI.addNewProduct(productDetails).then(response => {
    console.log("Response");
}).catch(err => {
    console.log(err);
    throw err;
});

// to get a product id based get details
var productId = 10;
productOrderAPI.getProduct(productId).then(response => {
    console.log(response.data);

}).catch(err => {
    throw new Error("Please enter valid productId");
})

// to get all orders list
productOrderAPI.getAllOrders().then(response => {
    return response.data;
}).catch(err => {
    throw new Error("Not able to fetch the orders");
});

// to change status to ordered to delivered based on orderId
productOrderAPI.changeStatus(orderId).then(response => {
    console.log(response);
}).catch(err => {
    throw err;
})