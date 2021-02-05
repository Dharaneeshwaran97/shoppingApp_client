// import { Product } from "./Product";
// const {}
const axios = require('axios').default;
class ProductAPI {
    constructor() {

    }
    //get all products details
    async  getAllProducts() {
        const url = "https://shoppingapp-mock.herokuapp.com/api/products";
        return axios.get(url);
    }
    //to get all active products
    async getActiveProducts() {
        let productsResponse = await this.getAllProducts();
        let products = productsResponse.data;

        var activeProducts = products.filter(p => p.active == 1);
        return activeProducts;
    }
    // to get all brand name
    async  getAllBrandName() {
        const url = "https://shoppingapp-mock.herokuapp.com/api/brands";
        return axios.get(url);
    }

    //sorting ascending order using price value
    sorting(value1, value2) {
        if (value1.price < value2.price) {
            return -1;
        } else if (value1.price > value2.price) {
            return 1;
        } else {
            return 0;
        }
    }

    //search the product based on user input 
    async searchProducts(filters) {
        // let result = await getAllProducts().then(res => {
        //     return res.data;
        // });
        let productsResponse = await this.getAllProducts();
        let products = productsResponse.data;

        var resultValues = [];
        if (Object.keys(filters).length != 0) {
            //to filter the values  based on brandName
            resultValues = products.filter(p => !filters.hasOwnProperty("brandName") || filters.brandName.length == 0 || filters.brandName.includes(p.brandName))
            // to filter the values based on ram
            resultValues = resultValues.filter(p => !filters.hasOwnProperty("ram") || filters.ram.length == 0 || filters.ram.includes(p.ram));
            // to filter the values based on price
            resultValues = resultValues.filter(r => !filters.hasOwnProperty("price") || filters.price.min <= r.price && filters.price.max >= r.price);
            //to sort the values based on price field
            resultValues.sort(this.sorting);
            // return the all condition matching array 
            return resultValues;
        }
        else {
            return products;
        }
    }

    // to change product active to inactive 
    async changeProductMode(productId, status) {
        let data = { active: status == true ? 1 : 0 };
        const url = "https://shoppingapp-mock.herokuapp.com/api/products/" + productId;
        return await axios.patch(url, data);
    }

    // to check given product id valid or not
    async checkValidProduct(productId, status) {
        try {
            var result = await this.changeProductMode(productId, status);
        } catch (err) {
            throw new Error("Please choose correct product");
        }
    }
};

exports.ProductAPI = ProductAPI;

