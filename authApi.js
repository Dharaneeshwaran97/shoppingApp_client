
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
    async isValidUser(email, password) {
        let userDetails = await this.getUsers();
        let users = userDetails.data;

        let loginUser = users.find(p => p.email == email && p.password == password);
        if (!loginUser) {
            throw new Error("Invalid user details");
        } else {
            delete loginUser.password;
            return loginUser;
        }
    }
    // to check success login or not
    async login(email, password) {
        try {
            return await this.isValidUser(email, password);

        } catch (err) {
            console.log(err.message);
            throw err;
        }
    }


}
exports.AuthAPI = AuthAPI;