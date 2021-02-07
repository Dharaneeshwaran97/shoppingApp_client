const axios = require('axios').default;
const API_URL = "http://shoppingapp-mock.herokuapp.com/api/";

class UserAPI {
    constructor() {

    }

    // get all users
    async getUsers() {
        const url = API_URL + "users";
        return axios.get(url);
    }


    async toCheckExistingUser(email) {
        var userList = await this.getUsers();
        var users = userList.data;
        var result = users.some(u => u.email == email);
        // console.log("some result", result);
        return result;
    }

    async isValid(userDetails) {
        if (userDetails.name != null && !userDetails.name.trim().length <= 0 && ! await this.toCheckExistingUser(userDetails.email) && userDetails.password.length >= 8) {
            const url = API_URL + "users";
            userDetails.createdDate = new Date().toJSON();
            return axios.post(url, userDetails);

        } else {
            throw new Error("Please Enter Valid details");
        }

    }

    //new user Register
    async newUserRegister(userDetails) {
        // console.log(userDetails);
        try {
            var result = await this.isValid(userDetails);
            // console.log("Result", result);
            return result;

        } catch (err) {
            console.log(err.message);
            throw err;
        }
    }

    // get all users
    async getUser(userId) {
        const url = API_URL + "users/" + userId;
        return axios.get(url);
    }

    async getUserDetail(userId) {
        // console.log(userId);
        try {
            var result = await this.getUser(userId);
            // console.log("result", result.data);
            var userDetails = result.data;
            return userDetails;

        } catch (err) {
            throw new Error("Please enter valid userId");
        }
    }
}

exports.UserAPI = UserAPI;