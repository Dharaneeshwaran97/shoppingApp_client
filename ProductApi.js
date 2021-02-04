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
};

exports.ProductAPI = ProductAPI;

