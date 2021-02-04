const { ProductAPI } = require("./ProductApi");
var filters = { brandName: ["Samsung", "Apple", "RealMe"], ram: [4.5, 3], price: { min: 1000, max: 10000 }, sortBy: 'price' };

var userLogin = { email: "admin@gmail.com", password: "pass123" };
const productAPI = new ProductAPI();

productAPI.getAllProducts().then(response => {
    return response.data;

});
productAPI.getAllBrandName().then(response => {
    return response.data;
})

productAPI.login(userLogin).then(response => {
    return response;

})

productAPI.searchProducts(filters).then(response => {
    return response;
})
// let returnValues = productAPI.getAllProducts();

// let returnValues = await productAPI.getAllProducts();