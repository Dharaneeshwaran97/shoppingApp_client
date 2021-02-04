const { ProductAPI } = require("./ProductApi");
var filters = { brandName: ["Samsung", "Apple", "RealMe"], ram: [4.5, 3], price: { min: 1000, max: 10000 }, sortBy: 'price' };
//   
const productAPI = new ProductAPI();

productAPI.getAllProducts().then(response => {
    return response.data;

});
productAPI.getAllBrandName().then(response => {
    return response.data;
})

productAPI.searchProducts(filters).then(response => {
    return response;
})
// let returnValues = productAPI.getAllProducts();

// let returnValues = await productAPI.getAllProducts();