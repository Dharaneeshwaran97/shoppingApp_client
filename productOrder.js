const axios = require('axios').default;

const API_URL = "https://shoppingapp-mock.herokuapp.com/api/";

class ProductOrderAPI {
    constructor() {

    }

    //api url

    // to get if the correct products in products values other wise retrun error
    async  getProduct(productId) {
        const url = API_URL + "products/" + productId;
        return axios.get(url);
    }

    // to get if the correct user in user values other wise retrun error
    async getUser(id) {
        const url = API_URL + "users/" + id;
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
        console.log(orderDetails);

        try {
            await this.validCheck(orderDetails);
            orderDetails.status = "ORDERED";
            orderDetails.orderedDate = new Date().toJSON();
            const url = API_URL + "orders";
            return axios.post(url, orderDetails);
        } catch (err) {
            console.log(err.message);
            throw err;
        }
    }
    async validOrder(orderId) {
        const url = API_URL + "orders/" + orderId;
        return axios.get(url);

    }

    async validOrderStatusForCancellation(orderId) {
        const url = API_URL + "orders/" + orderId;
        var result = await axios.get(url);
        var orderResult = result.data;
        if (orderResult.status == "CANCELLED") {
            throw new Error("Already Order Product has been Cancelled");
        } else if (orderResult.status == "DELIVERED") {
            throw new Error("Delivered Product cannot be cancelled");
        }

    }

    // to find the particular orderid based order and change the status cancelled and add cancelled date
    async cancelStatus(orderId) {
        try {
            const url = API_URL + "orders/" + orderId;
            return axios.patch(url, { status: "CANCELLED", cancelledDate: new Date().toJSON() });


        } catch (err) {
            throw err;

        }
        // const url = "https://shoppingapp-mock.herokuapp.com/api/orders/" + orderId;
    }

    // to cancelled  the particular order 
    async orderCancel(orderId) {
        try {
            await this.validOrderStatusForCancellation(orderId);
            var result = await this.cancelStatus(orderId);
        } catch (err) {
            throw err;
        }
    }
    async getAllOrders() {
        const url = API_URL + "orders";
        return axios.get(url);
    }


    async validUser(userId) {
        try {
            var usersList = await this.getUser(userId);

        } catch (err) {
            throw new Error("Please check userID");

        }
    }
    async myOrders(userId) {
        try {
            var userOrders = await this.validUser(userId); //if invalid user it will throw error
            var ordersObject = await this.getAllOrders();
            var orders = ordersObject.data;
            var myOrders = orders.filter(o => o.userId == userId);
            return myOrders;
            // return userOrders;
            // console.table(userOrders);

        } catch (err) {
            // console.log(err.message);
            throw err;
        }

    }

}

exports.ProductOrderAPI = ProductOrderAPI;