const axios = require('axios').default;

class ProductOrderAPI {
    constructor() {

    }
    // to get if the correct products in products values other wise retrun error
    async  getProduct(productId) {
        const url = "https://shoppingapp-mock.herokuapp.com/api/products/" + productId;
        return axios.get(url);
    }

    // to get if the correct user in user values other wise retrun error
    async getUser(id) {
        const url = "http://shoppingapp-mock.herokuapp.com/api/users/" + id;
        return axios.get(url);
    }

    //to check all the field are correct or not 
    async validCheck(orderDetails) {
        var errors = [];
        //to check the userId
        try {
            var user = await this.getUser(orderDetails.userId);
        } catch (err) {
            console.log(err.message);
            errors.push("Invalid UserID");
        }
        //to check the productId
        try {
            var product = await this.getProduct(orderDetails.productId);

        } catch (err) {
            errors.push("Invalid ProductID");
        }

        //to check the qty is valid or not
        if (orderDetails.qty <= 0) {
            errors.push("Please enter Qty");
        }

        // to check errors thorwed or not
        if (errors.length > 0) {
            throw new Error(errors.join(","));
        }

    }

    //order the product
    async  orderProduct(orderDetails) {

        try {
            await this.validCheck(orderDetails);
            orderDetails.status = "ORDERED";
            orderDetails.orderedDate = new Date().toJSON();
            const url = "https://shoppingapp-mock.herokuapp.com/api/orders";
            return axios.post(url, orderDetails);
        } catch (err) {
            console.log(err.message);
            throw err;
        }
    }
}

exports.ProductOrderAPI = ProductOrderAPI;