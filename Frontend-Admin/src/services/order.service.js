import createApiClient from "./api.service";
class OrderService {
    constructor(baseUrl = "/api/datas") {
        this.api = createApiClient(baseUrl);
    }
    async getAllOrder(){
        return (await this.api.get('/order')).data;
    }
    async create(data){
        return (await this.api.post('/order', data)).data;
    }
    async getUserOrder(username) {
        return (await this.api.get(`/order/${username}`)).data;
    }
    async getOrder(orderId) {
        return (await this.api.get(`/ordered/${orderId}`)).data;
    }
    async update(orderId) {
        return (await this.api.put(`/ordered/${orderId}`)).data;
    }
}
export default new OrderService()