import createApiClient from "./api.service";
class CustomerService {
    constructor(baseUrl = "/api/datas") {
        this.api = createApiClient(baseUrl);
    }
    async login(data) {
        console.log(data);
        return (await this.api.post("/login", data)).data;
    }
    async getUserCart(username) {
        console.log("co vo day");
        return (await this.api.get(`/customer/${username}`)).data;
    }
    async createCart(data) {
        return (await this.api.post("/customer", data)).data;
    }
    async deleteCart(username, productId) {
        return (await this.api.delete(`/customer/${username}/${productId}`)).data;
    }
    async createUser(data) {
        return (await this.api.post("/register", data)).data;
    }
    async update(username, data) {
        return (await this.api.put(`/customer/${username}`, data)).data;
    }
}
export default new CustomerService()