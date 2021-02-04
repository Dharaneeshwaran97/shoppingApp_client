
const axios = require('axios').default;

class AuthAPI {
    constructor() {

    }
    // get all users
    async getUsers() {
        const url = "http://shoppingapp-mock.herokuapp.com/api/users";
        return axios.get(url);
    }

    // to check isValid user or not 
    async isValidUser(loginDetails) {
        let userDetails = await this.getUsers();
        let users = userDetails.data;

        let loginUser = users.find(p => p.email == loginDetails.email && p.password == loginDetails.password);
        if (!loginUser) {
            throw new Error("Invalid user details");
        } else {
            return loginUser
        }
    }
    // to check success login or not
    async login(loginDetails) {
        try {
            return await this.isValidUser(loginDetails);

        } catch (err) {
            console.log(err.message);
            return err;
        }
    }


}
exports.AuthAPI = AuthAPI;